module.exports = {
  gameOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "🕵️‍♂️Розпочати пошук ділянок🕵️‍♂️",
            callback_data: "/start_search",
          },
        ],
        [
          { text: "Приклад✅", callback_data: "/example" },
          { text: "Умови📃", callback_data: "/rules" },
          { text: "Вартість💵", callback_data: "/price" },
        ],
      ],
    }),
  },

  // againOptions: {
  //   reply_markup: JSON.stringify({
  //     inline_keyboard: [[{ text: "Играть еще раз", callback_data: "/again" }]],
  //   }),
  // },
};
