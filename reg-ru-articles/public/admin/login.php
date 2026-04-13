<?php
declare(strict_types=1);
require_once __DIR__ . '/../../src/bootstrap.php';

if (admin_is_logged_in()) {
    header('Location: /admin/articles.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = trim((string)($_POST['login'] ?? ''));
    $password = (string)($_POST['password'] ?? '');
    $st = db()->prepare('SELECT login, password_hash FROM admin_users WHERE login = :login LIMIT 1');
    $st->execute(['login' => $login]);
    $u = $st->fetch();
    if ($u && password_verify($password, (string)$u['password_hash'])) {
        admin_login((string)$u['login']);
        header('Location: /admin/articles.php');
        exit;
    }
    $error = 'Неверный логин или пароль';
}
?>
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Вход в админку</title>
  <style>
    body{font-family:Inter,system-ui,sans-serif;background:#020617;color:#e2e8f0;margin:0;display:flex;min-height:100vh;align-items:center;justify-content:center}
    .box{width:100%;max-width:360px;background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:24px}
    input{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1px solid #334155;background:#0b1220;color:#fff;margin:6px 0 12px}
    button{width:100%;padding:10px;border:0;border-radius:10px;background:#22c55e;font-weight:700}
    .err{color:#fca5a5;font-size:14px;margin-bottom:10px}
  </style>
</head>
<body>
  <form method="post" class="box">
    <h1 style="margin-top:0">Админка статей</h1>
    <?php if ($error !== ''): ?><div class="err"><?= e($error) ?></div><?php endif; ?>
    <label>Логин</label>
    <input name="login" required>
    <label>Пароль</label>
    <input type="password" name="password" required>
    <button type="submit">Войти</button>
  </form>
</body>
</html>
