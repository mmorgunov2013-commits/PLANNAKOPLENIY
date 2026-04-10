<?php

declare(strict_types=1);

require_once __DIR__ . '/common.php';

header('Content-Type: application/json; charset=utf-8');
tbank_cors_init();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $cfg = tbank_load_config();
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}

$terminalKey = (string) ($cfg['TBANK_TERMINAL_KEY'] ?? '');
$password = (string) ($cfg['TBANK_PASSWORD'] ?? '');
$successUrl = (string) ($cfg['SUCCESS_URL'] ?? '');
$failUrl = (string) ($cfg['FAIL_URL'] ?? '');
$notificationUrl = (string) ($cfg['NOTIFICATION_URL'] ?? '');
$amount = (int) ($cfg['PRODUCT_AMOUNT_KOPECKS'] ?? 0);
$description = mb_substr((string) ($cfg['PRODUCT_DESCRIPTION'] ?? 'Оплата'), 0, 140);

if ($terminalKey === '' || $password === '') {
    http_response_code(500);
    echo json_encode(['error' => 'Не заданы TBANK_TERMINAL_KEY / TBANK_PASSWORD в config.local.php']);
    exit;
}
if ($successUrl === '' || $failUrl === '' || $notificationUrl === '') {
    http_response_code(500);
    echo json_encode(['error' => 'Заполните SUCCESS_URL, FAIL_URL, NOTIFICATION_URL']);
    exit;
}
if ($amount <= 0) {
    http_response_code(500);
    echo json_encode(['error' => 'PRODUCT_AMOUNT_KOPECKS должен быть > 0']);
    exit;
}

$raw = file_get_contents('php://input') ?: '';
$in = json_decode($raw, true);
$email = '';
if (is_array($in) && !empty($in['email']) && is_string($in['email'])) {
    $email = trim($in['email']);
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Укажите корректный email для отправки материалов']);
    exit;
}

$orderId = 's' . base_convert((string) time(), 10, 36) . bin2hex(random_bytes(4));
$orderId = mb_substr($orderId, 0, 36);

$body = [
    'TerminalKey' => $terminalKey,
    'Amount' => $amount,
    'OrderId' => $orderId,
    'Description' => $description,
    'SuccessURL' => $successUrl,
    'FailURL' => $failUrl,
    'NotificationURL' => $notificationUrl,
    'PayType' => 'O',
    'Language' => 'ru',
    'DATA' => ['Email' => $email],
];

$flatForToken = [];
foreach ($body as $k => $v) {
    if (is_array($v)) {
        continue;
    }
    $flatForToken[$k] = is_int($v) ? (string) $v : (string) $v;
}
$body['Token'] = tbank_sign_token($flatForToken, $password);

$baseUrl = tbank_resolve_base_url($terminalKey, isset($cfg['TBANK_BASE_URL']) ? $cfg['TBANK_BASE_URL'] : null);
$url = $baseUrl . '/Init';

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode($body, JSON_UNESCAPED_UNICODE),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
]);
$resp = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

if ($resp === false) {
    http_response_code(502);
    echo json_encode(['error' => 'Запрос к Т-Банку не удался: ' . $err]);
    exit;
}

$data = json_decode($resp, true);
if (!is_array($data)) {
    http_response_code(502);
    echo json_encode([
        'error' => 'Т-Банк вернул не JSON (проверьте IP/доступ к API или пароль терминала)',
        'hint' => mb_substr($resp, 0, 200),
    ]);
    exit;
}

if (empty($data['Success']) || (string) ($data['ErrorCode'] ?? '') !== '0') {
    http_response_code(502);
    echo json_encode([
        'error' => (string) ($data['Message'] ?? $data['Details'] ?? 'Init отклонён'),
        'code' => $data['ErrorCode'] ?? null,
    ]);
    exit;
}

if (empty($data['PaymentURL'])) {
    http_response_code(502);
    echo json_encode(['error' => 'В ответе нет PaymentURL']);
    exit;
}

echo json_encode([
    'paymentUrl' => $data['PaymentURL'],
    'orderId' => $orderId,
], JSON_UNESCAPED_UNICODE);
