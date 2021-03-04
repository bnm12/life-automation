import { RouteDefinition } from "./routeInterface";
import { WebClient } from '@slack/web-api';
const slack = new WebClient(process.env.SLACK_TOKEN);

export default {
    method: "post",
    handler: async (request, response) => {

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
                break;
            default:
                break;
        }
        response.status(200).send(request.body).end() // Responding is important
    },
    path: "/sleep-as-android"
} as RouteDefinition