import db from "../models/index.js";

const { Menu, Category } = db;

const menuFields = [
  "name",
  "price",
  "itemNumber",
  "description",
  "category",
  "categoryId",
  "image",
  "imageUrl",
  "isAvailable",
];

const pickMenuFields = (body) =>
  menuFields.reduce((data, field) => {
    if (body[field] !== undefined) {
      data[field] = body[field];
    }

    return data;
  }, {});

const normalizeMenuData = (body) => {
  const data = pickMenuFields(body);

  if (data.image && !data.imageUrl) {
    data.imageUrl = data.image;
  }

  if (data.imageUrl && !data.image) {
    data.image = data.imageUrl;
  }

  return data;
};

export async function getAllmenu(req, res) {
  try {
    const where = req.query.all === "true" ? {} : { isAvailable: true };
    const menus = await Menu.findAll({
      where,
      include: [{ model: Category, attributes: ["id", "name"], required: false }],
      order: [
        ["category", "ASC"],
        ["itemNumber", "ASC"],
        ["name", "ASC"],
      ],
    });

    res.json(menus);
  } catch (error) {
    console.error("getAllmenu error:", error);
    res.status(500).json({
      message: "Failed to fetch menus",
      error: error.message,
    });
  }
}

export async function getmenuById(req, res) {
  try {
    const menu = await Menu.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ["id", "name"], required: false }],
    });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.json(menu);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch menu",
      error: error.message,
    });
  }
}

export async function createMenu(req, res) {
  try {
    const data = normalizeMenuData(req.body);

    if (!data.name || data.price === undefined) {
      return res.status(400).json({ message: "name and price are required" });
    }

    const menu = await Menu.create(data);
    res.status(201).json(menu);
  } catch (error) {
    console.error("createMenu error:", error);
    res.status(500).json({
      message: "Failed to create menu",
      error: error.message,
    });
  }
}

export async function updateMenu(req, res) {
  try {
    const menu = await Menu.findByPk(req.params.id);

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    await menu.update(normalizeMenuData(req.body));
    res.json(menu);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update menu",
      error: error.message,
    });
  }
}

export async function deleteMenu(req, res) {
  try {
    const menu = await Menu.findByPk(req.params.id);

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    await menu.destroy();

    res.json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete menu",
      error: error.message,
    });
  }
}
