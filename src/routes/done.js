const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("layout", {
      pageTitle: "Done page - Simple TODO Application",
      template: "done",
    });
  });

  return router;
};
