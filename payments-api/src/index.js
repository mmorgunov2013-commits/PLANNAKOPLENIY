import crypto from "crypto";
import cors from "cors";
import express from "express";

function signAcquiringToken(flatStringParams, password) {
  const pairs = { ...flatStringParams, Password: password };
  const keys = Object.keys(pairs).sort((a, b) => a.localeCompare(b));
  const concatenated = keys.map((k) => pairs[k]).join("");
  return crypto.createHash("sha256").update(concatenated, "utf8").digest("hex");
}

function timingSafeEqualString(a, b) {
  try {
    const ba = Buffer.from(String(a), "utf8");
    const bb = Buffer.from(String(b), "utf8");
    if (ba.length !== bb.length) return false;
    return crypto.timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

function resolveBaseUrl(terminalKey) {
  if (process.env.TBANK_BASE_URL) return process.env.TBANK_BASE_URL.replace(/\/$/, "");
  if (/DEMO/i.test(terminalKey || "")) return "https://rest-api-test.tinkoff.ru/v2";
  return "https://securepay.tinkoff.ru/v2";
}

function parseAllowedOrigins() {
  const raw = process.env.ALLOW_ORIGINS || process.env.SITE_ORIGIN || "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Браузер для IDN-домена шлёт Origin в punycode; в env часто пишут кириллицу — сравниваем по hostname. */
function originHostname(origin) {
  try {
    return new URL(origin).hostname;
  } catch {
    return null;
  }
}

function isOriginAllowed(origin, allowedList) {
  const h = originHostname(origin);
  if (!h) return false;
  return allowedList.some((allowed) => {
    try {
      return new URL(allowed).hostname === h;
    } catch {
      return false;
    }
  });
}

function notificationParamsForToken(obj) {
  const flat = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === "Token") continue;
    if (value === null || value === undefined) continue;
    if (typeof value === "object") continue;
    flat[key] = typeof value === "boolean" ? (value ? "true" : "false") : String(value);
  }
  return flat;
}

function resolveNotificationUrl() {
  if (process.env.NOTIFICATION_URL) return process.env.NOTIFICATION_URL;
  const base = process.env.RENDER_EXTERNAL_URL || process.env.PUBLIC_BASE_URL;
  if (base) return `${base.replace(/\/$/, "")}/payments/tbank/notify`;
  return "";
}

const app = express();
const allowedOrigins = parseAllowedOrigins();

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      if (allowedOrigins.length === 0) return cb(null, true);
      if (isOriginAllowed(origin, allowedOrigins)) return cb(null, true);
      return cb(null, false);
    },
  }),
);
app.use(express.json({ limit: "256kb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/payments/tbank/init", async (req, res) => {
  const terminalKey = process.env.TBANK_TERMINAL_KEY || "";
  const password = process.env.TBANK_PASSWORD || "";
  const successUrl = process.env.SUCCESS_URL || "";
  const failUrl = process.env.FAIL_URL || "";
  const notificationUrl = resolveNotificationUrl();

  if (!terminalKey || !password) {
    return res.status(500).json({ error: "TBANK_TERMINAL_KEY / TBANK_PASSWORD не заданы на сервере" });
  }
  if (!successUrl || !failUrl) {
    return res.status(500).json({ error: "SUCCESS_URL / FAIL_URL не заданы на сервере" });
  }
  if (!notificationUrl) {
    return res.status(500).json({
      error:
        "NOTIFICATION_URL не задан и нет RENDER_EXTERNAL_URL — укажите NOTIFICATION_URL вручную (URL вебхука на Render)",
    });
  }

  const amount = Number(process.env.PRODUCT_AMOUNT_KOPECKS || 59000);
  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(500).json({ error: "PRODUCT_AMOUNT_KOPECKS должен быть положительным числом (копейки)" });
  }

  const orderId = `s${Date.now().toString(36)}${crypto.randomBytes(4).toString("hex")}`.slice(0, 36);
  const description =
    (process.env.PRODUCT_DESCRIPTION || "Планировщик накоплений").slice(0, 140);

  const body = {
    TerminalKey: terminalKey,
    Amount: amount,
    OrderId: orderId,
    Description: description,
    SuccessURL: successUrl,
    FailURL: failUrl,
    NotificationURL: notificationUrl,
    PayType: "O",
    Language: "ru",
  };

  const flatForToken = {};
  for (const [k, v] of Object.entries(body)) {
    if (v === undefined || v === null) continue;
    flatForToken[k] = typeof v === "number" ? String(v) : String(v);
  }
  body.Token = signAcquiringToken(flatForToken, password);

  const baseUrl = resolveBaseUrl(terminalKey);
  let data;
  try {
    const r = await fetch(`${baseUrl}/Init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    data = await r.json();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "fetch failed";
    return res.status(502).json({ error: `Запрос к Т-Банку не удался: ${msg}` });
  }

  if (!data || data.Success !== true || String(data.ErrorCode) !== "0") {
    return res.status(502).json({
      error: data?.Message || data?.Details || "Init отклонён",
      code: data?.ErrorCode,
    });
  }
  if (!data.PaymentURL) {
    return res.status(502).json({ error: "В ответе нет PaymentURL" });
  }

  return res.json({ paymentUrl: data.PaymentURL, orderId });
});

app.post("/payments/tbank/notify", (req, res) => {
  const terminalKey = process.env.TBANK_TERMINAL_KEY || "";
  const password = process.env.TBANK_PASSWORD || "";
  const payload = req.body;

  if (!payload || typeof payload !== "object") {
    return res.status(400).type("text/plain").send("BAD_BODY");
  }
  if (terminalKey && payload.TerminalKey && payload.TerminalKey !== terminalKey) {
    return res.status(403).type("text/plain").send("BAD_TERMINAL");
  }

  const expected = signAcquiringToken(notificationParamsForToken(payload), password);
  if (!payload.Token || !timingSafeEqualString(expected, payload.Token)) {
    return res.status(403).type("text/plain").send("BAD_TOKEN");
  }

  // Здесь позже: выдача файла / письмо. Пока только подтверждаем приём для банка.
  console.info("[tbank notify]", {
    OrderId: payload.OrderId,
    Status: payload.Status,
    Success: payload.Success,
    PaymentId: payload.PaymentId,
    Amount: payload.Amount,
  });

  return res.status(200).type("text/plain").send("OK");
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => {
  console.info(`payments-api listening on :${port}`);
});
