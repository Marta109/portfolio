import axios, { AxiosError } from 'axios'

type GeminiErrorShape = {
  error?: {
    message?: string
    status?: string
    code?: number
  }
}

type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string
      }>
    }
  }>
}

function getEnvString(key: string): string {
  const value = (import.meta as unknown as { env?: Record<string, unknown> }).env?.[key]
  return typeof value === 'string' ? value : ''
}

function toUserMessage(err: unknown): string {
  const axiosErr = err as AxiosError<GeminiErrorShape>

  if (axiosErr?.isAxiosError) {
    if (axiosErr.response) {
      const status = axiosErr.response.status
      const apiMessage = axiosErr.response.data?.error?.message
      const suffix = apiMessage ? ` ${apiMessage}` : ''
      return `Request failed (${status}).${suffix}`
    }

    if (axiosErr.request) {
      return 'Network error. Could not reach the API.'
    }

    return axiosErr.message || 'Request failed.'
  }

  if (err instanceof Error) return err.message
  return 'Something went wrong.'
}

const apiBaseUrl = getEnvString('VITE_API_BASE_URL')
const model = getEnvString('VITE_GEMINI_MODEL')
const apiKey = getEnvString('VITE_API_KEY')

const client = axios.create({
  baseURL: apiBaseUrl,
  params: { key: apiKey },
})

/**
 * Sends a prompt to Gemini and returns ONLY the final text.
 */
export async function generateContent(prompt: string): Promise<string> {
  const trimmed = prompt.trim()
  if (!trimmed) throw new Error('Prompt is empty.')
  if (!apiBaseUrl || !model || !apiKey) {
    throw new Error('Missing environment variables: VITE_API_BASE_URL, VITE_GEMINI_MODEL, VITE_API_KEY.')
  }

  try {
    // Build endpoint dynamically (baseURL + endpoint)
    const endpoint = `/models/${model}:generateContent`

    const res = await client.post<GeminiGenerateContentResponse>(endpoint, {
      contents: [
        {
          parts: [{ text: trimmed }],
        },
      ],
    })

    const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

    return text
  } catch (err) {
    console.error('Gemini generateContent failed', err)
    throw new Error(toUserMessage(err))
  }
}

