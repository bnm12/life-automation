import { RouteDefinition } from './routeInterface';
import { resetSlackStatus, setSlackStatus } from '../services/slack-wrapper';
import { resetDiscordStatus, setDiscordStatus } from '../services/discord';

export default {
  method: 'post',
  handler: async (request, response) => {
    request.log.info(request.body, request.body.status);
    response.status(200).send(request.body).end(); // Responding is important
    try {
      if (request.body.status) {
        await setSlackStatus(
          ':car:',
          'Out driving, expect slow responses',
          'away',
          0,
          false
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
    } catch (error) {
      request.log.error(error);
    }
  },
  path: '/car-mode',
} as RouteDefinition;
