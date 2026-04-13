<?php
declare(strict_types=1);
require_once __DIR__ . '/../../src/bootstrap.php';
require_admin();

header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No file']);
    exit;
}

$cfg = app_config();
$dir = (string)$cfg['app']['upload_dir'];
$prefix = (string)$cfg['app']['upload_url_prefix'];
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

$file = $_FILES['file'];
if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Upload error']);
    exit;
}

$tmp = (string)$file['tmp_name'];
$mime = mime_content_type($tmp) ?: '';
$ext = match ($mime) {
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    default => '',
};
if ($ext === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Only jpg/png/webp']);
    exit;
}

$name = 'img_' . date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
$target = rtrim($dir, '/\\') . DIRECTORY_SEPARATOR . $name;
if (!move_uploaded_file($tmp, $target)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save']);
    exit;
}

echo json_encode(['url' => rtrim($prefix, '/') . '/' . $name], JSON_UNESCAPED_UNICODE);
