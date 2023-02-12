const express = require("express");
const router = express.Router();
const doneRoute = require("./done");

module.exports = (params) => {
  const { tasksService } = params;
  router.get("/", async (req, res, next) => {
    try {
      const taskList = await tasksService.getTaskList();
      // return res.json(taskList);
      return res.render("layout", {
        pageTitle: "TODO Simple Application from EPAM",
        template: "index",
        taskList,
        status: null,
        message: "",
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post("/", async (req, res) => {
    const response = {
      pageTitle: "TODO Simple Application from EPAM",
      template: "index",
    };

    const task = req.body.task;

    try {
      await tasksService.addTask(task);

      response.message = "Task was added!";
      response.status = "success";
    } catch (err) {
      response.message = err.message;
      response.status = "error";
    } finally {
      response.taskList = await tasksService.getTaskList();
      return res.render("layout", response);
    }
  });

  router.use("/done", doneRoute());

  return router;
};
