import { RouteDefinition } from './routeInterface';
import { resetSlackStatus, setSlackStatus } from '../services/slack-wrapper';
import { resetDiscordStatus, setDiscordStatus } from '../services/discord';

export default {
  method: 'post',
  handler: async (request, response) => {
    request.log.info(request.body);
    try {
      switch (request.body.event) {
        case 'sleep_tracking_started':
          await setSlackStatus(
            ':zzz:',
            'Taking a nap for 20 min or 3 hours',
            'away',
            60 * 4
          );
          await setDiscordStatus(
            '💤',
            'Taking a nap for 20 min or 3 hours',
            'dnd',
            4 * 60
          );
          break;
        case 'sleep_tracking_stopped':
          await resetSlackStatus();
          await resetDiscordStatus();
          break;
        default:
          break;
      }
      response.status(200).send(request.body).end(); // Responding is important
    } catch (error) {
      response.status(501).send(error).end();
    }
  },
  path: '/sleep-as-android',
} as RouteDefinition;
