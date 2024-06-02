import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import { MachineState } from '../types';
import { getChannelNameById } from '../utils';

const command = {
    name: 'test',
    description: 'Test a command!',
}

let state: MachineState = MachineState.IDLE;
const buildInteraction = async (interaction: ChatInputCommandInteraction<CacheType>): Promise<void> => {
    if (interaction.commandName === command.name) {
        await interaction.deferReply();
        const channelId = interaction.channelId;
        const channelName = getChannelNameById(channelId, interaction.guild?.channels);

        if(!channelName) {
            await interaction.followUp('Meow!! I didn\'t find this channel. 😿');
            return;
        }

        if (channelName !== command.name) {
            await interaction.followUp('This is not the #test channel. 😿');
            return;
        }
        
        if (state === MachineState.PENDING) {
            await interaction.followUp("It is pending!");
            return;
        }

        if (state === MachineState.IDLE) {
            state = MachineState.PENDING;
            setTimeout(async () => {
                await interaction.followUp("Success");
                state = MachineState.IDLE;
            }, 2500);
            await interaction.followUp("Changing state to pending...");
            return;
        }
  
        await interaction.followUp('Meow?!???! 😿');
        return;
    }
}

export default {
    command,
    buildInteraction,
}
