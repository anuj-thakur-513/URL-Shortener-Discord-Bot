import dotenv from "dotenv";
import axios from "axios";
import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
import { API_URL, protocolRegex } from "./constants.js";
import generateRequestInput from "./utils/generateRequestInput.js";
import Embed from "./utils/Embed.js";
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
        : `https://${receivedUrl}`;

      let embed;
      if (!protocolRegex.test(finalUrl)) {
        embed = new Embed(
          "Red",
          "⚠️ Failed to shorten the URL ⚠️",
          `${finalUrl} is not a valid URL, please enter a valid URL`
        );
      } else {
        const request = generateRequestInput(finalUrl);
        const data = await axios.request(request);

        if (data.status === 500) {
          embed = new Embed(
            "Red",
            "⚠️ Server Error ⚠️",
            "Couldn't generate short URL"
          );
        } else {
          embed = new Embed(
            "Green",
            `✅ Short URL generated Successfully for: ${finalUrl}`,
            `Generated Short URL is: ${API_URL}/v1/url/${data?.data?.data?.shortId}`
          );
        }
      }

      await interaction.reply({ embeds: [embed] });
    }
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
