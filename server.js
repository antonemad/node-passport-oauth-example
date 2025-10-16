const http = require("http");
require("dotenv").config({});
require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const Server = http.createServer(app);

Server.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
