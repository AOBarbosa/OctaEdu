import { createHash } from 'node:crypto';

interface Entry {
  failures: number;
  windowStart: number;
  blockedUntil: number;
}

const WINDOW_MS = 15 * 60 * 1000;
const BLOCK_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_EMAIL = 5;
const MAX_FAILURES_PER_IP = 20;
const MAX_ENTRIES = 5000;

const entries = new Map<string, Entry>();

export function loginLimitKeys(ip: string, email: string) {
  const emailHash = createHash('sha256').update(email).digest('hex');
  return [
    { key: `ip:${ip}`, max: MAX_FAILURES_PER_IP },
    { key: `email:${emailHash}`, max: MAX_FAILURES_PER_EMAIL },
  ];
}

/** Retorna em quantos segundos o login volta a ser permitido, ou 0 se não houver bloqueio. */
export function secondsUntilUnblocked(keys: { key: string }[]) {
  const now = Date.now();
  const waits = keys.map(({ key }) => (entries.get(key)?.blockedUntil ?? 0) - now);
  return Math.max(0, Math.ceil(Math.max(...waits) / 1000));
}

export function registerFailure(keys: { key: string; max: number }[]) {
  const now = Date.now();
  pruneEntries(now);
  for (const { key, max } of keys) {
    const entry = entries.get(key);
    const current =
      entry && now - entry.windowStart < WINDOW_MS ? entry : { failures: 0, windowStart: now, blockedUntil: 0 };
    current.failures += 1;
    if (current.failures >= max) {
      current.blockedUntil = now + BLOCK_MS;
      current.failures = 0;
      current.windowStart = now;
    }
    entries.set(key, current);
  }
}

export function clearFailures(keys: { key: string }[]) {
  for (const { key } of keys) entries.delete(key);
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'desconhecido';
}

function pruneEntries(now: number) {
  if (entries.size < MAX_ENTRIES) return;
  for (const [key, entry] of entries) {
    if (entry.blockedUntil < now && now - entry.windowStart > WINDOW_MS) entries.delete(key);
  }
}
