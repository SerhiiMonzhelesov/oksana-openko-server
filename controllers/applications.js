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
  console.log("req.body: ", req.body);
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
    res.header(
      "Access-Control-Allow-Origin",
      "https://serhiimonzhelesov.github.io"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Host, Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-XSRF-TOKEN, Origin, Access-Control-Request-Origin, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin, access-control-allow-origin, Access-Control-Allow-Credentials, access-control-allow-credentials, Access-Control-Allow-Headers, access-control-allow-headers, Access-Control-Allow-Methods, access-control-allow-methods"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.status(201).json({ message: "Data sent successfully" });
  } catch (error) {
    throw HttpError(error.response.statusCode, error.response.statusMessage);
  }
};

module.exports = {
  addNewApplication: ctrlWrapper(addNewApplication),
};
