const router = require("express").Router();
const verifyToken = require("../middleware/jwtverify");
const {
  createTodo,
  updateTodo,
  deleteTodo,
  allTodos,
} = require("../controllers/todoController");

//Routes
router.post("/", verifyToken, createTodo);
router.put("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);
router.get("/", verifyToken, allTodos);
module.exports = router;
