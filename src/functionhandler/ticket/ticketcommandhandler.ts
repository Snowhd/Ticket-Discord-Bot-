import { CommandInteraction, EmbedBuilder, Colors, TextChannel, ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType } from "discord.js";

class TicketCommandHandler {

    private interaction: CommandInteraction;

    constructor(interaction: CommandInteraction) {
        this.interaction = interaction;
    }

    async handler(): Promise<void> {
        try {

            const channelOption = this.interaction.options.get("channel");

            if (!channelOption || !channelOption.channel ||
                 channelOption.channel.type !== ChannelType.GuildText) {

                await this.interaction.reply({ content: "You need to select a Guild-Text-Channel", ephemeral: true });
                return;
            }

            const channel: TextChannel = channelOption.channel as TextChannel;

            const embed = this.embedBuilder();
            const button = this.buttonBuilder();

            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

            await channel.send({ embeds: [embed], components: [row] });

            await this.interaction.reply({ content: "Embed sent successfully!", ephemeral: true });

        } catch (error) {
            console.error("Failed to reply to Interaction: " + error);
            this.interaction.reply({content: "there was an error, try again later", ephemeral: true})
            return;
        }
    }

    private embedBuilder(): EmbedBuilder {
        return new EmbedBuilder()
            .setTitle("Ticket-System")
            .setColor(Colors.Aqua)
            .setAuthor({ name: 'snow' })
            .setDescription('Your custom Ticket-System')
            .addFields(
                { name: 'support', value: "Something" },
                { name: 'application', value: 'Something' }
            );
    }

    private buttonBuilder(): ButtonBuilder {
        return new ButtonBuilder()
            .setCustomId("create-ticket-button")
            .setLabel("🎟️")
            .setStyle(ButtonStyle.Primary);
    }
}

export default TicketCommandHandler;
