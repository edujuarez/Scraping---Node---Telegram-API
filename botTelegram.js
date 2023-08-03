import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

// replace the value below with the Telegram token you receive from @BotFather
const botTelegram = () => {
    const bot = new Telegraf('6496129805:AAEDRFJ8EVK1ENu9222_eN7xQGuZTW84brk');
    const chatID = 933708324;
    const now = new Date();
    const formattedDate = now.toLocaleString();
    bot.telegram.sendMessage(chatID, 'Se detecto un cambio en la web!!! ' + formattedDate);
    bot.launch();
}
export default botTelegram;