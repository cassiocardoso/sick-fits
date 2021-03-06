const cookieParser = require("cookie-parser");

require("dotenv").config({ path: "variables.env" });

const db = require("./db");
const createServer = require("./createServer");

const server = createServer();

// TODO: Use express middleware to handle cookies (JWT)
server.express.use(cookieParser());
// TODO: Use express middleware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => console.log(`Server is running on: http://localhost:${deets.port}`)
);
