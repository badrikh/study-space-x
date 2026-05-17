import db from "../models/index.js";
const TimeSlot = db.TimeSlot;

export const getAllTimeSlots = async (req, res) => {
  res.json(await TimeSlot.findAll());
};

export const createTimeSlot = async (req, res) => {
  const timeSlot = await TimeSlot.create(req.body);
  res.status(201).json(timeSlot);
};

export const updateTimeSlot = async (req, res) => {
  const timeSlot = await TimeSlot.findByPk(req.params.id);

  if (!timeSlot) return res.status(404).json({ message: "Not found" });

  await timeSlot.update(req.body);

  res.json(timeSlot);
};

export const deleteTimeSlot = async (req, res) => {
  const timeSlot = await TimeSlot.findByPk(req.params.id);

  if (!timeSlot) return res.status(404).json({ message: "Not found" });

  await timeSlot.destroy();

  res.json({ message: "Deleted" });
};