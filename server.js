const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(`error`, error);
    process.exit(1);
  }
};

start();
