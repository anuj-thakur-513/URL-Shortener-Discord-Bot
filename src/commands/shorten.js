import dotenv from "dotenv";
import { REST, Routes, SlashCommandBuilder } from "discord.js";
dotenv.config({ path: "./.env" });

const commands = [
  new SlashCommandBuilder()
    .setName("shorten")
    .setDescription("Shortens the URL shared by user")
    .addStringOption((option) =>
      option.setName("url").setDescription("URL to shorten").setRequired(true)
    )
    .toJSON(),
];

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(
    Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID),
    { body: commands }
  );

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
