import express from "express";
const router = express.Router();
import taskModel from "../models/taskModel";

router.get("/", async (req, res) => {
  try {
    const data = await taskModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/tasks", async (req, res) => {
  const task = new taskModel({
    content: req.body.content,
    complited: req.body.complited,
  });

  try {
    const dataToSave = await task.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await taskModel.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await taskModel.findByIdAndDelete(id);
    res
      .status(200)
      .send(`Document with task (${data.content}) has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
