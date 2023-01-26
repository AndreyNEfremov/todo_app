const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("pages/done", {
      pageTitle: "Done page - Simple TODO Application",
    });
  });

  return router;
};
