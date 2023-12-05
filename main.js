class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1; 
    }

    addProduct(title, description, price, thumbnail, code, stock) {
 
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        const codeExists = this.products.some(product => product.code === code);
        if (codeExists) {
            console.error("Ya existe un producto con el mismo código.");
            return;
        }


        const newProduct = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);

        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado.");
            return null;
        }
    }
}


const manager = new ProductManager();

manager.addProduct("Producto 1", "Descripción 1", 20.5, "imagen1.jpg", "P001", 100);
manager.addProduct("Producto 2", "Descripción 2", 30.0, "imagen2.jpg", "P002", 50);

console.log(manager.getProducts());

const foundProduct = manager.getProductById(1);
console.log(foundProduct);

const notFoundProduct = manager.getProductById(3);
