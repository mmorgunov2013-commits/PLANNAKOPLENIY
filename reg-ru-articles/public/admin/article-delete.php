<?php
declare(strict_types=1);
require_once __DIR__ . '/../src/bootstrap.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /admin/articles.php');
    exit;
}
$id = (int)($_POST['id'] ?? 0);
if ($id > 0) {
    $st = db()->prepare('DELETE FROM articles WHERE id = :id');
    $st->execute(['id' => $id]);
}
header('Location: /admin/articles.php');
exit;
