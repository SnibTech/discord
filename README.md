# Snib Discord bot

## Installation

1. Clone the repo.
2. Run `npm install`

## Tests

Work in progress

## Add new commands

1. Create a new file under the `./src/discord/commands` folder using the command's name as the file's name. It is recommended that the `meow.ts` file be copied and used as a reference since the command file needs to export an object with the following properties: `command` and `buildInteraction`.
2. Edit the `./src/discord/commands/index.ts` file, import the new command, and export it as a property.
3. Run `npm run build` and `npm run start` to test it. You will need bot credentials to do it; edit the `.env` file to add them.
