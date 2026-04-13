<?php

declare(strict_types=1);

$configPath = __DIR__ . '/../config/config.local.php';
if (!is_readable($configPath)) {
    $configPath = __DIR__ . '/../config/config.example.php';
}

/** @var array<string, mixed> $config */
$config = require $configPath;

if (!headers_sent()) {
    $sessionName = (string)($config['app']['session_name'] ?? 'pn_admin');
    session_name($sessionName);
    session_start();
}

function app_config(): array
{
    /** @var array<string, mixed> $config */
    global $config;
    return $config;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    $cfg = app_config();
    $db = $cfg['db'];
    $host = (string)$db['host'];
    $port = (int)$db['port'];
    $name = (string)$db['name'];
    $charset = (string)$db['charset'];
    $user = (string)$db['user'];
    $pass = (string)$db['pass'];

    $dsn = "mysql:host={$host};port={$port};dbname={$name};charset={$charset}";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    return $pdo;
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function admin_is_logged_in(): bool
{
    return !empty($_SESSION['admin_user']);
}

function require_admin(): void
{
    if (!admin_is_logged_in()) {
        header('Location: /admin/login.php');
        exit;
    }
}

function admin_login(string $login): void
{
    session_regenerate_id(true);
    $_SESSION['admin_user'] = $login;
}

function admin_logout(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 3600, $params['path'], $params['domain'], (bool)$params['secure'], (bool)$params['httponly']);
    }
    session_destroy();
}

function slugify(string $text): string
{
    $text = mb_strtolower(trim($text));
    $map = [
        'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd', 'е' => 'e', 'ё' => 'e',
        'ж' => 'zh', 'з' => 'z', 'и' => 'i', 'й' => 'i', 'к' => 'k', 'л' => 'l', 'м' => 'm',
        'н' => 'n', 'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't', 'у' => 'u',
        'ф' => 'f', 'х' => 'h', 'ц' => 'cz', 'ч' => 'ch', 'ш' => 'sh', 'щ' => 'sch', 'ъ' => '',
        'ы' => 'y', 'ь' => '', 'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
    ];
    $text = strtr($text, $map);
    $text = preg_replace('/[^a-z0-9]+/u', '-', $text) ?? '';
    $text = trim($text, '-');
    return $text !== '' ? $text : 'statya';
}

function unique_slug(string $base, ?int $excludeId = null): string
{
    $pdo = db();
    $slug = $base;
    $i = 2;
    while (true) {
        if ($excludeId === null) {
            $st = $pdo->prepare('SELECT id FROM articles WHERE slug = :slug LIMIT 1');
            $st->execute(['slug' => $slug]);
        } else {
            $st = $pdo->prepare('SELECT id FROM articles WHERE slug = :slug AND id != :id LIMIT 1');
            $st->execute(['slug' => $slug, 'id' => $excludeId]);
        }
        if (!$st->fetch()) {
            return $slug;
        }
        $slug = $base . '-' . $i;
        $i++;
    }
}

function sanitize_article_html(string $html): string
{
    $allowedTags = '<p><br><h2><h3><blockquote><ul><ol><li><strong><b><em><i><a><img><hr>';
    $clean = strip_tags($html, $allowedTags);
    $clean = preg_replace('/\son\w+="[^"]*"/i', '', $clean) ?? '';
    $clean = preg_replace('/\sstyle="[^"]*"/i', '', $clean) ?? '';
    return trim($clean);
}

function extract_text(string $html): string
{
    $t = trim(preg_replace('/\s+/u', ' ', strip_tags($html)) ?? '');
    return mb_substr($t, 0, 2000);
}
