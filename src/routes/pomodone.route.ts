import { RouteDefinition } from './routeInterface';
import { resetSlackStatus, setSlackStatus } from '../services/slack-wrapper';
import { resetDiscordStatus, setDiscordStatus } from '../services/discord';

export default {
  method: 'post',
  handler: async (request, response) => {
    request.log.info(request.body);
    /*try {
      const taskTitle = request.body.card.title; // TODO: might not have a card
      const minutes = Math.ceil((request.body.timer?.duration ?? request.body.time_remaining ?? 0) / 60);
      const expireTime = new Date(Date.now() + minutes * 60 * 1000);

      switch (request.body.action) {
        case 'timerStart':

          await setSlackStatus(
            ':tomato:',
            `on "${taskTitle}" for ${minutes} min. DND please`,
            'auto',
            minutes
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
        case 'pauseStart':
          await setSlackStatus(
            ':stopwatch:',
            `on "${taskTitle}" (PAUSED)`,
            'auto',
            0
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
            minutes
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
            5
          );

          await setDiscordStatus(
            '✅',
            `Just finished focus task`,
            'online',
            5
          );
          break;
        default:
          break;
      }
      response.status(200).send(request.body).end(); // Responding is important
    } catch (error) {
      request.log.error(error)
      response.status(501).send(error).end();
    }*/
    response.status(200).send(request.body).end(); // Responding is important
  },
  path: '/pomodone',
} as RouteDefinition;
