import { RouteDefinition } from './routeInterface';
import { WebClient } from '@slack/web-api';
import axios from 'axios';
import { resetSlackStatus, setSlackStatus } from '../services/slack-wrapper';

const slack = new WebClient(process.env.SLACK_TOKEN);

export default {
  method: 'post',
  handler: async (request, response) => {
    request.log.info(request.body);
    try {
      switch (request.body.action) {
        case 'timerStart':
          const minutes = request.body.timer.value;
          const taskTitle = request.body.card.title;

          await setSlackStatus(
            ':tomato:',
            `on "${taskTitle}" for ${minutes} min. DND please`,
            'auto',
            minutes
          );

          const expireTime = new Date(Date.now() + minutes * 60 * 1000);
          await axios.patch(
            'https://discord.com/api/v8/users/@me/settings',
            {
              status: 'dnd',
              custom_status: {
                text: `Doing focused work right now. Next break at: ${expireTime.toLocaleTimeString(
                  'en-GB',
                  { hour: '2-digit', minute: '2-digit' }
                )}. DND please`,
                expires_at: expireTime.toISOString(),
                emoji_name: '🍅',
              },
            },
            {
              headers: {
                authorization: process.env.DISCORD_TOKEN,
              },
            }
          );
          break;
        case 'timerStop':
          await resetSlackStatus();

          await axios.patch(
            'https://discord.com/api/v8/users/@me/settings',
            {
              status: 'online',
              custom_status: null,
            },
            {
              headers: {
                authorization: process.env.DISCORD_TOKEN,
              },
            }
          );
          break;
        default:
          break;
      }
      response.status(200).send(request.body).end(); // Responding is important
    } catch (error) {
      response.status(501).send(error).end();
    }
  },
  path: '/pomodone',
} as RouteDefinition;
