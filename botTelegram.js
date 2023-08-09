import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import dotenv from 'dotenv';
dotenv.config();

const botID = process.env.BOT_ID_TELEGRAM
const chatID = process.env.CHAT_ID_TELEGRAM

//Envia mje a chatID indicado
const botTelegram = () => {
    const bot = new Telegraf(botID);
    const now = new Date();
    const formattedDate = now.toLocaleString();
    bot.telegram.sendMessage(chatID, 'Se detecto un cambio en la web!!! ' + quotes + formattedDate);
    bot.launch();
}
export default botTelegram;