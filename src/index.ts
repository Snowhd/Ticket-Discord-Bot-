import { error } from "console";
import { Client, CommandInteraction, GatewayIntentBits, Guild, Interaction, InternalRequest, PermissionsBitField, REST, Routes, SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType,
    ButtonInteraction,
    ModalSubmitInteraction
} from "discord.js";
import setup from "./setup/setUp";
import { config } from "dotenv";
import TicketCommandHandler from "./functionhandler/ticket/ticketcommandhandler";
import Commands from "./utils/commands";
import TicketButtonHandler from "./functionhandler/ticket/ticketbuttonhandler";
import TicketModalHandler from "./functionhandler/ticket/ticketmodalhandler";

config();

class Main {
    private TOKEN: string;

    constructor(token: string) {
        this.TOKEN = token;
    }

    start(): void {

        const CLIENT: Client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
            ]
        });

        CLIENT.login(this.TOKEN);

        CLIENT.once('ready', () => {
            console.log("Logged in as %s", CLIENT.user?.tag);
            console.log("\nLoading SlashCommands");

            this.slashCommandSetUp(CLIENT);
            console.log("\nAll SlashCommands are Loaded!");
        });


        CLIENT.on('interactionCreate', async interaction => {

            if (interaction.isCommand()) {
                await this.slashCommandHandler(CLIENT, interaction as CommandInteraction);
            }
            else if (interaction.isButton()) {
                await this.buttonHandler(CLIENT, interaction as ButtonInteraction);
            }
            else if(interaction.isModalSubmit()) {
                await this.modalHandler(CLIENT, interaction as ModalSubmitInteraction);
            }
            

        })


        

    }

    async slashCommandSetUp(client: Client): Promise<void> {

        const rest: REST = new REST({ version: '10' }).setToken(this.TOKEN);

        try {

            await new Commands().commandBuilder()
            .then( async (commands) => {
                await rest.put(
                    Routes.applicationCommands(client.user?.id || ""),
                    {body: commands}
                )
            })
            .catch((error) => console.error("Something went wrong! " + error));  

        } catch (error) {
            console.error(error);
        }
    }

    async slashCommandHandler(client: Client, interaction: CommandInteraction) {
    
        switch(interaction.commandName){
            case "send-ticket-message":
                                    new TicketCommandHandler(interaction).handler();
                                    return;
            case "t":
                return;

            default:
                console.error("Something went wrong!")
                return;
        }


    }

    async buttonHandler(client: Client, interaction: ButtonInteraction) {

        console.log(interaction.customId)
        switch(interaction.customId) {
            case "create-ticket-button":
                await new TicketButtonHandler(interaction).handler();
                return;
        }


    }

    async modalHandler(client: Client, interaction: ModalSubmitInteraction) {
        
        switch(interaction.customId) {
            case "ticket-modal":
                await new TicketModalHandler(interaction, client).handler();                
                return;
            default:
                await interaction.reply({content: "there was an error, try again later", ephemeral: true});
                console.error("there was an error while submitting an modal!");
        }

    }


}


new Main(setup()).start();