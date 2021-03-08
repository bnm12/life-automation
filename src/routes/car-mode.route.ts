import { RouteDefinition } from './routeInterface';
import { resetSlackStatus, setSlackStatus } from '../services/slack-wrapper';
import { resetDiscordStatus, setDiscordStatus } from '../services/discord';

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
        await setDiscordStatus(
          '🚗',
          'Out driving, expect slow responses',
          'online',
          24 * 60
        );
      } else {
        await resetSlackStatus();
        await resetDiscordStatus();
      }
      response.status(200).send(request.body).end(); // Responding is important
    } catch (error) {
      response.status(501).send(error).end();
    }
  },
  path: '/car-mode',
} as RouteDefinition;
