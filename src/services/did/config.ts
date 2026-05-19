/**
 * D-ID Talks API base URL.
 * - In Vite dev, requests go through `/did-api` (see vite.config.ts proxy) to avoid browser CORS.
 * - In production, defaults to https://api.d-id.com. If your host blocks CORS, set
 *   VITE_DID_API_BASE_URL to a same-origin reverse proxy path (e.g. `/api/did`).
 */
export function getDidApiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_DID_API_BASE_URL;
  if (typeof fromEnv === "string" && fromEnv.trim()) {
    return fromEnv.trim().replace(/\/$/, "");
  }
  if (import.meta.env.DEV) {
    return "/did-api";
  }
  return "https://api.d-id.com";
}

export function getDidApiKey(): string {
  const key = import.meta.env.VITE_DID_API_KEY;
  return typeof key === "string" ? key.trim() : "";
}

/** Public presenter image D-ID can always fetch (e.g. localhost has no reachable photo URL). */
export const DID_FALLBACK_SOURCE_URL =
  "https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.png";

export function resolveTalkSourceUrl(): string {
  if (typeof window === "undefined") {
    return DID_FALLBACK_SOURCE_URL;
  }
  const {hostname, origin} = window.location;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return DID_FALLBACK_SOURCE_URL;
  }
  return `${origin}/marta-photo.png`;
}
