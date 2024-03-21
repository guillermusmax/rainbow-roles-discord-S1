const { Client, Intents } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: ["GUILDS"],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  applyRainbowRoles();
});

client.login(config.token);

async function applyRainbowRoles() {
  const guildId = config.guildId; // Make sure the bot is in the server
  const roleId = config.roleId; // Make sure the bot can edit the role, is above the role and has permission to edit roles.
  const interval = config.interval // The time in milliseconds, 1 second = 1000ms 
  try {
    const guild = await client.guilds.fetch(guildId);
    const role = await guild.roles.fetch(roleId);
  
    setInterval(() => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      role.edit({ color: randomColor })
        .catch(console.error); // Handle role editing errors
    }, interval);
  } catch (error) {
    console.error("Error fetching guild or role:", error);
  }  
}
