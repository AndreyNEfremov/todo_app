const express = require("express");
const router = express.Router();
const doneRoute = require("./done");

const commonResponse = {
  pageTitle: "TODO Simple Application from EPAM",
  template: "index",
  status: null,
  message: "",
};

module.exports = (params) => {
  const { tasksService } = params;
  router.get("/", async (req, res, next) => {
    try {
      const taskList = await tasksService.getToDoTaskList();
      console.log("GET /", { taskList });

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
    console.log("POST /");

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
    console.log("POST /api/tasks/:taskName/done");
    try {
      const splitUrl = req.url.split("/");
      const taskName = decodeURI(splitUrl[3]);

      await tasksService.makeTaskDone(taskName);
      const updatedTaskList = await tasksService.getToDoTaskList();
      console.log({ updatedTaskList });

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
// Finally, we should implement the REST endpoint /api/tasks/:taskName/done that will indicate that the task named taskName is done.
// (Our JS script will send this request to the back end and will remove the element from the page if the request is successfully completed).
