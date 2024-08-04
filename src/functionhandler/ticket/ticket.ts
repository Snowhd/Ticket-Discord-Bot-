import { StringMappedInteractionTypes } from "discord.js";


class Ticket {
    guild: string;
    guildId: string;
    ticketNumber: number;
    channelName: string;
    channelId: number;
    user: string;
    userid: number;
    reason: string;
    description: string;

    constructor(
        guild: string,
        guildId: string,
        ticketNumber: number,
        channelName: string,
        channelId: number,
        user: string,
        id: number,
        reason: string,
        description: string) {

        this.guild = guild;
        this.guildId = guildId;
        this.ticketNumber = ticketNumber;
        this.channelId = channelId;
        this.channelName = channelName;
        this.user = user;
        this.userid = id;
        this.reason = reason;
        this.description = description;
        
    }

}


export default Ticket;