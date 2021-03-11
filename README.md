# life-automation

A small server for automating things in life a bit ala IFTTT and Zapier, but a **lot** more manual (and therefore flexible) of a process

#### ENV VARIABLES

| Variable name | Value                                                                                                                           | Description                                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT          | The port you want your app to run on                                                                                            | It's a port setting, what more can I tell you?                                                                                                       |
| RANDOM_STRING | put a long random string here                                                                                                   | This will be appended to all your routes, and will serve as your only source of security, pick something long and random like a long hash or similar |
| SLACK_TOKEN   | put a Slack API token in here                                                                                                   | This will be used to interact with Slack                                                                                                             |
| DISCORD_TOKEN | put a Discord **user** auth token in here, not a bot token. Just pull the authorization header from a request in the web client | This will be used to interact with Discord                                                                                                           |
| TIMEZONE_NAME | put an IANA time zone identifier string here                                                                                    | This will be used to set the timezone for date output                                                                                                |

For development set these in a .env file in the root of the project
