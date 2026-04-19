# Agent Checkpoint

Обновлено: 2026-04-17

## Краткая карта проекта
- `app/`, `components/`, `public/` — основной Next.js лендинг (`tablica-landing`), деплой в GitHub Pages.
- `reg-ru-tbank/` — Reg.ru часть оплаты (страница `oplata/index.html` + PHP API `api/tbank_init.php` и `api/tbank_notify.php`).
- `reg-ru-articles/` — отдельный PHP+MySQL модуль статей/админки для Reg.ru.
- `payments-api/` — legacy/альтернативный Node API для T-Bank (Express), вероятно не основной путь сейчас.

## Что сейчас работает как связка
- Лендинг на домене `план-накоплений.рф` (GitHub Pages) ведёт `/oplata/` на `https://plan-nakopleniy.ru/oplata/`.
- На `plan-nakopleniy.ru` лежит HTML форма оплаты, которая вызывает `POST /api/tbank_init.php`.
- Уведомления T-Bank принимаются `https://plan-nakopleniy.ru/api/tbank_notify.php`.

## Ключевые файлы
- GitHub Pages workflow: `.github/workflows/deploy-pages.yml`
- Редирект страницы оплаты в Next: `app/oplata/page.tsx`
- Главная страница лендинга: `app/page.tsx`
- Reg.ru оплата (frontend): `reg-ru-tbank/oplata/index.html`
- Reg.ru оплата (init): `reg-ru-tbank/api/tbank_init.php`
- Reg.ru оплата (notify): `reg-ru-tbank/api/tbank_notify.php`
- Инструкция по Reg.ru оплате: `reg-ru-tbank/README.txt`
- Статьи модуль: `reg-ru-articles/README.md`

## Важные заметки по инфраструктуре
- В репозитории есть чувствительные/служебные файлы вне git:
  - `ssl/private.key`
  - `ssl/request.csr`
- Их нельзя коммитить и переносить в публичные артефакты.
- Конфиги с секретами ожидаются локально на сервере (`config.local.php`) и не должны попадать в git.

## Следующий шаг
- Если нужно продолжить разработку/фиксы:
  1. Уточнить, что является источником истины для прода: только `reg-ru-tbank` или ещё `payments-api`.
  2. Сверить фактическую файловую структуру Reg.ru с текущим репозиторием.
  3. После каждого изменения обновлять этот файл блоками "Что сделано / Что проверить / Что дальше".

## Последнее изменение (Метрика)
- Официальный HTML-сниппет Яндекса в `app/layout.tsx`: `<head>` + `script` (как в кабинете) и `<noscript>` с `watch` — без отдельного React-компонента, дублей нет.
- Номер счётчика: дефолт `108609817`, переопределение через `NEXT_PUBLIC_YM_ID` при сборке (см. `.env.example`).

## Что проверить вручную после изменений
- `https://plan-nakopleniy.ru/oplata/` открывается и принимает email.
- `POST https://plan-nakopleniy.ru/api/tbank_init.php` возвращает JSON без HTML-ошибок.
- Успешная оплата даёт callback в `tbank_notify.php` и не дублирует отправку (по `PaymentId`).
- `https://план-накоплений.рф/oplata/` корректно редиректит на Reg.ru страницу оплаты.
