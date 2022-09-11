const express = require("express");
const path = require("path");
const botNode = require("./index");
const { gameOptions } = require("./options");
require("dotenv").config();
const TelegramApi = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const validate = require("validate-edrpou");

const logger = require("morgan");

const app = express();

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

const bot = new TelegramApi(token, { polling: true });
let isSearchSrart = {};

const start = async () => {
  bot.setMyCommands([{ command: "/start", description: "Розпочати" }]);
  bot.on("message", async (msg) => {
    console.log("msg", msg);
    const text = msg.text;
    const chatId = msg.chat.id;

    try {
      if (text === "/start") {
        isSearchSrart.chatId = false;
        return bot.sendMessage(
          chatId,
          `Привіт, ${msg.from.first_name}!👋 Я Orendar бот! Давай разом знайдемо потрібну тобі інформацію🕵️‍♂️`,
          gameOptions
        );
      }
      if (text !== "/start" && !isSearchSrart.chatId) {
        return bot.sendMessage(chatId, `Хочеш розпочати пошук?`, gameOptions);
      }
      if (text !== "/start" && isSearchSrart.chatId) {
        const isValid = validate(text);

        if (isValid) {
          return bot.sendMessage(chatId, `Виконую пошук в реєстрах...`);
        } else {
          return bot.sendMessage(
            chatId,
            `${msg.from.first_name}, код не корректний. Проте не засмучуйся, адже тобі так пощастило з кумом❤️!) Перевір та спробуй знову`
          );
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/start_search") {
      isSearchSrart.chatId = true;
      return bot.sendMessage(chatId, `Для початку пошуку введи ІПН/ЄДРПОУ👇`);
    }
    if (data === "/example") {
      isSearchSrart.chatId = false;
      return bot.sendMessage(chatId, `Тут буде приклад`);
    }
    if (data === "/rules") {
      isSearchSrart.chatId = false;
      return bot.sendMessage(chatId, `Тут будуть правила`);
    }
    if (data === "/price") {
      isSearchSrart.chatId = false;
      return bot.sendMessage(chatId, `Тут буде вартість`);
    }
  });
};

start();

module.exports = app;
