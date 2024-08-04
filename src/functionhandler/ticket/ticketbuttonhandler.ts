import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

class TicketButtonHandler {

    private interaction: ButtonInteraction;

    constructor(interaction: ButtonInteraction) {
        this.interaction = interaction;
    }

    async handler(): Promise<any> {
        
            await this.interaction.showModal(this.modalBuilder());
            await this.interaction.followUp({content: "Ticket form opened!", ephemeral: true});
        
    }

    private modalBuilder(): ModalBuilder {
        const modal = new ModalBuilder()
            .setCustomId("ticket-modal")
            .setTitle("Ticket");

        const titleInput = new TextInputBuilder()
            .setCustomId("ticket-title-input")
            .setMaxLength(64)
            .setRequired(true)
            .setPlaceholder("A user is bullying me")
            .setLabel("Title")
            .setStyle(TextInputStyle.Short);

        const descriptionInput = new TextInputBuilder()
            .setCustomId("ticket-description-input")
            .setMaxLength(1024)
            .setMinLength(30)
            .setRequired(true)
            .setPlaceholder("The player <name> said bad things to me")
            .setLabel("Description of the problem")
            .setStyle(TextInputStyle.Paragraph);

        const titleActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(titleInput);
        const descriptionActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput);

        modal.addComponents(titleActionRow, descriptionActionRow);

        return modal;
    }
}

export default TicketButtonHandler;
