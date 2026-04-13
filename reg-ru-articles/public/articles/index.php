<?php
declare(strict_types=1);
require_once __DIR__ . '/../../src/bootstrap.php';

$pdo = db();
$page = max(1, (int)($_GET['page'] ?? 1));
$perPage = 10;
$offset = ($page - 1) * $perPage;

$countSt = $pdo->query("SELECT COUNT(*) AS c FROM articles WHERE status='published'");
$total = (int)($countSt->fetch()['c'] ?? 0);
$pages = max(1, (int)ceil($total / $perPage));

$st = $pdo->prepare("SELECT slug, title, excerpt, cover_image_url, published_at FROM articles WHERE status='published' ORDER BY published_at DESC, id DESC LIMIT :lim OFFSET :off");
$st->bindValue(':lim', $perPage, PDO::PARAM_INT);
$st->bindValue(':off', $offset, PDO::PARAM_INT);
$st->execute();
$rows = $st->fetchAll();

$siteUrl = rtrim((string)(app_config()['app']['site_url'] ?? ''), '/');
?>
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Полезные статьи — План накоплений</title>
  <meta name="description" content="Практичные статьи про накопления, финансовые привычки и достижение целей.">
  <link rel="canonical" href="<?= e($siteUrl) ?>/articles/">
  <meta property="og:title" content="Полезные статьи — План накоплений">
  <meta property="og:description" content="Подборка практичных материалов по накоплениям.">
  <meta property="og:type" content="website">
  <style>
    body{margin:0;font-family:Inter,system-ui,sans-serif;background:#020617;color:#e2e8f0}
    .wrap{max-width:920px;margin:0 auto;padding:32px 16px}
    a{color:#38bdf8;text-decoration:none} a:hover{text-decoration:underline}
    .card{display:block;background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:18px;margin-bottom:12px;color:#e2e8f0}
    .meta{font-size:12px;color:#94a3b8;margin-top:8px}
    .h{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:24px}
    .btn{background:#22c55e;color:#022c22;padding:10px 14px;border-radius:10px;font-weight:700}
    .pager{display:flex;gap:10px;margin-top:20px}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="h">
      <h1>Полезные статьи</h1>
      <a class="btn" href="/">На главную</a>
    </div>
    <?php if (!$rows): ?>
      <p>Скоро здесь появятся полезные материалы по накоплениям.</p>
    <?php else: ?>
      <?php foreach ($rows as $r): ?>
        <a class="card" href="/articles/<?= e((string)$r['slug']) ?>/">
          <h2 style="margin:0 0 8px"><?= e((string)$r['title']) ?></h2>
          <p style="margin:0;color:#cbd5e1"><?= e((string)$r['excerpt']) ?></p>
          <div class="meta"><?= e((string)$r['published_at']) ?></div>
        </a>
      <?php endforeach; ?>
    <?php endif; ?>
    <div class="pager">
      <?php if ($page > 1): ?><a href="/articles/?page=<?= $page-1 ?>">← Назад</a><?php endif; ?>
      <?php if ($page < $pages): ?><a href="/articles/?page=<?= $page+1 ?>">Далее →</a><?php endif; ?>
    </div>
  </div>
</body>
</html>
