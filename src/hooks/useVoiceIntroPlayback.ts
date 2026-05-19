import {useCallback, useEffect, useRef, useState} from "react";

/** Pre-generated intro (D-ID + Microsoft neural voice), served from `public/audio/intro.mp3`. */
export const VOICE_INTRO_AUDIO_SRC = "/audio/intro.mp3";

export type VoiceIntroUiState = "idle" | "playing" | "paused";

function pauseOtherIntroAudio(current: HTMLAudioElement) {
  document.querySelectorAll<HTMLAudioElement>("audio[data-voice-intro]").forEach((el) => {
    if (el !== current) {
      el.pause();
      el.currentTime = 0;
    }
  });
}

export function useVoiceIntroPlayback() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const suppressPauseUiRef = useRef(false);

  const [uiState, setUiState] = useState<VoiceIntroUiState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onPlay = () => setUiState("playing");

    const onPause = () => {
      if (suppressPauseUiRef.current) {
        suppressPauseUiRef.current = false;
        return;
      }
      if (a.ended) {
        setUiState("idle");
        return;
      }
      setUiState("paused");
    };

    const onEnded = () => {
      setUiState("idle");
      a.currentTime = 0;
    };

    const onError = () => {
      const hasSrc = (a.currentSrc || a.src || "").trim();
      if (!hasSrc) return;
      setErrorMessage("Could not load intro audio. Ensure /audio/intro.mp3 is present in public/audio.");
      setUiState("idle");
    };

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    a.addEventListener("error", onError);

    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
      a.removeEventListener("error", onError);
    };
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    return () => {
      if (!a) return;
      suppressPauseUiRef.current = true;
      a.pause();
      a.removeAttribute("src");
      a.load();
    };
  }, []);

  const togglePlayPause = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;

    if (uiState === "playing") {
      a.pause();
      return;
    }

    setErrorMessage(null);

    if (uiState === "paused") {
      try {
        pauseOtherIntroAudio(a);
        await a.play();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Playback was blocked.";
        setErrorMessage(msg);
        setUiState("idle");
      }
      return;
    }

    try {
      pauseOtherIntroAudio(a);
      if (a.ended) {
        a.currentTime = 0;
      } else if (Number.isFinite(a.duration) && a.duration > 0 && a.currentTime >= a.duration) {
        a.currentTime = 0;
      }
      await a.play();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Playback was blocked.";
      setErrorMessage(msg);
      setUiState("idle");
    }
  }, [uiState]);

  return {
    audioRef,
    uiState,
    errorMessage,
    togglePlayPause,
  };
}
