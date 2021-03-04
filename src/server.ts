import * as dotenv from "dotenv";

dotenv.config();

// Import express and body-parser
import express from 'express';
import bodyParser from "body-parser";
import routes from "./routes";

// Initialize express and define a port
const app = express()
const PORT = process.env.PORT

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())

app.use(routes)

// Start express on the defined port
app.listen(PORT, () => {
  return console.log(`server is listening on ${PORT}`);
});