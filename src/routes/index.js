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

    if (req.body.task) {
      await tasksService.addTask(req.body);
      response.message = "Task was added!";
      response.status = "success";
    } else {
      response.message = "Invalid task!";
      response.status = "error";
    }

    response.taskList = await tasksService.getTaskList(); //how to render task list in main page?

    return res.render("layout", response);
  });

  router.use("/done", doneRoute());

  return router;
};
