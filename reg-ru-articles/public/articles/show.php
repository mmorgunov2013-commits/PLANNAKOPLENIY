<?php
declare(strict_types=1);
require_once __DIR__ . '/../src/bootstrap.php';

$slug = trim((string)($_GET['slug'] ?? ''));
if ($slug === '') {
    http_response_code(404);
    exit('Not found');
}

$pdo = db();
$st = $pdo->prepare("SELECT * FROM articles WHERE slug=:slug AND status='published' LIMIT 1");
$st->execute(['slug' => $slug]);
$a = $st->fetch();
if (!$a) {
    http_response_code(404);
    exit('Статья не найдена');
}

$siteUrl = rtrim((string)(app_config()['app']['site_url'] ?? ''), '/');
$canonical = $siteUrl . '/articles/' . $slug . '/';
$title = (string)($a['meta_title'] ?: $a['title']);
$desc = (string)($a['meta_description'] ?: $a['excerpt']);
?>
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($title) ?></title>
  <meta name="description" content="<?= e($desc) ?>">
  <link rel="canonical" href="<?= e($canonical) ?>">
  <meta property="og:type" content="article">
  <meta property="og:title" content="<?= e($title) ?>">
  <meta property="og:description" content="<?= e($desc) ?>">
  <meta property="og:url" content="<?= e($canonical) ?>">
  <style>
    body{margin:0;font-family:Inter,system-ui,sans-serif;background:#020617;color:#e2e8f0}
    .wrap{max-width:860px;margin:0 auto;padding:36px 16px}
    article{background:#0f172a;border:1px solid #1e293b;border-radius:18px;padding:24px}
    .content{line-height:1.75;color:#e2e8f0}
    .content h2,.content h3{color:#fff}
    .content img{max-width:100%;border-radius:12px}
    .meta{font-size:12px;color:#94a3b8;margin-bottom:16px}
    a{color:#38bdf8}
  </style>
</head>
<body>
  <div class="wrap">
    <p><a href="/articles/">← Все статьи</a></p>
    <article>
      <h1><?= e((string)$a['title']) ?></h1>
      <div class="meta"><?= e((string)$a['published_at']) ?></div>
      <div class="content"><?= (string)$a['content_html'] ?></div>
    </article>
  </div>
  <script type="application/ld+json">
  <?= json_encode([
      '@context' => 'https://schema.org',
      '@type' => 'Article',
      'headline' => (string)$a['title'],
      'description' => $desc,
      'datePublished' => (string)$a['published_at'],
      'dateModified' => (string)$a['updated_at'],
      'mainEntityOfPage' => $canonical,
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?>
  </script>
</body>
</html>
