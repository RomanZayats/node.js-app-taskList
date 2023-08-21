const Todo = require("../models/todo");

module.exports = {
  async getTodos() {
    try {
      return await Todo.findAll();
    } catch (e) {
      throw new Error("Fetching error");
    }
  },
};