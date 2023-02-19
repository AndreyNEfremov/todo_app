//The TasksService methods should be all async functions.
//They can store data in memory, but they should return a Promise to simulate access to the database

const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Logic for reading and writing task data
class TasksService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSON file that contains the task data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Get task to done items
   */
  async getToDoTaskList() {
    const data = await this.getData();

    return data.filter((item) => !item.done);
  }

  /**
   * Get done task items
   */
  async getDoneTaskList() {
    const data = await this.getData();

    return data.filter((item) => item.done);
  }

  /**
   * Add a new task
   * @param {*} task The name of the task
   */
  async addTask(task) {
    if (!task || task.length < 3) {
      throw new Error("Minimal length for task name is 3 letter!");
    }

    const taskList = await this.getToDoTaskList();
    const existingTask = taskList.find((item) => task === item.task);

    if (existingTask) {
      throw new Error(`Task ${task} already exists!`);
    }

    const newTask = { task, done: false };
    taskList.unshift(newTask);
    writeFile(this.datafile, JSON.stringify({ taskList }));
  }

  /**
   * Fetches task data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, "utf8");
    if (!data) return [];

    return JSON.parse(data).taskList;
  }

  /**
   Change done key in task from false to true
   */
  async makeTaskDone(taskName) {
    const taskList = await this.getData();

    const newTaskList = taskList.map((item) => {
      if (taskName === item.task) {
        item.done = true;
      }

      return item;
    });

    await writeFile(this.datafile, JSON.stringify({ taskList: newTaskList }));
  }

  /**
   * Get task by name
   */
  async getTaskByName(taskName) {
    const data = await this.getData();

    return data.find((item) => item.task === taskName);
  }
}

module.exports = TasksService;
