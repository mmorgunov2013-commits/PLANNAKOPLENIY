<?php
declare(strict_types=1);
require_once __DIR__ . '/../src/bootstrap.php';

$pdo = db();
$page = max(1, (int)($_GET['page'] ?? 1));
$perPage = 10;
$offset = ($page - 1) * $perPage;

$countSt = $pdo->query("SELECT COUNT(*) AS c FROM articles WHERE status='published'");
$total = (int)($countSt->fetch()['c'] ?? 0);
$pages = max(1, (int)ceil($total / $perPage));

$st = $pdo->prepare("SELECT slug, title, excerpt, cover_image_url, content_html, published_at FROM articles WHERE status='published' ORDER BY published_at DESC, id DESC LIMIT :lim OFFSET :off");
$st->bindValue(':lim', $perPage, PDO::PARAM_INT);
$st->bindValue(':off', $offset, PDO::PARAM_INT);
$st->execute();
$rows = $st->fetchAll();

$siteUrl = rtrim((string)(app_config()['app']['site_url'] ?? ''), '/');
/**
 * Нормализует URL картинки для карточек:
 * - относительный uploads/articles/x.jpg -> /uploads/articles/x.jpg
 * - /uploads/... -> абсолютный https://site/uploads/...
 */
$normalizeImageUrl = static function (string $src) use ($siteUrl): string {
    $src = trim($src);
    if ($src === '') {
        return '';
    }
    if (preg_match('#^https?://#i', $src) === 1 || str_starts_with($src, 'data:image/')) {
        return $src;
    }
    if (str_starts_with($src, '//')) {
        return 'https:' . $src;
    }
    if (!str_starts_with($src, '/')) {
        $src = '/' . ltrim($src, '/');
    }
    return $siteUrl . $src;
};
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
    .card{display:grid;grid-template-columns:1fr 180px;gap:14px;background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:18px;margin-bottom:12px;color:#e2e8f0}
    .thumb{width:180px;height:110px;object-fit:cover;border-radius:10px}
    @media(max-width:760px){.card{grid-template-columns:1fr}.thumb{width:100%;height:170px}}
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
      <a class="btn" href="https://план-накоплений.рф/">На главную</a>
    </div>
    <?php if (!$rows): ?>
      <p>Скоро здесь появятся полезные материалы по накоплениям.</p>
    <?php else: ?>
      <?php foreach ($rows as $r): ?>
        <?php
          $img = trim((string)($r['cover_image_url'] ?? ''));
          if ($img === '') {
              $html = (string)($r['content_html'] ?? '');
              if (preg_match('/<img[^>]+src=["\']([^"\']+)["\']/i', $html, $m) === 1) {
                  $img = (string)$m[1];
              }
          }
          $img = $normalizeImageUrl($img);
        ?>
        <a class="card" href="/articles/<?= e((string)$r['slug']) ?>/">
          <div>
            <h2 style="margin:0 0 8px"><?= e((string)$r['title']) ?></h2>
            <p style="margin:0;color:#cbd5e1"><?= e((string)$r['excerpt']) ?></p>
            <div class="meta"><?= e((string)$r['published_at']) ?></div>
          </div>
          <?php if ($img !== ''): ?><img class="thumb" src="<?= e($img) ?>" alt="<?= e((string)$r['title']) ?>" loading="lazy" onerror="this.style.display='none'"><?php endif; ?>
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
