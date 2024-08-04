import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from "discord.js"

/*

all Slashcommands are here deklared

*/

class Commands {

   async commandBuilder(): Promise<any> {

    const COMMANDS = [
        new SlashCommandBuilder()
        .setName("send-ticket-message")
        .setDescription("send the a embed message in a channel, thats let user's create tickets")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('channel that the message is going to be sent')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
            )
        .toJSON(),


    ];

    return COMMANDS;
   } 
}



export default Commands;