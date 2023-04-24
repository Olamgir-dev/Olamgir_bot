const await = require('await');
const telegramApi = require('node-telegram-bot-api');
const validator = require('validator');
const dotenv = require('dotenv')
dotenv.config();
const api = process.env.BOT_TOKEN;
const bot = new telegramApi(api, { polling: true });
const user = [];

const AdminId = process.env.ADMIN_ID;

bot.onText(/\/admin4555/, (msg) => {
    const date = {
        yil: new Date().getFullYear(),
        oy: new Date().getMonth() + 1,
        kun: new Date().getDate(),
        soat: new Date().getHours(),
        min: new Date().getMinutes(),
        sekund: new Date().getSeconds()
    }
    const xatolik = "Xujum boshlandi?? \n \n" +
        "{\n" +
        "message_id:" + msg.message_id + "\n" +
        "chat: { \n" +
        "   id:" + msg.chat.id + "\n" +
        "   first_name:" + msg.chat.first_name + "\n" +
        "   username:" + "@" + msg.chat.username + "\n" +
        "   type:" + msg.chat.type + "\n" +
        "}, \n" +
        "date:" + msg.date + "\n" +
        "text:" + msg.text + "\n" +
        "entities:" + JSON.stringify(msg.entities) + "\n" +
        "}\n" +'\n'+
        date.yil + "-" + date.oy <= 9 ? '0' + date.oy : date.oy + "-" + date.kun <= 9 ? '0' + date.kun : date.kun + " " + date.soat <= 9 ? '0' + date.soat : date.soat + ":" + date.min <= 9 ? '0' + date.min : date.min + ":" + date.sekund <= 9 ? '0' + date.sekund : date.sekund + "\n"
        "Shu user tomindan";
    bot.sendMessage(AdminId, xatolik);
});

bot.setMyCommands([
    { command: '/start', description: "Start" },
    { command: "/regster", description: "Sign up" },
]);

function start(chatId, userName) {
    bot.sendMessage(chatId, `Assalomu alykum ${userName} botimizga Xush kelibsiz!`)
}
function registerUser(msg) {
    const chatId = msg.chat.id;
    const userName = msg.from.username;
    // Foydalanuvchi ismini so'raymiz
    bot.sendMessage(chatId, 'Iltimos, ismingizni kiriting:').then(() => {
        bot.once('message', async (reply) => {
            const firstName = reply.text;

            // Foydalanuvchi familiyasini so'raymiz
            bot.sendMessage(chatId, 'Iltimos, familiyangizni kiriting:').then(() => {
                bot.once('message', async (reply) => {
                    const lastName = reply.text;
                    // Foydalanuvchi yoshini so'raymiz
                    bot.sendMessage(chatId, 'Iltimos, yoshingizni kiriting:').then(() => {
                        bot.once('message', async (reply) => {
                            const age = reply.text;
                            //Foydalanuvchi tel numerini so'raymiz
                            bot.sendMessage(chatId, 'Iltimos, tel raqamingizni kiriting:').then(() => {
                                bot.once('message', async (reply) => {
                                    const phone = reply.text;
                                    const date = {
                                        yil: new Date().getFullYear(),
                                        oy: new Date().getMonth() + 1,
                                        kun: new Date().getDate(),
                                        soat: new Date().getHours(),
                                        min: new Date().getMinutes(),
                                        sekund: new Date().getSeconds()
                                    }
                                    // Foydalanuvchi haqida ma'lumotlar
                                    const userData = {
                                        firstName,
                                        lastName,
                                        age,
                                        phone,
                                        userName,
                                        date
                                    };
                                    user.push(userData);
                                    console.log(userData);
                                    let vaqt = userData.date;
                                    bot.sendMessage(AdminId,
                                        "✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️\n" +
                                            "𝑰𝒔𝒊𝒎:" + userData.firstName + "\n" +
                                            "𝑭𝒂𝒎𝒍𝒊𝒚𝒂:" + userData.lastName + "\n" +
                                            "𝒀𝒐𝒔𝒉:" + userData.age + "\n" +
                                            "𝑻𝒆𝒍:" + userData.phone + "\n" +
                                            "𝑻𝒈:" + !(userData.userName == undefined) && '@' + userData.userName + "\n" +
                                            "𝑽𝒂𝒒𝒕:" + vaqt.yil + "-" + vaqt.oy <= 9 ? '0' + vaqt.oy : vaqt.oy + "-" + vaqt.kun <= 9 ? '0' + vaqt.kun : vaqt.kun + " " + vaqt.soat <= 9 ? '0' + vaqt.soat : vaqt.soat + ":" + vaqt.min <= 9 ? '0' + vaqt.min : vaqt.min + ":" + vaqt.sekund <= 9 ? '0' + vaqt.sekund : vaqt.sekund + "\n");
                                    bot.sendMessage(chatId, `${firstName}! Siz botga muvaffaqiyatli ro'yxatdan o'tdingiz!`);
                                    console.log(AdminId, userData)
                                });

                            });
                        });
                    });
                });
            });
        });
    })

}

bot.on('message', async msg => {
    const text = msg.text;
    const userName = msg.from.first_name;
    const chatId = msg.chat.id;
    if ('/start' === text)
        start(chatId, userName);
    if ('/regster' === text)
        registerUser(msg);
});






console.log("bot ishga tushdi!! ");