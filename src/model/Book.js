class Book{
    constructor({id, title, author, year, category_id, category_name, created_at}){
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.categoryId = category_id;
        this.categoryName = category_name || null;
        this.createdAt = created_at || null;
    }
}

export default Book;