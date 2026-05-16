import db from "../models/index.js";
const Seat = db.Seat;

export const getAllSeats = async (req, res) => {
  res.json(await Seat.findAll());
};

export const createSeat = async (req, res) => {
  const seat = await Seat.create(req.body);
  res.status(201).json(seat);
};

export const updateSeat = async (req, res) => {
  const seat = await Seat.findByPk(req.params.id);

  if (!seat) return res.status(404).json({ message: "Not found" });

  await seat.update(req.body);

  res.json(seat);
};

export const deleteSeat = async (req, res) => {
  const seat = await Seat.findByPk(req.params.id);

  if (!seat) return res.status(404).json({ message: "Not found" });

  await seat.destroy();

  res.json({ message: "Deleted" });
};