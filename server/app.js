//importing required modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const todoRoute = require("./routes/todoRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
//calling dotenv
dotenv.config();

//express
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users", authRoute);
app.use("/api/todo", todoRoute);
//database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected successful"))
  .catch((err) => {
    console.log(err);
  });

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

//Listening to the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`The server is running at PORT${process.env.PORT}`);
});
