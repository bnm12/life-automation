import { RouteDefinition } from "./routeInterface";
import { WebClient } from '@slack/web-api';
import axios from "axios";

const slack = new WebClient(process.env.SLACK_TOKEN);

export default {
    method: "post",
    handler: async (request, response) => {
        request.log.info(request.body);
        try {
            switch (request.body.action) {
                case "timerStart":
                    const minutes = request.body.timer.minutesOfDuration;
                    const taskTitle = request.body.card.title;
                    await slack.users.setPresence({
                        "presence": "auto"
                    });
                    await slack.users.profile.set({
                        profile: JSON.stringify({
                            "status_emoji": ":tomato:",
                            "status_text": `on "${taskTitle}" for ${minutes} min. DND please`
                        })
                    });
                    await slack.dnd.setSnooze({
                        num_minutes: minutes
                    });
                    const expireTime = new Date(Date.now() + minutes * 60 * 1000);
                    await axios.patch("https://discord.com/api/v8/users/@me/settings", {
                        "status": "dnd",
                        "custom_status": {
                            "text": `Doing focused work next break at: ${expireTime.toLocaleTimeString("da-dk")}`,
                            "expires_at": expireTime.toISOString(),
                            "emoji_name": "🍅"
                        }
                    },
                        {
                            headers: {
                                "authorization": process.env.DISCORD_TOKEN
                            }
                        });
                    break;
                case "timerStop":
                    await slack.users.setPresence({
                        "presence": "auto"
                    });
                    await slack.users.profile.set({
                        profile: JSON.stringify({
                            "status_emoji": "",
                            "status_text": ""
                        })
                    });
                    await slack.dnd.endDnd();
                    await axios.patch("https://discord.com/api/v8/users/@me/settings", {
                        "status": "online",
                        "custom_status": null
                    },
                        {
                            headers: {
                                "authorization": process.env.DISCORD_TOKEN
                            }
                        });
                    break;
                default:
                    break;
            }
            response.status(200).send(request.body).end() // Responding is important
        }
        catch (error) {
            response.status(501).send(error).end();
        }
    },
    path: "/pomodone"
} as RouteDefinition