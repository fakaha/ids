import db from '../config/database.js';

class BookService {
    async getAllBooks(){
        const query =
        `SELECT a.id, a.title, a.author, a.year, a.category_id, b.name AS category_name,
        b.created_at FROM books a
        INNER JOIN categories b ON a.category_id = b.id
        ORDER BY a.id DESC`;

        const result = await db.query(query);
        return result.rows;
    }

    async getBookById(id){
        const query =
        `SELECT a.id, a.title, a.author, a.year, a.category_id, c,name AS category_name,
        b.created_at FROM books a
        INNER JOIN categories b ON a.category_id = b.id
        WHERE a.id = $1`;

        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            const err = new Error('Book not found');
            err.statusCode = 404;
            throw err;
        }
            return result.rows[0];
    }

    async createBook(data){
        const {title, author, year, category_id } = data;
        const currentYear = new Date().getFullYear();

        if (!title || title.trim().length < 3) {
            const err = new Error('Title must be at least 3 characters');

            err.statusCode = 400;
            throw err;
        }
        if (!author || author.trim() === '') {
            const err = new Error('Author must not be empty');

            err.statusCode = 400;
            throw err;
        }
        if (!year || Number(year) > currentYear) {
            const err = new Error(`Year must be less than or equal to ${currentYear}`);

            err.statusCode = 400;
            throw err;
        }

        const categoryCheck = await db.query('SELECT id FROM categories WHERE id = $1', [category_id]);

        if (categoryCheck.rows.length === 0) {
            const err = new Error('Category ID does not exist');
            err.statusCode = 400;
            throw err;
        }

        const insertQuery = `INSERT INTO books (title, author, year, category_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id`;

        const insertResult = await db.query(insertQuery,
            [
                title.trim(),
                author.trim(),
                Number(year),
                category_id
            ]);

        return await this.getBookById(insertResult.rows[0].id);
    }

    async updateBook(id, data){
        await this.getBookById(id);

        const updateFields = [];
        const values = [];
        let paramIndex = 1;
        const currentYear = new Date().getFullYear();

        if(data.title !== undefined){
            if(data.title.trim().length < 3){
                const err = new Error('Title must be at least 3 characters');
                err.statusCode = 400;
                throw err;
            }
            updateFields.push(`title = $${paramIndex++}`);
            values.push(data.title.trim());
        }

        if (data.author !== undefined) {
            if (!data.author.trim()) {
                const err = new Error('Author must not be empty');
                err.statusCode = 400;
                throw err;
            }
            updateFields.push(`author = $${paramIndex++}`);
            values.push(data.author.trim());
        }

        if (data.year !== undefined) {
            if (Number(data.year) > currentYear) {
                const err = new Error(`Year must be less than or equal to ${currentYear}`);
                err.statusCode = 400;
                throw err;
            }
            updateFields.push(`year = $${paramIndex++}`);
            values.push(Number(data.year));
        }

        if (data.category_id !== undefined) {
            const categoryCheck = await db.query('SELECT id FROM categories WHERE id = $1', [data.category_id]);
            if (categoryCheck.rows.length === 0) {
                const err = new Error('Category ID does not exist');
                err.statusCode = 400;
                throw err;
            }
            updateFields.push(`category_id = $${paramIndex++}`);
            values.push(data.category_id);
        }

        if (updateFields.length > 0) {
            values.push(id);
            const query = `UPDATE books SET ${updateFields.join(', ')} WHERE id = $${paramIndex}`;
            await db.query(query, values);
        }

        return await this.getBookById(id);
    }

    async deleteBook(id){
        await this.getBookById(id);
        await db.query(`DELETE FROM books WHERE id = $1`, [id]);
        return true;
    }
}

export default BookService;