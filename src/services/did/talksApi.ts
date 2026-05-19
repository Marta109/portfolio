import {type AxiosError, isAxiosError} from "axios";
import {getDidHttpClient} from "./didClient";
import type {CreateTalkRequest, CreateTalkResponse, DidJsonError, GetTalkResponse} from "./types";

function formatDidAxiosError(err: unknown): string {
  const axiosErr = err as AxiosError<DidJsonError>;
  if (axiosErr?.isAxiosError) {
    const kind = axiosErr.response?.data?.kind;
    const description = axiosErr.response?.data?.description;
    if (kind || description) {
      return [kind, description].filter(Boolean).join(": ");
    }
    if (axiosErr.response?.status) {
      return `D-ID request failed (${axiosErr.response.status}).`;
    }
    if (axiosErr.request) {
      return "Network error. Could not reach D-ID.";
    }
    return axiosErr.message || "Request failed.";
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong.";
}

export async function createTalk(body: CreateTalkRequest): Promise<CreateTalkResponse> {
  try {
    const res = await getDidHttpClient().post<CreateTalkResponse>("/talks", body);
    return res.data;
  } catch (err) {
    throw new Error(formatDidAxiosError(err));
  }
}

export async function getTalk(talkId: string, signal?: AbortSignal): Promise<GetTalkResponse> {
  try {
    const res = await getDidHttpClient().get<GetTalkResponse>(`/talks/${encodeURIComponent(talkId)}`, {
      signal,
    });
    return res.data;
  } catch (err) {
    if (isAxiosError(err) && err.code === "ERR_CANCELED") {
      throw err;
    }
    throw new Error(formatDidAxiosError(err));
  }
}

export type PollTalkOptions = {
  intervalMs?: number;
  maxAttempts?: number;
  signal?: AbortSignal;
};

export async function pollTalkUntilDone(talkId: string, options: PollTalkOptions = {}): Promise<GetTalkResponse> {
  const intervalMs = options.intervalMs ?? 2000;
  const maxAttempts = options.maxAttempts ?? 90;
  const {signal} = options;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    const talk = await getTalk(talkId, signal);

    if (talk.status === "done") {
      if (!talk.result_url) {
        throw new Error("Talk finished but no result_url was returned.");
      }
      return talk;
    }

    if (talk.status === "error" || talk.status === "rejected") {
      throw new Error(`Talk generation failed (status: ${talk.status}).`);
    }

    await new Promise<void>((resolve, reject) => {
      const t = window.setTimeout(resolve, intervalMs);
      const onAbort = () => {
        window.clearTimeout(t);
        reject(new DOMException("Aborted", "AbortError"));
      };
      signal?.addEventListener("abort", onAbort, {once: true});
    });
  }

  throw new Error("Timed out waiting for D-ID to finish generating the talk.");
}
