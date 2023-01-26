const express = require("express");
const router = express.Router();
const doneRoute = require("./done");

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("pages/index", {
      pageTitle: "TODO Simple Application from EPAM",
    });
  });

  router.use("/done", doneRoute());

  return router;
};
