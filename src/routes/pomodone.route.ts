import { RouteDefinition } from './routeInterface';
import { resetSlackStatus, setSlackStatus } from '../services/slack-wrapper';
import { resetDiscordStatus, setDiscordStatus } from '../services/discord';

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
          await setDiscordStatus(
            '🍅',
            `Doing focused work right now. Next break at: ${expireTime.toLocaleTimeString(
              'en-GB',
              { hour: '2-digit', minute: '2-digit' }
            )}. DND please`,
            'dnd',
            minutes
          );
          break;
        case 'timerStop':
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
  path: '/pomodone',
} as RouteDefinition;
