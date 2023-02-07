const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");

const mongoose = require("mongoose");

//express app
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//route
app.use("/api/workouts", workoutRoutes);

//connect to DB
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
