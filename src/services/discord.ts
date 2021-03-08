import axios from 'axios';

export const setDiscordStatus = async (
  emoji: string,
  message: string,
  status: 'dnd' | 'online',
  dndMinutes: number
): Promise<void> => {
  await axios.patch(
    'https://discord.com/api/v8/users/@me/settings',
    {
      status,
      custom_status: {
        text: message,
        expires_at: new Date(Date.now() + dndMinutes * 60 * 1000).toISOString(),
        emoji_name: emoji,
      },
    },
    {
      headers: {
        authorization: process.env.DISCORD_TOKEN,
      },
    }
  );
};

export const resetDiscordStatus = async (): Promise<void> => {
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
};
