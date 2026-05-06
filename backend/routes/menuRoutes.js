
const express  = require('express');
const router = express.Router();
const { Menu } = require('../models');
const menuController = require('../controller/menuController.js');

router.get( '/', menuController.getAllmenu);
router.get('/:id', menuController.getmenuById);
router.post('/', menuController.createMenu);
router.delete('/:id', menuController.deleteMenu);
module.exports = router;