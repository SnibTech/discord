import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import gcp from '../../gcp';
import { CommandDefinition, GameConfigMap, Games, GamesChannel, GamesInstance, MachineState } from '../types';
import { assertGame, getChannelNameById } from '../utils';

const command: CommandDefinition = {
    name: 'start',
    description: 'Start a game server!',
}

const gameChannelMap: GameConfigMap = {
    [Games.STARDEW_VALLEY]: {
        gcp: {
            instance: GamesInstance.STARDEW_VALLEY,
        },
        discord: {
            channel: {
                name: GamesChannel.STARDEW_VALLEY,
            },
        },
        messages: {
            starting: "Starting Stardew Valley server... 👾",
            completed: "Stardew Valley server started! 🎉",
            running: "The Stardew Valley server is already starting! 😽",
            pending: "I'm still starting the server! 😺",
        },
    },
};

let state: MachineState = MachineState.IDLE;
const buildInteraction = async (interaction: ChatInputCommandInteraction<CacheType>): Promise<void> => {
    if (interaction.commandName === command.name) {
        await interaction.deferReply();
        const channelText = interaction.channelId;
        const channelName = getChannelNameById(channelText, interaction.guild?.channels);

        if(!channelName) {
            await interaction.followUp('Meow!! I didn\'t find this channel. 😿');
            return;
        }
        
        const isChannelGame = assertGame(channelName);
        if (!isChannelGame) {
            await interaction.followUp('This game doesn\'t have a server configured. 😿');
            return;
        }
        const gameConfig = gameChannelMap[channelName];
        if (state === MachineState.PENDING) {
            await interaction.followUp(gameConfig.messages.pending);
            return;
        }

        if (state === MachineState.IDLE) {
            state = MachineState.PENDING;
            gcp.changeInstance({
                action: 'start',
                instance: gameConfig.gcp.instance,
                successCallback: async () => {
                    await interaction.followUp(gameConfig.messages.completed);
                    state = MachineState.IDLE;
                },
                alreadyRunningCallback: async () => {
                    await interaction.followUp(gameConfig.messages.running);
                    state = MachineState.IDLE;
                }
            });
            await interaction.followUp(gameConfig.messages.starting);
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