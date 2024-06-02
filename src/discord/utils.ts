import { GuildChannelManager } from "discord.js";
import { Games } from "./types";

export const getChannelNameById = (id: string, guildChannelManager?: GuildChannelManager): string | null => {
    if (!guildChannelManager) {
       return null;
    }
    
    const channel = guildChannelManager.cache.find(channel => channel.id === id);
    
    if (!channel) {
        return null;
    }

    return channel.name;
}

export const assertGame = (game: string): game is Games => {
    return game.toUpperCase() in Games;
}