-- Сгенерируйте hash локально:
-- php -r "echo password_hash('CHANGE_ME_STRONG', PASSWORD_BCRYPT), PHP_EOL;"

INSERT INTO admin_users (login, password_hash)
VALUES ('admin', '$2y$10$replace_with_real_hash')
ON DUPLICATE KEY UPDATE login = VALUES(login);
