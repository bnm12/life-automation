import axios from "axios";
import { logger } from "../../util/logger";

const apiKey = process.env.POMODONE_TOKEN;

export function parseWebhookEvent(json: string) {
  return JSON.parse(json);
}

export async function registerWebhook() {
  console.log("Register wh");
  const req = await axios.post(
    `https://my.pomodoneapp.com/integration/authorize/?integration=whooks&params[api_key]=${apiKey}`,
    JSON.stringify({
      subscription_url: "registered By LifeAutomation",
      target_url: "https://9d96-46-32-145-216.ngrok.io",
      event: "timerStart",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return req;
}
