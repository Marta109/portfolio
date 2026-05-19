export {getDidApiBaseUrl, getDidApiKey, resolveTalkSourceUrl, DID_FALLBACK_SOURCE_URL} from "./config";
export {createTalk, getTalk, pollTalkUntilDone} from "./talksApi";
export {
  clearVoiceIntroCache,
  getCachedVoiceIntroResultUrl,
  normalizeIntroText,
  setCachedVoiceIntro,
  VOICE_INTRO_CACHE_TTL_MS,
} from "./introUrlCache";
export type {VoiceIntroCacheRecord} from "./introUrlCache";
export type {
  CreateTalkRequest,
  CreateTalkResponse,
  GetTalkResponse,
  MicrosoftTtsProvider,
  TextTalkScript,
} from "./types";
