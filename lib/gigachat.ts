import GigaChat from "gigachat";
import { Agent } from "node:https";

export function createGigaChatClient() {
  const credentials =
    process.env.GIGACHAT_CREDENTIALS ||
    (process.env.GIGACHAT_CLIENT_ID && process.env.GIGACHAT_CLIENT_SECRET
      ? Buffer.from(
          `${process.env.GIGACHAT_CLIENT_ID}:${process.env.GIGACHAT_CLIENT_SECRET}`,
        ).toString("base64")
      : undefined);

  if (!credentials) {
    throw new Error(
      "GigaChat credentials not configured. Set GIGACHAT_CREDENTIALS or GIGACHAT_CLIENT_ID + GIGACHAT_CLIENT_SECRET.",
    );
  }

  return new GigaChat({
    timeout: 600,
    model: "GigaChat-2-Pro",
    credentials,
    scope: "GIGACHAT_API_PERS",
    httpsAgent: new Agent({ rejectUnauthorized: false }),
  });
}
