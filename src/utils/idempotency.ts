export const IDEMPOTENCY_STORAGE_KEY = "checkout:pendingIdempotencyKey";

export function getIdempotencyKey(): string | null {
  try {
    return localStorage.getItem(IDEMPOTENCY_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function ensureIdempotencyKey(): string {
  let key = getIdempotencyKey();
  if (!key) {
    key = crypto.randomUUID();
    try {
      localStorage.setItem(IDEMPOTENCY_STORAGE_KEY, key);
    } catch {}
  }
  return key;
}

export function clearIdempotencyKey(): void {
  try {
    localStorage.removeItem(IDEMPOTENCY_STORAGE_KEY);
  } catch {}
}

