const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const TelegramBot = require("node-telegram-bot-api");

const { BOT_TOKEN, USER_CHAT_ID } = process.env;

const bot = new TelegramBot(BOT_TOKEN, {
  polling:
    // true
    false,
});

const addNewApplication = async (req, res) => {
  try {
    const { name, phone, service, format, question } = req.body;

    const message = ` <strong>Ім'я</strong>: ${name},
<strong>Телефон</strong>: ${phone},
<strong>Послуга</strong>: ${service},
<strong>Формат</strong>: ${format},
<strong>Ваше Запитання</strong>: ${question}`;

    await bot.sendMessage(USER_CHAT_ID, message, {
      parse_mode: "HTML",
    });

    res.status(201).json({ message: "Data sent successfully" });
  } catch (error) {
    throw HttpError(error.response.statusCode, error.response.statusMessage);
  }
};

module.exports = {
  addNewApplication: ctrlWrapper(addNewApplication),
};
