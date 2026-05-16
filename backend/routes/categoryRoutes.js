import { Router } from 'express';
import { getAllCategories, createCategory ,deleteCategory,updateCategory} from '../controllers/categoryController.js';

const router = Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.delete('/delete/:id', deleteCategory);
router.patch('/update/:id', updateCategory);

export default router;