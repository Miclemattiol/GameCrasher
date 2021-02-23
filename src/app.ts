import * as tgraf from "telegraf";
import Command from "./command";
import * as fs from "fs";
import { TOKEN } from "./config";


class App {

    commands: { [name: string]: Command } = {};

    constructor() {
        this.commands = {};
        this.loadCommands(this.commands);

        const bot = new tgraf.Telegraf(TOKEN);

        bot.start((context) => {
            context.reply('Started!');
        });

        bot.on('text', context => {
            if (context.message.text.trim().toUpperCase() == 'COMMANDS') {
                Object.keys(this.commands).forEach(command => {
                    context.reply(command);
                })
            } else {
                try {
                    this.commands[context.message.text.toUpperCase()].execute();
                    context.reply("Game crashed!");
                } catch (error) {
                    context.reply("Game not found!");
                }
            }
        });
        bot.launch();
    }

    loadCommands(commands: { [name: string]: Command }) {
        Promise.all(fs.readdirSync("./dist/commands").map(file => {
            return new Promise(async resolve => {
                const tmp = (await import(`./commands/${file}`)).default;
                commands[tmp.name] = tmp;
                resolve(tmp);
            });
        })).then(() => {
            console.log("Listing commands: ");
            console.log(Object.keys(commands));
        });
    }
}

const app = new App();