// const startServer = require('./main');

// startServer();

const express = require("express");
const path = require("path");
const PORT = 3000;
const bodyParser = require("body-parser");
const staticPath = path.join(__dirname, "../assets");
const routes = require("./routes");
const TasksService = require("./services/TasksService");

const tasksService = new TasksService("./src/data/data.json");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.locals.headerTitle = "Simple TODO Application";

app.use(express.static(path.join(staticPath)));

app.use("/", routes({ tasksService }));

// app.get("/done", (request, response) => {
//   response.sendFile(path.join(staticPath, "../done.html"));
// });

app.listen(PORT, (req, res) => {
  console.log(`The server is started on port ${PORT}`);
});
