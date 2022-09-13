const TOKEN= '5766455854:AAEKGA3-S84KK_ZOAXfk9XAx9_9bq6T5r38'
const { Telegraf } = require('telegraf');
const bot = new Telegraf(TOKEN);
const web_link='https://loquacious-donut-f1f559.netlify.app/'

bot.start((ctx) => ctx.reply('Welcome',{
    reply_markup:{
        keyboard:[[{text: "web app",web_app:{url: web_link}}]]},
})
);

bot.launch();