Платёжный бэкенд Т-Банк для plan-nakopleniy.ru (Reg.ru)
=====================================================

Залить на хостинг в каталог сайта plan-nakopleniy.ru:
  oplata/index.html   — страница оплаты (email → POST /api/tbank_init.php, без CORS)
  api/common.php
  api/tbank_init.php
  api/tbank_notify.php
  api/config.example.php  → скопировать в api/config.local.php и заполнить
  data/   (пустая папка, права на запись — для sent_payment_ids.txt)
  materials/ — положить ZIP с продуктом

Лендинг на план-накоплений.рф (GitHub Pages): /oplata/ редиректит на https://plan-nakopleniy.ru/oplata/

В config.local.php обязательно:
  - TBANK_TERMINAL_KEY, TBANK_PASSWORD (боевой терминал без DEMO — из кабинета после «Замените тестовые данные»)
  - NOTIFICATION_URL = https://plan-nakopleniy.ru/api/tbank_notify.php
  - SUCCESS_URL / FAIL_URL на https://план-накоплений.рф/...
  - PRODUCT_ZIP_ABSOLUTE — абсолютный путь к файлу на сервере (смотрите в файловом менеджере)

Т-Банк — где указать вебхук (NotificationURL)
---------------------------------------------
1) Обычно достаточно того, что URL уже уходит в каждом запросе Init из config.local.php
   (поле NOTIFICATION_URL). Тогда в кабинете ничего дополнительно искать не нужно.

2) Если в интерфейсе просят «URL для уведомлений»:
   Т-Бизнес → Оплата / Интернет-эквайринг → Магазины → твой магазин → Терминалы →
   «Настроить» / «Уведомления» → способ HTTP(S) → вставить:
   https://plan-nakopleniy.ru/api/tbank_notify.php
   (названия пунктов могут слегка отличаться — ищи «уведомления», «HTTP», «вебхук».)

GitHub Pages
------------
В workflow уже заданы значения по умолчанию: API https://plan-nakopleniy.ru и путь /api/tbank_init.php.
Переменные в Settings → Variables можно не трогать, если не хочешь переопределять.
Любой push в main пересоберёт сайт с этими URL.

Проверка (после заливки oplata/ и api/):
  - https://plan-nakopleniy.ru/oplata/ — форма email
  - curl -sS -o /dev/null -w "%{http_code}" https://plan-nakopleniy.ru/oplata/  → 200
  - curl -sS -X POST https://plan-nakopleniy.ru/api/tbank_init.php -H "Content-Type: application/json" -d "{\"email\":\"test@test.com\"}"
    (ожидается JSON с paymentUrl или текст ошибки от банка — не 404 HTML)
  - https://план-накоплений.рф/oplata/ — после деплоя GitHub Pages должен уйти на plan-nakopleniy.ru/oplata/

SSL: включите сертификат на plan-nakopleniy.ru в панели Reg.ru.

Ошибка Init «Неверные параметры» (501)
--------------------------------------
1) Терминал с суффиксом DEMO шлёт запросы на https://securepay.tinkoff.ru/v2 (не на rest-api-test). См. доку «Тест-кейсы» Т-Банка.
2) OperationInitiatorType=0 в tbank_init.php — для оплаты картой.
3) TBANK_TERMINAL_KEY и TBANK_PASSWORD как в кабинете; пароль копировать целиком.
4) Тип оплаты в кабинете: одностадийная (PayType O). Если у терминала двухстадийная — уберите PayType O или смените настройку терминала.
5) При подключённой онлайн-кассе может требоваться Receipt в Init.

Уведомления: в кабинете лучше указать https://plan-nakopleniy.ru/api/tbank_notify.php (и то же в NOTIFICATION_URL в config.local.php).

Письмо не пришло — где смотреть (не GitHub: почта шлётся с хостинга)
--------------------------------------------------------------------
1) data/sent_payment_ids.txt — появился ли PaymentId после оплаты (значит уведомление дошло и скрипт отработал).
2) data/notify_trace.log — короткие строки: email=MISSING (банк не передал Email), mail=FAIL (mail() отклонён хостингом), mail=sent (письмо отдано MTA).
3) Логи PHP в панели Reg.ru / ISPmanager (ищите [tbank_notify]).
4) В кабинете Т-Бизнес → Операции по терминалу: дошёл ли HTTP-ответ OK на уведомление.
5) Частая причина: mail() без SMTP — письма режутся; тогда подключите почту домена (SPF/DKIM) или SMTP через библиотеку.
