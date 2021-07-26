require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.APP_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all( "/", (req, res) => {
  res.status(401).json({
    code: 401,
    msg: "Access denied",
    status: false,
    data: [],
  });
});

app.use(`/api/${process.env.APP_VERSION}`, require("./routes/api"));
app.listen( port, async () => {});