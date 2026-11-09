class CategoryController{
    constructor(categoryService){
        this.categoryService = categoryService;
    }

    getAll = async (req, res, next) => {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.status(200).json({ status: 'success', data: categories });
        } catch (err) {
            next(err);
        }
    };

    create = async (req, res, next) => {
        try {
            const newCategory = await this.categoryService.createCategory(req.body.name);
            res.status(201).json({status: 'success', data: newCategory});
        } catch (error) {
            next(error);
        }
    }
}

export default CategoryController;