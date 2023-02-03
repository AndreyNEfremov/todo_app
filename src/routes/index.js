const express = require("express");
const router = express.Router();
const doneRoute = require("./done");

module.exports = (params) => {
  const { tasksService } = params;

  router.get("/", async (req, res, next) => {
    try {
      const tasks = await tasksService.getTaskList(); //how to render task list at main page?
      // console.log(tasks);
      return res.render("layout", {
        pageTitle: "TODO Simple Application from EPAM",
        template: "index",
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post("/", async (req, res) => {
    // console.log(req.body);
    const { name } = req.body;
    await tasksService.addTask(name);

    return res.render("layout", {
      pageTitle: "TODO Simple Application from EPAM",
      template: "index",
    });
  });

  router.use("/done", doneRoute());

  return router;
};
