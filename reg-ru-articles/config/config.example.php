<?php

declare(strict_types=1);

return [
    'db' => [
        'host' => 'localhost',
        'port' => 3306,
        'name' => 'u3269195_default',
        'user' => 'u3269195_default',
        'pass' => 'CHANGE_ME',
        'charset' => 'utf8mb4',
    ],
    'app' => [
        'site_url' => 'https://plan-nakopleniy.ru',
        'session_name' => 'pn_admin',
        'upload_dir' => __DIR__ . '/../public/uploads/articles',
        'upload_url_prefix' => '/uploads/articles',
    ],
];
