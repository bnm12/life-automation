import { RouteDefinition } from './routeInterface';
import { resetSlackStatus, setSlackStatus } from '../services/slack-wrapper';
import { resetDiscordStatus, setDiscordStatus } from '../services/discord';

export default {
  method: 'post',
  handler: async (request, response) => {
    request.log.info(request.body, request.body.action);
    response.status(200).send(request.body).end(); // Responding is important
    try {
      const taskTitle = request.body.name;
      const minutes = request.body.minutes ?? 0;
      const expireTime = new Date(Date.now() + minutes * 60 * 1000);

      switch (request.body.eventType) {
        case 'timerStart':
          await setSlackStatus(
            ':tomato:',
            `on "${taskTitle}" for ${minutes} min. DND please`,
            'auto',
            minutes,
            true
          );

          await setDiscordStatus(
            '🍅',
            `Doing focused work right now. Next break at: ${expireTime.toLocaleTimeString(
              'en-GB',
              {
                timeZone: process.env.TZ,
                hour: '2-digit',
                minute: '2-digit',
              }
            )}. DND please`,
            'dnd',
            minutes
          );
          break;
        case 'pauseStart':
          await setSlackStatus(
            ':stopwatch:',
            `on "${taskTitle}" (PAUSED)`,
            'auto',
            0,
            false
          );

          await setDiscordStatus(
            '⏱',
            `Taking a break from current focus task`,
            'online',
            0
          );
          break;
        case 'timerStop':
          await resetSlackStatus();
          await resetDiscordStatus();
          break;
        case 'pauseStop':
          await setSlackStatus(
            ':tomato:',
            `on "${taskTitle}" for ${minutes} min. DND please`,
            'auto',
            minutes,
            true
          );

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
        case 'cardDone':
          // TODO: Trello integration

          await setSlackStatus(
            ':white_check_mark:',
            `just completed "${taskTitle}"`,
            'auto',
            5,
            false
          );

          await setDiscordStatus('✅', `Just finished focus task`, 'online', 5);
          break;
        default:
          break;
      }
    } catch (error) {
      request.log.error(error);
    }
  },
  path: '/pomodone',
} as RouteDefinition;
