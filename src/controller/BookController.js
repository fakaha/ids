class BookController{
    constructor(bookService){
        this.bookService = bookService;
    }

    getAll = async (req, res, next) => {
        try {
            const books = await this.bookService.getAllBooks();
            res.status(200).json({ status: 'success', data: books });
        } catch (error) {
            next(error);
        }
    };

    getById = async (req, res, next) => {
        try {
            const book = await this.bookService.getBookById(req.params.id);
            res.status(200).json({ status: 'success', data: book });
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const newBook = await this.bookService.createBook(req.body);
            res.status(201).json({ status: 'success', data: newBook });
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const updatedBook = await this.bookService.updateBook(req.params.id, req.body);
            res.status(200).json({ status: 'success', data: updatedBook });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
        await this.bookService.deleteBook(req.params.id);
        res.status(200).json({ status: 'success', message: 'Book deleted successfully' });
        } catch (error) {
        next(error);
        }
    };
}

export default BookController;