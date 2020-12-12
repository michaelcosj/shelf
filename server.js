const http = require("http");
const app = require("./app");
const day = require("dayjs");

const port = process.env.PORT;

http
  .createServer(app)
  .listen(port, console.log(`Server running on port ${port}`));
