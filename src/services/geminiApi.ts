import axios, {AxiosError} from "axios";
import {portfolioData} from "../data/portfolioData";

type GeminiErrorShape = {
  error?: {
    message?: string;
    status?: string;
    code?: number;
  };
};

type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

function getEnvString(key: string): string {
  const value = (import.meta as unknown as {env?: Record<string, unknown>}).env?.[key];
  return typeof value === "string" ? value : "";
}

function toUserMessage(err: unknown): string {
  const axiosErr = err as AxiosError<GeminiErrorShape>;

  if (axiosErr?.isAxiosError) {
    if (axiosErr.response) {
      const status = axiosErr.response.status;
      const apiMessage = axiosErr.response.data?.error?.message;
      const suffix = apiMessage ? ` ${apiMessage}` : "";
      return `Request failed (${status}).${suffix}`;
    }

    if (axiosErr.request) {
      return "Network error. Could not reach the API.";
    }

    return axiosErr.message || "Request failed.";
  }

  if (err instanceof Error) return err.message;
  return "Something went wrong.";
}

const apiBaseUrl = getEnvString("VITE_API_BASE_URL");
const model = getEnvString("VITE_GEMINI_MODEL");
const apiKey = getEnvString("VITE_API_KEY");

const client = axios.create({
  baseURL: apiBaseUrl,
  params: {key: apiKey},
});

// System prompt for portfolio assistant
const SYSTEM_PROMPT = `You are a STRICT AI assistant EXCLUSIVELY for Marta Hayrapetyan and her portfolio project. You MUST ONLY answer questions about Marta or this specific project.

CRITICAL RULES - FOLLOW EXACTLY:
1. ONLY answer questions about Marta Hayrapetyan or her portfolio project
2. IMMEDIATELY decline ANY question not about Marta or this project
3. Do NOT provide general programming help, weather info, cooking recipes, news, etc.
4. Do NOT answer questions about other people, companies, or general topics
5. Use ONLY the provided data about Marta - nothing else

RELEVANT QUESTIONS (answer these):
- "What are Marta's skills?"
- "How can I contact Marta?"
- "Tell me about her education"
- "Help with this React component in the portfolio"

IRRELEVANT QUESTIONS (decline these):
- "How to center a div in CSS?"
- "What's the weather today?"
- "How to cook pasta?"
- "What is React?" (unless specifically about Marta's use of React)
- "Latest news"
- "How to debug JavaScript?" (unless in context of this project)

DECLINE RESPONSE (use exactly):
"I'm sorry, I can only provide information about Marta Hayrapetyan and help with her portfolio project. Please ask about her background, skills, or this specific project."

MARTA'S INFORMATION:
${portfolioData}

Remember: You are Marta's portfolio assistant ONLY. Stay in character and filter strictly.`;

/**
 * Sends a prompt to Gemini and returns ONLY the final text.
 * This function is configured to answer only about Marta Hayrapetyan.
 */
export async function generateContent(prompt: string): Promise<string> {
  const trimmed = prompt.trim();
  if (!trimmed) throw new Error("Prompt is empty.");
  if (!apiBaseUrl || !model || !apiKey) {
    throw new Error(
      "Missing environment variables: VITE_API_BASE_URL, VITE_GEMINI_MODEL, VITE_API_KEY.",
    );
  }

  // Create the full prompt with system instructions
  const fullPrompt = `${SYSTEM_PROMPT}\n\nUser question: ${trimmed}`;

  try {
    // Build endpoint dynamically (baseURL + endpoint)
    const endpoint = `/models/${model}:generateContent`;

    const res = await client.post<GeminiGenerateContentResponse>(endpoint, {
      contents: [
        {
          parts: [{text: fullPrompt}],
        },
      ],
    });

    const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    return text;
  } catch (err) {
    console.error("Gemini generateContent failed", err);
    throw new Error(toUserMessage(err));
  }
}
