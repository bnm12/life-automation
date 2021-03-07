import { RouteDefinition } from "./routeInterface";
import { WebClient } from '@slack/web-api';
import axios from "axios";

const slack = new WebClient(process.env.SLACK_TOKEN);

export default {
    method: "post",
    handler: async (request, response) => {
        request.log.info(request.body);
        try {
            switch (request.body.event) {
                case "sleep_tracking_started":
                    await slack.users.setPresence({
                        "presence": "away"
                    });
                    await slack.users.profile.set({
                        profile: JSON.stringify({
                            "status_emoji": ":zzz:",
                            "status_text": "Taking a nap for 20 min or 3 hours"
                        })
                    });
                    await slack.dnd.setSnooze({
                        num_minutes: 60 * 4
                    });
                    await axios.patch("https://discord.com/api/v8/users/@me/settings", {
                        "status": "dnd",
                        "custom_status": {
                            "text": "Taking a nap for 20 min or 3 hours",
                            "expires_at": new Date(Date.now() + (4*60*60*1000)).toISOString(), // Add 4 hours
                            "emoji_name": "💤"
                        }
                    },
                        {
                            headers: {
                                "authorization": process.env.DISCORD_TOKEN
                            }
                        });
                    break;
                case "sleep_tracking_stopped":
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
    path: "/sleep-as-android"
} as RouteDefinition