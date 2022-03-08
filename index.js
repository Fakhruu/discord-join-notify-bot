const { Client, Intents } = require('discord.js');
require('dotenv').config()
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Discord = require("discord.js")
const token = process.env.DISCORD_TOKEN;
// Hardcored channel ID
const discordChannelID = process.env.CHANNEL_ID;


const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]
  });

client.once('ready', c => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) =>  { // Listening to the voiceStateUpdate event
        var general = client.channels.cache.get(discordChannelID);

    if(newVoiceState.mute || oldVoiceState.mute )return;   
    if (newVoiceState.channel) { // The member connected to a channel.
        general.send(`${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}. @everyone `);
    } else if (oldVoiceState.channel) { // The member disconnected from a channel.
        general.send(`${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`)
    };
});

client.login(token);