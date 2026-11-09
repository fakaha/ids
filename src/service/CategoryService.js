import db from '../config/database.js';

class CategoryService{
    async getAllCategories(){
        const result = await db.query('SELECT * FROM categories ORDER BY id ASC');
        return result.rows;
    }

    async createCategory(name){
        if(!name || name.trim().length < 3){
            const err = new Error('Category name must be at least 3 characters');
            err.statusCode = 400;
            throw err;
        }

        const result = await db.query(
            'INSERT INTO categories (name) VALUES ($1) RETURNING *',
            [name.trim()]
        );
        return result.rows[0];
    }
}

export default CategoryService;