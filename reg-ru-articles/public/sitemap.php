<?php
declare(strict_types=1);
require_once __DIR__ . '/src/bootstrap.php';

header('Content-Type: application/xml; charset=utf-8');
$siteUrl = rtrim((string)(app_config()['app']['site_url'] ?? ''), '/');
$rows = db()->query("SELECT slug, updated_at FROM articles WHERE status='published' ORDER BY published_at DESC")->fetchAll();
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc><?= e($siteUrl) ?>/articles/</loc>
  </url>
<?php foreach ($rows as $r): ?>
  <url>
    <loc><?= e($siteUrl) ?>/articles/<?= e((string)$r['slug']) ?>/</loc>
    <lastmod><?= e(date('c', strtotime((string)$r['updated_at']))) ?></lastmod>
  </url>
<?php endforeach; ?>
</urlset>
