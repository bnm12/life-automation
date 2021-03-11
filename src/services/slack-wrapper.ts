import { WebClient } from '@slack/web-api';
import { logger } from '../util/logger';

const slack = new WebClient(process.env.SLACK_TOKEN);

export const setSlackStatus = async (
  emoji: string,
  message: string,
  presence: 'away' | 'auto',
  minutes: number,
  dnd: boolean
): Promise<void> => {
  logger.info({ emoji, message, presence, minutes, dnd }, 'Set Slack status');
  await slack.users.setPresence({
    presence,
  });
  await slack.users.profile.set({
    profile: JSON.stringify({
      status_emoji: emoji,
      status_text: message,
      status_expiration: minutes
        ? Math.floor(
            new Date(Date.now() + minutes * 60 * 1000).getTime() / 1000
          )
        : null,
    }),
  });
  if (dnd) {
    await slack.dnd.setSnooze({
      num_minutes: minutes,
    });
  } else {
    await slack.dnd.endDnd();
  }
};

export const resetSlackStatus = async () => {
  logger.info('Reset Slack status');
  await setSlackStatus('', '', 'auto', 1, false);
};
