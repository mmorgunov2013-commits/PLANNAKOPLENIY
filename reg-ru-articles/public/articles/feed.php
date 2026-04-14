<?php
declare(strict_types=1);
require_once __DIR__ . '/../src/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$limit = max(1, min(30, (int)($_GET['limit'] ?? 12)));
$pdo = db();
$st = $pdo->prepare("SELECT slug, title, excerpt, cover_image_url, content_html, published_at FROM articles WHERE status='published' ORDER BY published_at DESC, id DESC LIMIT :lim");
$st->bindValue(':lim', $limit, PDO::PARAM_INT);
$st->execute();
$rows = $st->fetchAll();
$siteUrl = rtrim((string)(app_config()['app']['site_url'] ?? ''), '/');

$normalizeImageUrl = static function (string $src) use ($siteUrl): ?string {
    $src = trim($src);
    if ($src === '') {
        return null;
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

$items = [];
foreach ($rows as $r) {
    $img = trim((string)($r['cover_image_url'] ?? ''));
    if ($img === '') {
        $html = (string)($r['content_html'] ?? '');
        if (preg_match('/<img[^>]+src=["\']([^"\']+)["\']/i', $html, $m) === 1) {
            $img = (string)$m[1];
        }
    }
    $items[] = [
        'slug' => (string)$r['slug'],
        'title' => (string)$r['title'],
        'excerpt' => (string)$r['excerpt'],
        'publishedAt' => (string)$r['published_at'],
        'imageUrl' => $normalizeImageUrl($img),
    ];
}

echo json_encode(['items' => $items], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
