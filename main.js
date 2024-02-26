class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor(products = []) {
        this.products = products;
        this.id = 1; // Inicializamos el ID en 1
    }

    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;

        // Verificar campos requeridos
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Debes completar todos los campos");
            return;
        }

        // Verificar duplicados por código
        if (this.products.some(item => item.code === code)) {
            console.log("Ya existe un producto con ese código");
            return;
        }

        // Asigno el ID y luego lo incremento para el próximo producto
        product.id = this.id++;

        // Agregar el producto al array
        this.products.push(product);
        console.log("Producto agregado correctamente");
    }

    //Devuelvo los productos del array hasta el momento
    getProducts() {
        return this.products;
    }

    //Verifico si el array hay algun producto que coincida con el ID
    getProductById(productId) {
        const product = this.products.find(item => item.id === productId);
        if (!product) {
            console.log("Not found");
        } else {
            return product;
        }
    }
}

// Crear una instancia de ProductManager
const manager = new ProductManager();

// Crear un nuevo producto
const product1 = new Product("camisa", "camisa a cuadros hombre", 5000, "url-img", "abcd1", 10);
const product2 = new Product("pantalon", "pantalon jean mujer", 6000, "url-img", "abcd2", 10);
const product3 = new Product("remera", "remera deportiva unisex", 3000, "url-img", "abcd3", 10);
const product4 = new Product("gorra", "gorra clasica", 2000, "url-img", "abcd4", 10);
const product5 = new Product("bufanda", "bufanda lana", 2000, "url-img", "abcd5", 10);

// Agregar el nuevo producto usando el método addProduct()
manager.addProduct(product1);
manager.addProduct(product2);
manager.addProduct(product3);
manager.addProduct(product4);
manager.addProduct(product5);

//Obtengo los productos del ProductManager para luego mostrarlos
const viewProducts = manager.getProducts()
viewProducts.forEach(item => {
    console.log(item)
})

//Busco los productos por el ID con el metodo getProductById
const findProductById = manager.getProductById(3);
// Verifico si se encontró un producto con el ID especificado
if (findProductById) {
    //Si se encontro, mostramos el nombre y el ID, de lo contrario me devuelve "Not found"
    console.log(`Nombre: ${findProductById.title}`);
    console.log(`ID: ${findProductById.id}`);
}




