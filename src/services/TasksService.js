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
   * Get all task items
   */
  async getTaskList() {
    const data = await this.getData();
    return data;
  }

  /**
   * Add a new task
   * @param {*} name The name of the task
   */
  async addTask(name) {
    const data = (await this.getData()) || [];
    console.log(data);
    // data.unshift({ name }); //why does it doesn't work??
    return writeFile(this.datafile, JSON.stringify(name)); //just one (latest) task added at file
  }

  /**
   * Fetches task data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, "utf8");
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = TasksService;
