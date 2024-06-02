import config from "@snib/config";
import { Client, GatewayIntentBits, REST, Routes } from "discord.js";

import { commands, buildInteractions } from "./commands";

const connect = async (): Promise<Client<boolean>> => {
  const c = new Client({ intents: [GatewayIntentBits.Guilds] });

  c.on('ready', () => console.log(`Logged in as ${c.user?.tag}!`));
  c.on('interactionCreate', buildInteractions);
  c.login(config.discord.token);

  return c;
}

const initiate = async (): Promise<void> => {
  try {
    const rest = new REST({ version: '10' }).setToken(config.discord.token);
    
    await rest.put(Routes.applicationCommands(config.discord.clientId), {
      body: commands
    });

    connect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

let client: Client<boolean> | undefined;
const getClient = async (): Promise<Client<boolean>> => {
  if (!client) {
    client = await connect();
  }

  return client;
}

export default {
  getClient,
  initiate,
};
