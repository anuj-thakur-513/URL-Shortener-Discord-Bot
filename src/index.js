import dotenv from "dotenv";
import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
import { protocolRegex } from "./constants.js";
dotenv.config({ path: "./.env" });

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    if (interaction.commandName === "shorten") {
      const receivedUrl = interaction.options.getString("url");
      const finalUrl = protocolRegex.test(receivedUrl)
        ? receivedUrl
        : `https:${receivedUrl}`;

      let embed = new EmbedBuilder();
      if (!protocolRegex.test(finalUrl)) {
        embed
          .setColor("Red")
          .setTitle("⚠️Failed to shorten the URL⚠️")
          .setDescription(
            `${finalUrl} is not a valid URL, please enter a valid URL`
          );
      } else {
        embed = new EmbedBuilder()
          .setColor("Green")
          .setTitle("Shortened the URL Successfully")
          .setDescription(`Shortened URL for the url: ${receivedUrl}`);
      }

      await interaction.reply({ embeds: [embed] });
    }
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
