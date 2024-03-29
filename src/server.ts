import * as dotenv from "dotenv";
import pino from "express-pino-logger";
import { logger } from "./util/logger";

dotenv.config();

// Import express and body-parser
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import { registerWebhook } from "./services/pomodone";

// Initialize express and define a port
const app = express();
const PORT = process.env.PORT;

app.use(pino({ logger }));

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());

app.use(routes);

//registerWebhook().then(console.log);

// Start express on the defined port
app.listen(PORT, () => {
  return console.log(`server is listening on ${PORT}`);
});
