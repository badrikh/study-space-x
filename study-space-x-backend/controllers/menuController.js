import Menu from '../models/menu.js';

import cloudinary from '../utils/cloudinary.js';

 

export async function getAllmenu(req, res) {

  try {

    const menus = await Menu.findAll();

    res.json(menus);

  } catch (error) {

    res.status(500).json({

      message: 'Failed to fetch menus',

      error: error.message

    });

  }

}

 

export async function getmenuById(req, res) {

  try {

    const menu = await Menu.findByPk(req.params.id);

 

    if (!menu) {

      return res.status(404).json({ message: 'Menu not found' });

    }

 

    res.json(menu);

  } catch (error) {

    res.status(500).json({

      message: 'Failed to fetch menu',

      error: error.message

    });

  }

}

 

export async function createMenu(req, res) {

  try {

    console.log("BODY:", req.body);

 

 

    const {secure_url} = await cloudinary.uploader.upload(req.file.path);

    req.body.image = secure_url;

    const menu = await Menu.create(req.body);

 

    console.log("CREATED:", menu);

 

    res.status(201).json(menu);

  } catch (error) {

    console.log("ERROR:", error);

 

    res.status(500).json({

      message: "Failed to create menu",

      error: error.message

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

      error: error.message

    });

  }

}
