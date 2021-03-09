import { WebClient } from '@slack/web-api';

const slack = new WebClient(process.env.SLACK_TOKEN);

export const setSlackStatus = async (
  emoji: string,
  message: string,
  presence: 'away' | 'auto',
  dndMinutes: number
): Promise<void> => {
  await slack.users.setPresence({
    presence,
  });
  await slack.users.profile.set({
    profile: JSON.stringify({
      status_emoji: emoji,
      status_text: message,
      status_expiration: dndMinutes ? new Date(Date.now() + dndMinutes * 60 * 1000) : 0
    }),
  });
  if (dndMinutes) {
    await slack.dnd.setSnooze({
      num_minutes: dndMinutes,
    });
  } else {
    await slack.dnd.endDnd();
  }
};

export const resetSlackStatus = async () => {
  await setSlackStatus('', '', 'auto', 0);
};
