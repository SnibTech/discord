import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import axios from 'axios';

type CatAPIResponse = {
    breeds: [];
    categories: {
        id:number;
        name: string;
    }[];
    id: string;
    url: string;
    width: number;
    height: number;
}[];

const command = {
    name: 'image',
    description: 'Replies with a random cat image.'
}

const getImageUrl = async (): Promise<string> => {
    const image = await axios.get<CatAPIResponse>(`https://api.thecatapi.com/v1/images/search?api_key=live_fQf80h7maFDJBwgn1H8V3Aj8U6Sj2JeJpyUPETb8aSkrnkkdz79BTNkyDAvA5qtd`);
    const url = image.data[0].url;
    return url;
}

const buildInteraction = async (interaction: ChatInputCommandInteraction<CacheType>): Promise<void> => {
    if (interaction.commandName === command.name) {
        await interaction.reply({
            content: 'Meow!',
            embeds: [
                {
                    image: {
                        url: await getImageUrl()
                    }
                }
            ]
        });
    }
}

export default {
    command,
    buildInteraction
}

