/**
 * Persistent cache for D-ID voice intro `result_url` values.
 * Regenerates (and spends credits) only when intro text or voice changes, or after TTL.
 */

const STORAGE_KEY = "portfolio_did_voice_intro_v2";
const CACHE_VERSION = 1 as const;

/** Aligns with typical D-ID result URL lifetime; avoids keeping dead URLs forever. */
export const VOICE_INTRO_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export type VoiceIntroCacheRecord = {
  version: typeof CACHE_VERSION;
  introText: string;
  voiceId: string;
  resultUrl: string;
  savedAt: number;
};

/** Same normalization used for D-ID `script.input` and cache keys. */
export function normalizeIntroText(raw: string): string {
  const t = raw.replace(/\s+/g, " ").trim();
  return t.length >= 3 ? t : "";
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function parseStored(raw: string): VoiceIntroCacheRecord | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return null;
    if (parsed.version !== CACHE_VERSION) return null;
    if (typeof parsed.introText !== "string") return null;
    if (typeof parsed.voiceId !== "string") return null;
    if (typeof parsed.resultUrl !== "string") return null;
    if (typeof parsed.savedAt !== "number" || !Number.isFinite(parsed.savedAt)) return null;
    return parsed as VoiceIntroCacheRecord;
  } catch {
    return null;
  }
}

function readRecord(): VoiceIntroCacheRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return parseStored(raw);
  } catch {
    return null;
  }
}

function writeRecord(record: VoiceIntroCacheRecord) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* quota, private mode, or disabled storage */
  }
}

function removeRecord() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Returns a cached `result_url` when it matches the given intro text and voice, and is within TTL.
 * Otherwise returns null (and removes expired or malformed entries).
 */
export function getCachedVoiceIntroResultUrl(introText: string, voiceId: string): string | null {
  const stored = readRecord();
  if (!stored) return null;

  const now = Date.now();
  if (now - stored.savedAt > VOICE_INTRO_CACHE_TTL_MS) {
    removeRecord();
    return null;
  }

  if (stored.introText !== introText || stored.voiceId !== voiceId) {
    return null;
  }

  return stored.resultUrl;
}

/** Persists intro text, voice, result URL, and timestamp after a successful D-ID run. */
export function setCachedVoiceIntro(parts: {
  introText: string;
  voiceId: string;
  resultUrl: string;
}): void {
  const record: VoiceIntroCacheRecord = {
    version: CACHE_VERSION,
    introText: parts.introText,
    voiceId: parts.voiceId,
    resultUrl: parts.resultUrl,
    savedAt: Date.now(),
  };
  writeRecord(record);
}

/** Clears persisted intro cache (e.g. after failed playback or for debugging). */
export function clearVoiceIntroCache(): void {
  removeRecord();
}
