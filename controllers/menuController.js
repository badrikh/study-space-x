import db from "../models/index.js";
const Menu = db.Menu;

export const getAllmenu = async (req, res) => {
  const menus = await Menu.findAll();
  res.json(menus);
};

export const getmenuById = async (req, res) => {
  const menu = await Menu.findByPk(req.params.id);

  if (!menu) return res.status(404).json({ message: "Not found" });

  res.json(menu);
};

export const createMenu = async (req, res) => {
  const menu = await Menu.create(req.body);
  res.status(201).json(menu);
};

export const deleteMenu = async (req, res) => {
  const menu = await Menu.findByPk(req.params.id);

  if (!menu) return res.status(404).json({ message: "Not found" });

  await menu.destroy();

  res.json({ message: "Deleted" });
};