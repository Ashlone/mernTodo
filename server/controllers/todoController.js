//importing required modules
const Todo = require("../models/todo");

//Create
const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      user: req.user._id,
      todo: req.body.todo,
    });
    const saveTodo = await todo.save();
    res.status(200).json(saveTodo);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Update
const updateTodo = async (req, res) => {
  try {
    const updateTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateTodo);
  } catch (err) {
    res.status(400).json(err);
  }
};

//DELETE
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json(err);
  }
};

//GET ALL
const allTodos = async (req, res) => {
  try {
    const allTodo = await Todo.find({ user: req.user._id });
    res.status(200).json(allTodo);
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = { createTodo, updateTodo, deleteTodo, allTodos };
