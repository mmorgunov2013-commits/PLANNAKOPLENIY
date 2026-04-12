<?php

declare(strict_types=1);

/**
 * Подпись запроса Т-Банк (эквайринг): значения пар + Password, сортировка по ключу, конкатенация значений, SHA-256.
 * @param array<string, string> $flatStringParams
 */
function tbank_sign_token(array $flatStringParams, string $password): string
{
    $pairs = $flatStringParams;
    $pairs['Password'] = $password;
    ksort($pairs, SORT_STRING);
    $concat = '';
    foreach ($pairs as $v) {
        $concat .= (string) $v;
    }
    return hash('sha256', $concat);
}

/** Параметры для проверки Token во входящем уведомлении (без вложенных объектов). */
function tbank_notification_params_for_token(array $obj): array
{
    $flat = [];
    foreach ($obj as $k => $value) {
        if ($k === 'Token') {
            continue;
        }
        if ($value === null) {
            continue;
        }
        if (is_array($value) || is_object($value)) {
            continue;
        }
        if (is_bool($value)) {
            $flat[$k] = $value ? 'true' : 'false';
        } else {
            $flat[$k] = (string) $value;
        }
    }
    return $flat;
}

/**
 * Базовый URL API эквайринга.
 * — Терминал с суффиксом DEMO (настройка «тестовый терминал» в кабинете): только https://securepay.tinkoff.ru/v2
 *   (см. https://developer.tinkoff.ru/eacq/intro/errors/test-cases ).
 * — Боевой терминал без DEMO + тестовая среда и IP в whitelist: https://rest-api-test.tinkoff.ru/v2
 *   (см. https://developer.tinkoff.ru/eacq/intro/errors/test ), включается флагом TBANK_USE_REST_API_TEST.
 */
function tbank_resolve_base_url(string $terminalKey, ?string $override, bool $useRestApiTestEnv = false): string
{
    if ($override !== null && $override !== '') {
        return rtrim($override, '/');
    }
    if (stripos($terminalKey, 'DEMO') !== false) {
        return 'https://securepay.tinkoff.ru/v2';
    }
    if ($useRestApiTestEnv) {
        return 'https://rest-api-test.tinkoff.ru/v2';
    }
    return 'https://securepay.tinkoff.ru/v2';
}

/** @return array<string, mixed> */
function tbank_load_config(): array
{
    $local = __DIR__ . '/config.local.php';
    if (!is_readable($local)) {
        throw new RuntimeException('Создайте api/config.local.php из config.example.php');
    }
    /** @var array<string, mixed> $cfg */
    $cfg = require $local;
    return $cfg;
}

/**
 * Кириллические домены в SuccessURL/FailURL API может отклонять — приводим хост к punycode (если есть ext-intl).
 */
function tbank_url_host_to_punycode(string $url): string
{
    $url = trim($url);
    if ($url === '') {
        return $url;
    }
    $parts = parse_url($url);
    if ($parts === false || empty($parts['host'])) {
        return $url;
    }
    $host = $parts['host'];
    if (!preg_match('/[^\x00-\x7F]/', $host)) {
        return $url;
    }
    if (!function_exists('idn_to_ascii')) {
        return $url;
    }
    $variant = defined('INTL_IDNA_VARIANT_UTS46')
        ? INTL_IDNA_VARIANT_UTS46
        : (defined('INTL_IDNA_VARIANT_2003') ? INTL_IDNA_VARIANT_2003 : 0);
    $ascii = @idn_to_ascii($host, IDNA_DEFAULT, $variant);
    if ($ascii === false || $ascii === '') {
        return $url;
    }
    $parts['host'] = $ascii;
    $scheme = isset($parts['scheme']) ? $parts['scheme'] . '://' : 'https://';
    $auth = '';
    if (isset($parts['user'])) {
        $auth = $parts['user'];
        if (isset($parts['pass'])) {
            $auth .= ':' . $parts['pass'];
        }
        $auth .= '@';
    }
    $port = isset($parts['port']) ? ':' . (int) $parts['port'] : '';
    $path = $parts['path'] ?? '';
    $query = isset($parts['query']) ? '?' . $parts['query'] : '';
    $fragment = isset($parts['fragment']) ? '#' . $parts['fragment'] : '';
    return $scheme . $auth . $parts['host'] . $port . $path . $query . $fragment;
}

function tbank_cors_init(): void
{
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

function tbank_extract_email_from_notify(array $payload): ?string
{
    $raw = null;
    if (!empty($payload['DATA']) && is_string($payload['DATA'])) {
        $raw = $payload['DATA'];
    } elseif (!empty($payload['Data']) && is_string($payload['Data'])) {
        $raw = $payload['Data'];
    }
    if ($raw !== null) {
        $d = json_decode($raw, true);
        if (is_array($d) && !empty($d['Email']) && is_string($d['Email'])) {
            return trim($d['Email']);
        }
    }
    return null;
}

function tbank_already_sent_payment(string $dataDir, string $paymentId): bool
{
    $file = $dataDir . '/sent_payment_ids.txt';
    if (!is_readable($file)) {
        return false;
    }
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
    return in_array($paymentId, $lines, true);
}

function tbank_mark_payment_sent(string $dataDir, string $paymentId): void
{
    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }
    $file = $dataDir . '/sent_payment_ids.txt';
    file_put_contents($file, $paymentId . "\n", FILE_APPEND | LOCK_EX);
}

/**
 * Отправка письма с вложением (mail() на хостинге).
 * @param array<string, mixed> $cfg
 */
function tbank_send_materials_email(array $cfg, string $toEmail): bool
{
    $subjectText = (string) ($cfg['MAIL_SUBJECT'] ?? 'План накоплений — материалы после оплаты');
    $subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';

    $html = (string) ($cfg['MAIL_HTML'] ?? '<p>Спасибо за покупку. Материалы во вложении.</p>');

    $fromEmail = (string) ($cfg['MAIL_FROM_EMAIL'] ?? 'noreply@plan-nakopleniy.ru');
    $fromNameRaw = (string) ($cfg['MAIL_FROM_NAME'] ?? 'План накоплений');
    $fromName = '=?UTF-8?B?' . base64_encode($fromNameRaw) . '?=';

    $zipPath = isset($cfg['PRODUCT_ZIP_ABSOLUTE']) ? (string) $cfg['PRODUCT_ZIP_ABSOLUTE'] : '';
    $hasZip = $zipPath !== '' && is_readable($zipPath);

    $headers = "MIME-Version: 1.0\r\n" .
        'From: ' . $fromName . ' <' . $fromEmail . ">\r\n" .
        'X-Mailer: PHP/' . phpversion();

    $reply = isset($cfg['MAIL_REPLY_TO']) ? trim((string) $cfg['MAIL_REPLY_TO']) : '';
    if ($reply !== '') {
        $headers .= "\r\nReply-To: " . $reply;
    }

    if ($hasZip) {
        $boundary = '==Multipart_Boundary_x' . md5((string) time()) . 'x';
        $headers .= "\r\nContent-Type: multipart/mixed; boundary=\"{$boundary}\"";

        $body = "This is a multi-part message in MIME format.\r\n\r\n";
        $body .= "--{$boundary}\r\n";
        $body .= "Content-Type: text/html; charset=\"UTF-8\"\r\n";
        $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $body .= $html . "\r\n\r\n";

        $fileData = chunk_split(base64_encode((string) file_get_contents($zipPath)));
        $filename = basename($zipPath);
        $body .= "--{$boundary}\r\n";
        $body .= "Content-Type: application/zip; name=\"{$filename}\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n\r\n";
        $body .= $fileData . "\r\n\r\n";
        $body .= "--{$boundary}--";

        return @mail($toEmail, $subject, $body, $headers, '-f ' . $fromEmail);
    }

    $headers .= "\r\nContent-type: text/html; charset=UTF-8";
    return @mail($toEmail, $subject, $html, $headers, '-f ' . $fromEmail);
}
