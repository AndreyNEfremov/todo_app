const express = require("express");
const router = express.Router();
const doneRoute = require("./done");

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("layout", {
      pageTitle: "TODO Simple Application from EPAM",
      template: "index",
    });
  });

  router.use("/done", doneRoute());

  router.post("/", (req, res) => {
    console.log(req.body)
    return res.send(req.body)
  });

  return router;
};
