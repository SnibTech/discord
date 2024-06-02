import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import { CommandDefinition } from '../types';

const command: CommandDefinition = {
    name: 'meow',
    description: 'Replies with Meow!',
}

const buildInteraction = async (interaction: ChatInputCommandInteraction<CacheType>): Promise<void> => {
    if (interaction.commandName === command.name) {
        await interaction.reply('Meow!')
    }
}

export default {
    command,
    buildInteraction
}