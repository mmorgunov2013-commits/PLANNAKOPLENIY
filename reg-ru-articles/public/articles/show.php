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
  <!-- Yandex.Metrika counter -->
  <script type="text/javascript">
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108609817', 'ym');
    ym(108609817, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
  </script>
  <!-- /Yandex.Metrika counter -->
  <style>
    body{margin:0;font-family:Inter,system-ui,sans-serif;background:#020617;color:#e2e8f0}
    .wrap{max-width:860px;margin:0 auto;padding:36px 16px}
    article{background:#0f172a;border:1px solid #1e293b;border-radius:18px;padding:24px}
    .content{line-height:1.75;color:#e2e8f0}
    .content h2,.content h3{color:#fff}
    .content img{max-width:100%;border-radius:12px}
    .meta{font-size:12px;color:#94a3b8;margin-bottom:16px}
    a{color:#38bdf8}
    .btnRow{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
    .btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:10px;text-decoration:none;font-weight:700}
    .btnMain{background:#22c55e;color:#052e16}
    .btnList{background:#1e293b;color:#e2e8f0;border:1px solid #334155}
  </style>
</head>
<body>
  <noscript><div><img src="https://mc.yandex.ru/watch/108609817" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
  <div class="wrap">
    <p><a href="/articles/">← Все статьи</a></p>
    <article>
      <h1><?= e((string)$a['title']) ?></h1>
      <div class="meta"><?= e((string)$a['published_at']) ?></div>
      <div class="content"><?= (string)$a['content_html'] ?></div>
      <div class="btnRow">
        <a class="btn btnMain" href="https://план-накоплений.рф/">На главную</a>
        <a class="btn btnList" href="/articles/">Все статьи</a>
      </div>
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
