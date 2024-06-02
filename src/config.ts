export default {
    gcp: {
        projectId: process.env.GCP_PROJECT_ID || '',
        zone: process.env.GCP_ZONE || '',
    },
    discord: {
        token: process.env.DISCORD_BOT_TOKEN || '',
        clientId: process.env.DISCORD_CLIENT_ID || '',
    },
}
