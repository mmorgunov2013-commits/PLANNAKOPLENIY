<?php
declare(strict_types=1);
require_once __DIR__ . '/../src/bootstrap.php';
require_admin();

$rows = db()->query('SELECT id, title, slug, status, published_at, updated_at FROM articles ORDER BY updated_at DESC, id DESC')->fetchAll();
?>
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Статьи — админка</title>
  <style>
    body{margin:0;font-family:Inter,system-ui,sans-serif;background:#f8fafc;color:#0f172a}
    .wrap{max-width:1100px;margin:0 auto;padding:24px 16px}
    table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden}
    th,td{padding:10px;border-bottom:1px solid #e2e8f0;text-align:left;font-size:14px}
    .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
    .btn{background:#16a34a;color:#fff;padding:10px 14px;border-radius:10px;text-decoration:none;font-weight:700}
    .muted{color:#64748b}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <h1>Статьи</h1>
      <div style="display:flex;gap:8px">
        <a class="btn" href="/admin/article-edit.php">+ Новая статья</a>
        <a class="btn" style="background:#334155" href="/admin/logout.php">Выйти</a>
      </div>
    </div>
    <table>
      <thead><tr><th>ID</th><th>Заголовок</th><th>Slug</th><th>Статус</th><th>Обновлено</th><th></th></tr></thead>
      <tbody>
      <?php foreach ($rows as $r): ?>
        <tr>
          <td><?= (int)$r['id'] ?></td>
          <td><?= e((string)$r['title']) ?></td>
          <td class="muted"><?= e((string)$r['slug']) ?></td>
          <td><?= e((string)$r['status']) ?></td>
          <td class="muted"><?= e((string)$r['updated_at']) ?></td>
          <td style="display:flex;gap:8px">
            <a href="/admin/article-edit.php?id=<?= (int)$r['id'] ?>">Редактировать</a>
            <a target="_blank" href="/articles/<?= e((string)$r['slug']) ?>/">Открыть</a>
            <form method="post" action="/admin/article-delete.php" onsubmit="return confirm('Удалить статью?')">
              <input type="hidden" name="id" value="<?= (int)$r['id'] ?>">
              <button style="border:0;background:none;color:#dc2626;cursor:pointer">Удалить</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
  </div>
</body>
</html>
