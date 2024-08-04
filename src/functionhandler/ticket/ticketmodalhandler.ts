import { count, error } from "console";
import { ChannelType, Client, Embed, EmbedBuilder, Guild, GuildChannel, GuildOnboarding, ModalSubmitInteraction, TextChannel, User } from "discord.js";
import Ticket from "./ticket"
import * as fs from 'fs';
import { Channel } from "diagnostics_channel";


class TicketModalHandler {
    
    private interaction: ModalSubmitInteraction;
    private client: Client;

    private static counter: number;

    constructor(interaction: ModalSubmitInteraction, client: Client) {
        this.interaction = interaction;
        this.client = client;
        TicketModalHandler.counter += 1;
    }


    async handler(): Promise<any> {
            this.interaction.deferReply();

            const TITLE: string = this.interaction.fields.getTextInputValue("ticket-title-input");
            const DESRIPTION: string = this.interaction.fields.getTextInputValue("ticket-description-input");

            const guild: Guild = await this.getGuild().catch((error) => {
                this.interaction.followUp({content: "there was an {}error, try again later", ephemeral:true});
                return;
            });

            if(!guild || guild === null) {
                await this.interaction.followUp("there as an error");
                return;
            }

            this.textChannelCreation(guild).then((channel: TextChannel) => {

                


            });


    }   


    private async getGuild(): Promise<any> {
        try{
            const guildFetch: any = this.interaction?.guild;

        if(guildFetch === null || !guildFetch) {
            console.error("there was an error during the fetch to get the guild in ticket-modal submition");
        }

        return guildFetch as Guild;
        }
        catch(error) {
            console.error("couldn't get guild!");
            return error;
        }
    }


    private async textChannelCreation(guild: Guild): Promise<any> {
        const channel: TextChannel  = await guild.channels.create({name:"Ticket-"+TicketModalHandler.counter,
                                    type: ChannelType.GuildText,
                                    }) as TextChannel;
        return channel;
    }

    private embedMessageBuilder(user: User, reason: string, description: string) {

        const embed = new EmbedBuilder().setTitle("")

    }


    private async logger(channel: TextChannel): Promise<any> {


    }





}




export default TicketModalHandler;