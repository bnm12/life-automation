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
      if (request.body.status) {
        await setSlackStatus(
          ':car:',
          'Out driving, expect slow responses',
          'away',
          0
        );

        await axios.patch(
          'https://discord.com/api/v8/users/@me/settings',
          {
            status: 'idle',
            custom_status: {
              text: 'Out driving expect slow responses',
              expires_at: new Date(
                Date.now() + 24 * 60 * 60 * 1000
              ).toISOString(), // Expire tomorrow if we don't expire it before then
              emoji_name: '🚗',
            },
          },
          {
            headers: {
              authorization: process.env.DISCORD_TOKEN,
            },
          }
        );
      } else {
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
      }
      response.status(200).send(request.body).end(); // Responding is important
    } catch (error) {
      response.status(501).send(error).end();
    }
  },
  path: '/car-mode',
} as RouteDefinition;
