const express = require("express");
const router = express.Router();

module.exports = (params) => {
  const { tasksService } = params;
  router.get("/", async (req, res, next) => {
    try {
      const doneTaskList = await tasksService.getDoneTaskList();
      // return res.json(doneTaskList);
      return res.render("layout", {
        pageTitle: "Done page | TODO Simple Application",
        template: "done",
        doneTaskList,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
