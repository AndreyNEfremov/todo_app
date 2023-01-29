const express = require("express");
const router = express.Router();
const doneRoute = require("./done");

module.exports = (params) => {
  const { tasksService } = params;

  router.get("/", async (req, res, next) => {
    try {
      const task = await tasksService.getList();

      return res.render("layout", {
        pageTitle: "TODO Simple Application from EPAM",
        template: "index",
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post("/", async (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    await tasksService.addEntry(name);

    return res.send(req.body);
  });

  router.use("/done", doneRoute());

  return response.redirect("/");

  // return router;
};
