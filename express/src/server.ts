import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
import routes from "./routes/tasksRoutes";

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/ToDo-HW");
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.once("connected", () => {
  console.log("Database Connected");
});

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

app.use("/", routes);

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});
