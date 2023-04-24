
function registerUser (msg) {
    const chatId = msg.chat.id;
    // Foydalanuvchi ismini so'raymiz
    bot.sendMessage(chatId, 'Iltimos, ismingizni kiriting:').then(() => {
        bot.once('message', (reply) => {
            const firstName = reply.text;

            // Foydalanuvchi familiyasini so'raymiz
            bot.sendMessage(chatId, 'Iltimos, familiyangizni kiriting:').then(() => {
                bot.once('message', (reply) => {
                    const lastName = reply.text;
                    // Foydalanuvchi yoshini so'raymiz
                    bot.sendMessage(chatId, 'Iltimos, yoshingizni kiriting:').then(() => {
                        bot.once('message', (reply) => {
                            const age = reply.text;

                            // Foydalanuvchi haqida ma'lumotlar
                            const userData = {
                                firstName,
                                lastName,
                                age,
                                date: new Date()
                            };
                            user.push(userData);
                            bot.sendMessage(AdminId, JSON.stringify(userData));
                            bot.sendMessage(chatId, `Assalomu alaykum, ${firstName}! Siz botga muvaffaqiyatli ro'yxatdan o'tdingiz!`);
                        });
                    });
                });
            });
        });
    })

}
module.exports = { registerUser }