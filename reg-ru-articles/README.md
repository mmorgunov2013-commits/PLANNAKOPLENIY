# reg-ru-articles

PHP + MySQL модуль статей для обычного Reg.ru хостинга (без VPS).

## Что внутри

- `public/articles/` — публичный список и страницы статей.
- `public/admin/` — вход и редактор статей.
- `src/bootstrap.php` — БД, auth, slug, sanitization.
- `sql/schema.sql` — таблицы `admin_users` и `articles`.

## Установка на Reg.ru

1. Создай БД в ISPmanager.
2. Импортируй `sql/schema.sql` в эту БД.
3. Скопируй `config/config.example.php` в `config/config.local.php` и заполни креды БД.
4. Создай админа в БД (через phpMyAdmin), пример:

```sql
INSERT INTO admin_users (login, password_hash)
VALUES ('admin', '$2y$10$replace_with_bcrypt_hash');
```

Хэш сделай локально:

```bash
php -r "echo password_hash('YOUR_STRONG_PASSWORD', PASSWORD_BCRYPT), PHP_EOL;"
```

5. Залей содержимое `public/` в корень `plan-nakopleniy.ru`.
6. Проверь вход: `/admin/login.php`.

## Маршруты

- `/articles/` — список.
- `/articles/{slug}/` — статья (через `.htaccess`).
- `/admin/login.php` — вход.
- `/admin/articles.php` — список/управление.

## Важно

- `config.local.php` не коммитить.
- Папка `public/uploads/` должна быть доступна на запись.
