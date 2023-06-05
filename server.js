const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("DataBase connected successfully");
    app.listen(PORT); //* только когда успешно подключились к бд запускаем сервер, так как мы берем данные для работы сервера с бд, если не работает бд то и сервер запускать нет смылса
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1); //* команда закрывает запущенные процессы, если мы запустили что-то перед тем как подключиться к базе в фоне, то он его принудительно закроет. "1" это неизветсная ошибка
  });
