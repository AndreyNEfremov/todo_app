const express = require("express");
const router = express.Router();
const doneRoute = require("./done");

module.exports = (params) => {
  const { tasksService } = params;
  router.get("/", async (req, res, next) => {
    try {
      const taskList = await tasksService.getTaskList(); //how to render task list in main page?
      // return res.json(tasks);
      return res.render("layout", {
        pageTitle: "TODO Simple Application from EPAM",
        template: "index",
        taskList,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post("/", async (req, res) => {
    // return res.send(req.body);
    await tasksService.addTask(req.body);

    return res.render("layout", {
      pageTitle: "TODO Simple Application from EPAM",
      template: "index",
    });
  });

  router.use("/done", doneRoute());

  return router;
};
