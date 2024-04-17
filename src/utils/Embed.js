import { EmbedBuilder } from "discord.js";

class Embed extends EmbedBuilder {
  constructor(color, title, description) {
    super();
    this.setColor(color);
    this.setTitle(title);
    this.setDescription(description);
  }
}

export default Embed;
