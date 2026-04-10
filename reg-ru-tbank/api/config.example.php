<?php

declare(strict_types=1);

/**
 * Скопируйте в config.local.php на сервере и заполните секреты.
 * config.local.php не коммитьте в git.
 */
return [
    'TBANK_TERMINAL_KEY' => 'ВАШ_TERMINAL_KEY',
    'TBANK_PASSWORD' => 'ВАШ_ПАРОЛЬ_ТЕРМИНАЛА',

    // null = авто: DEMO → тестовый API
    'TBANK_BASE_URL' => null,

    'SUCCESS_URL' => 'https://план-накоплений.рф/payment/success/',
    'FAIL_URL' => 'https://план-накоплений.рф/payment/fail/',

    // Полный URL этого скрипта notify (HTTPS)
    'NOTIFICATION_URL' => 'https://plan-nakopleniy.ru/api/tbank_notify.php',

    'PRODUCT_AMOUNT_KOPECKS' => 59000,
    'PRODUCT_DESCRIPTION' => 'Планировщик накоплений',

    // Абсолютный путь к ZIP на сервере (как в панели хостинга), например:
    // '/var/www/u1234567/data/www/plan-nakopleniy.ru/materials/Planirovshchik.zip'
    'PRODUCT_ZIP_ABSOLUTE' => __DIR__ . '/../materials/Planirovshchik_nakopleniy.zip',

    'MAIL_FROM_EMAIL' => 'noreply@plan-nakopleniy.ru',
    'MAIL_FROM_NAME' => 'План накоплений',
    'MAIL_REPLY_TO' => '',
    'MAIL_SUBJECT' => 'План накоплений — ваши материалы',
    'MAIL_HTML' => '<p>Спасибо за покупку. Архив с материалами во вложении.</p>',

    // Каталог для sent_payment_ids.txt (дубли писем при повторных вебхуках)
    'DATA_DIR' => __DIR__ . '/../data',
];
