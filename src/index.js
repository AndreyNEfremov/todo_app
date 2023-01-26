// const startServer = require('./main');

// startServer();

const express = require("express");
const path = require("path");
const PORT = 3000;
const staticPath = path.join(__dirname, "../assets");
const routes = require("./routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.locals.headerTitle = "Simple TODO Application";

app.use(express.static(path.join(staticPath)));

app.use("/", routes());
// app.use("/done", doneRoute());

// app.get("/done", (request, response) => {
//   response.sendFile(path.join(staticPath, "../done.html"));
// });

app.listen(PORT, (req, res) => {
  console.log(`The server is started on port ${PORT}`);
});
