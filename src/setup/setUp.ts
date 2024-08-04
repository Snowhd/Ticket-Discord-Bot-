import { config } from "dotenv";





function setup(): string {
    config();
    const TOKEN: String = String(process.env.TOKEN);

    if (TOKEN === undefined || TOKEN === null || TOKEN.length === 0) {
        console.log("No Token was Found")
        process.exit(-1)
    }

    return TOKEN.toString();
}


export default setup;