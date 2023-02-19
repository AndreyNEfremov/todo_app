const express = require("express");
const makeStoppable = require("stoppable");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const doneRoutes = require("./routes/done");
const TasksService = require("./services/TasksService");

const staticPath = path.join(__dirname, "../assets");
const PORT = 3000;

const app = express();
const tasksService = new TasksService("./src/data/data.json");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.locals.headerTitle = "Simple TODO Application";

app.use(express.static(path.join(staticPath)));
app.use("/", routes({ tasksService }));
app.use("/done", doneRoutes({ tasksService }));

const server = makeStoppable(http.createServer(app));

module.exports = () => {
  const stopServer = () => {
    return new Promise((resolve) => {
      server.stop(resolve);
    });
  };

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log("Express server is listening on http://localhost:3000");
      resolve(stopServer);
    });
  });
};
