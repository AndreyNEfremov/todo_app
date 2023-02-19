const express = require("express");
const router = express.Router();
const doneRoute = require("./done");

const commonResponse = {
  pageTitle: "Simple TODO Application",
  template: "index",
  status: null,
  message: "",
};

module.exports = (params) => {
  const { tasksService } = params;
  router.get("/", async (req, res, next) => {
    try {
      const taskList = await tasksService.getToDoTaskList();

      return res.render("layout", {
        ...commonResponse,
        taskList,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post("/", async (req, res) => {
    const task = req.body.task;
    const response = { ...commonResponse };

    try {
      await tasksService.addTask(task);

      response.message = "Task was added!";
      response.status = "success";
    } catch (err) {
      response.message = err.message;
      response.status = "error";
    } finally {
      response.taskList = await tasksService.getToDoTaskList();
      return res.render("layout", response);
    }
  });

  router.post("/api/tasks/:taskName/done", async (req, res, next) => {
    try {
      const splitUrl = req.url.split("/");
      const taskName = decodeURI(splitUrl[3]);

      await tasksService.makeTaskDone(taskName);
      const updatedTaskList = await tasksService.getToDoTaskList();

      return res.render("layout", {
        ...commonResponse,
        taskList: updatedTaskList,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use("/done", doneRoute({ tasksService }));

  return router;
};
