export type TalkStatus = "created" | "started" | "done" | "error" | "rejected";

export type DidJsonError = {
  kind?: string;
  description?: string;
};

export type MicrosoftTtsProvider = {
  type: "microsoft";
  voice_id: string;
};

export type TextTalkScript = {
  type: "text";
  input: string;
  provider: MicrosoftTtsProvider;
  subtitles?: boolean;
  ssml?: boolean;
};

export type CreateTalkRequest = {
  source_url?: string;
  script: TextTalkScript;
};

export type CreateTalkResponse = {
  id: string;
  object?: string;
  created_at?: string;
  status: TalkStatus;
};

export type GetTalkResponse = {
  id: string;
  status: TalkStatus;
  result_url?: string;
  source_url?: string;
  created_at?: string;
  modified_at?: string;
};
