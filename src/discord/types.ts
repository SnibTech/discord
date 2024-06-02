export type CommandDefinition = {
    name: string;
    description: string;
};

type GameConfig = {
    gcp: {
        instance: GamesInstance;
    };
    discord: {
        channel: {
            name: GamesChannel;
        };
    };
    messages: {
        starting: string;
        completed: string;
        running: string;
        pending: string;
    };
};


export enum Games {
    STARDEW_VALLEY = 'STARDEW_VALLEY',
}

export enum GamesInstance {
    STARDEW_VALLEY = 'stardew-valley',
}

export enum GamesChannel {
    STARDEW_VALLEY = 'stardew-valley',
}

export type GameConfigMap = { [key in Games]: GameConfig };

export enum MachineState {
    IDLE = 'idle',
    PENDING = 'pending',
}
