import { CacheType, Interaction } from 'discord.js';
import commandModules from '@snib/discord/commands/index';

import { CommandDefinition } from './types';

const commandList = Object.values(commandModules);

export const commands: CommandDefinition[] = commandList.map((commandModule) => commandModule.command);

export const buildInteractions = async (interaction: Interaction<CacheType>): Promise<void> => {
  if (!interaction.isChatInputCommand()) return;

  try {
    console.log(`Command "${interaction.commandName}" was triggered on "${interaction.channel?.toString()}"!`);

    const interactions = commandList.map((commandModule) => commandModule.buildInteraction(interaction));
    await Promise.all(interactions);
  } catch (error) {
    console.error(error)
    await interaction.reply('Meow! Maybe I didn\'t learn this command. 😿');
  }
}
