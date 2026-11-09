class Category {
    constructor({id, name, created_at}){
        this.id = id;
        this.name = name;
        this.createdAt = created_at || null;
    }
}

export default Category;