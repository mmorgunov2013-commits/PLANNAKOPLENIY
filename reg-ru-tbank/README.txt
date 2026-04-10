Платёжный бэкенд Т-Банк для plan-nakopleniy.ru (Reg.ru)
=====================================================

Залить на хостинг в каталог сайта plan-nakopleniy.ru:
  api/common.php
  api/tbank_init.php
  api/tbank_notify.php
  api/config.example.php  → скопировать в api/config.local.php и заполнить
  data/   (пустая папка, права на запись — для sent_payment_ids.txt)
  materials/ — положить ZIP с продуктом

В config.local.php обязательно:
  - TBANK_TERMINAL_KEY, TBANK_PASSWORD
  - NOTIFICATION_URL = https://plan-nakopleniy.ru/api/tbank_notify.php
  - SUCCESS_URL / FAIL_URL на https://план-накоплений.рф/...
  - PRODUCT_ZIP_ABSOLUTE — абсолютный путь к файлу на сервере (смотрите в файловом менеджере)

В личном кабинете Т-Банка:
  NotificationURL = тот же URL, что в config

На GitHub (Actions → Variables) для сайта план-накоплений:
  NEXT_PUBLIC_PAYMENT_API_URL = https://plan-nakopleniy.ru
  NEXT_PUBLIC_PAYMENT_INIT_PATH = /api/tbank_init.php

Проверка: открыть в браузере https://plan-nakopleniy.ru/api/tbank_init.php с POST нельзя вручную легко;
  проще с главного сайта /oplata/ после деплоя.

SSL: включите сертификат на plan-nakopleniy.ru в панели Reg.ru.
