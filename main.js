const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.productIdCounter = 1;

    
        this.loadProducts();
    }

    addProduct(productData) {
        const { title, description, price, thumbnail, code, stock } = productData;

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
        this.saveProducts();

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

    updateProduct(id, field, value) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex][field] = value;
            this.saveProducts();
        } else {
            console.error("Producto no encontrado.");
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProducts();
        } else {
            console.error("Producto no encontrado.");
        }
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.productIdCounter = Math.max(...this.products.map(product => product.id), 0) + 1;
        } catch (error) {
            console.error("Error al cargar productos desde el archivo:", error.message);
        }
    }

    saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data, 'utf8');
        } catch (error) {
            console.error("Error al guardar productos en el archivo:", error.message);
        }
    }
}

const manager = new ProductManager('productos.json');

manager.addProduct({
    title: "Producto 1",
    description: "Descripción 1",
    price: 20.5,
    thumbnail: "imagen1.jpg",
    code: "P001",
    stock: 100
});

manager.addProduct({
    title: "Producto 2",
    description: "Descripción 2",
    price: 30.0,
    thumbnail: "imagen2.jpg",
    code: "P002",
    stock: 50
});

console.log(manager.getProducts());

const foundProduct = manager.getProductById(1);
console.log(foundProduct);

manager.updateProduct(1, 'price', 25.0);
console.log(manager.getProducts());

manager.deleteProduct(1);
console.log(manager.getProducts());
