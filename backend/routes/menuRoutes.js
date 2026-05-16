import { Router } from 'express';
import { getAllmenu, getmenuById, createMenu, updateMenu, deleteMenu } from '../controllers/menuController.js';

const router = Router();

router.get('/', getAllmenu);
router.get('/:id', getmenuById);
router.post('/', createMenu);
router.put('/:id', updateMenu);
router.delete('/:id', deleteMenu);

export default router;
