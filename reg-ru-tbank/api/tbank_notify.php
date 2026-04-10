<?php

declare(strict_types=1);

require_once __DIR__ . '/common.php';

// Т-Банк ждёт 200 и тело OK (без JSON)
header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'METHOD';
    exit;
}

try {
    $cfg = tbank_load_config();
} catch (Throwable $e) {
    http_response_code(500);
    echo 'CONFIG';
    exit;
}

$terminalKey = (string) ($cfg['TBANK_TERMINAL_KEY'] ?? '');
$password = (string) ($cfg['TBANK_PASSWORD'] ?? '');
$dataDir = (string) ($cfg['DATA_DIR'] ?? (__DIR__ . '/../data'));

$raw = file_get_contents('php://input') ?: '';
$payload = json_decode($raw, true);
if (!is_array($payload)) {
    http_response_code(400);
    echo 'BAD_BODY';
    exit;
}

if ($terminalKey !== '' && !empty($payload['TerminalKey']) && (string) $payload['TerminalKey'] !== $terminalKey) {
    http_response_code(403);
    echo 'BAD_TERMINAL';
    exit;
}

$expected = tbank_sign_token(tbank_notification_params_for_token($payload), $password);
$got = isset($payload['Token']) ? (string) $payload['Token'] : '';
if ($got === '' || !hash_equals($expected, $got)) {
    http_response_code(403);
    echo 'BAD_TOKEN';
    exit;
}

$success = !empty($payload['Success']) && ($payload['Success'] === true || $payload['Success'] === 'true');
$status = isset($payload['Status']) ? (string) $payload['Status'] : '';
$paymentId = isset($payload['PaymentId']) ? (string) $payload['PaymentId'] : '';

// Одностадийная оплата: обычно CONFIRMED; иногда приходят два уведомления — шлём письмо один раз по PaymentId
$paidLike = $success && ($status === 'CONFIRMED' || $status === 'AUTHORIZED');

if ($paidLike && $paymentId !== '') {
    if (!tbank_already_sent_payment($dataDir, $paymentId)) {
        $email = tbank_extract_email_from_notify($payload);
        if ($email !== null && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $ok = tbank_send_materials_email($cfg, $email);
            error_log('[tbank_notify] mail ' . ($ok ? 'ok' : 'fail') . ' to ' . $email . ' PaymentId=' . $paymentId);
        } else {
            error_log('[tbank_notify] no email in DATA/Data PaymentId=' . $paymentId);
        }
        // Один раз на PaymentId — иначе банк пришлёт второе уведомление и будет дубль письма
        tbank_mark_payment_sent($dataDir, $paymentId);
    }
}

http_response_code(200);
echo 'OK';
