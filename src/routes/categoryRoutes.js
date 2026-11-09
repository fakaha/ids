import express from 'express';
import CategoryService from '../service/CategoryService.js';
import CategoryController from '../controller/CategoryController.js';

const router = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

router.get('/', categoryController.getAll);
router.post('/', categoryController.create);

export default router;