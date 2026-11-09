import express from 'express';
import BookService from '../service/BookService.js';
import BookController from '../controller/BookController.js';

const router = express.Router();

const bookService = new BookService();
const bookController = new BookController(bookService);

router.get('/', bookController.getAll);
router.get('/:id', bookController.getById);
router.post('/', bookController.create);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.delete);

export default router;