import axios, {type AxiosInstance} from "axios";
import {getDidApiBaseUrl, getDidApiKey} from "./config";

let client: AxiosInstance | null = null;

function buildAuthHeader(apiKey: string): string {
  return `Basic ${btoa(`${apiKey}:`)}`;
}

export function getDidHttpClient(): AxiosInstance {
  const apiKey = getDidApiKey();
  if (!apiKey) {
    throw new Error("Missing VITE_DID_API_KEY. Add it to your environment to use voice intro.");
  }

  if (!client) {
    client = axios.create({
      baseURL: getDidApiBaseUrl(),
      headers: {
        "Content-Type": "application/json",
        Authorization: buildAuthHeader(apiKey),
      },
    });
  }

  return client;
}
