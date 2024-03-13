import fs from "fs";

class ProductManager {
    //Variable estatica
    static lastId = 0
    constructor(products = [], path = "./products.json") {
        this.products = products
        this.path = path
    }

    addProduct(title, description, price, thumbnail, code, stock) {

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

        //Creo un nuevo objeto
        const newProduct = {
            id: ++ProductManager.lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        //Se agrega al array
        this.products.push(newProduct)

        //Guardar el arreglo
        const saveProduct = async () => {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
        }
        saveProduct()
    }

    //Leer el archivo de productos y retornalos
    async getProducts() {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8")
            const arrayProducts = JSON.parse(readFile)
            console.log("Productos:", arrayProducts) // Muestra los productos por consola
            return arrayProducts // Devuelve los productos leídos del archivo
        } catch (error) {
            console.error(error)
            return [] // Devuelve un array vacío en caso de error
        }
    }

    //Verifico si en el array hay algun producto que coincida con el ID
    async getProductById(id) {
        try {
            // Leo el contenido del archivo
            const readFile = await fs.promises.readFile(this.path, "utf-8")

            // Parseo el contenido del archivo para convertirlo en un array de productos
            const products = JSON.parse(readFile);

            // Busco el producto por su ID dentro del array de productos
            const foundProduct = products.find(item => item.id === id)

            if (foundProduct) {
                // Si se encuentra el producto, lo muestro por consola y lo devuelve
                console.log("Producto encontrado:", foundProduct)
                return foundProduct;
            } else {
                // Si no se encuentra el producto, muestro un mensaje y devuelve null
                console.log("Producto no encontrado")
                return null
            }
        } catch (error) {
            // Manejo cualquier error que pueda ocurrir durante el proceso y lo registro en la consola
            console.error(error)
            return null;
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            // Leo el contenido del archivo
            const readFile = await fs.promises.readFile(this.path, "utf-8")
            const products = JSON.parse(readFile)

            // Busco el índice del producto por su ID
            const productIndex = products.findIndex(item => item.id === id)

            if (productIndex !== -1) {
                // Actualizo el producto con los campos proporcionados
                // Solo actualiza los campos presentes en updatedFields
                if (updatedFields.price !== undefined) {
                    products[productIndex].price = updatedFields.price
                }
                if (updatedFields.stock !== undefined) {
                    products[productIndex].stock = updatedFields.stock
                }

                // Escribo los cambios en el archivo
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

                console.log("Producto actualizado correctamente")
            } else {
                console.log("Producto no encontrado")
            }
        } catch (error) {
            console.error(error)
        }
    }

    async deleteProduct(id) {
        try {
            // Lee el contenido del archivo
            const readFile = await fs.promises.readFile(this.path, "utf-8")
            let products = JSON.parse(readFile)

             // Filtra el array de productos para excluir el producto con el ID dado
            products = products.filter(product => product.id !== id)

            // Escribe los cambios en el archivo
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

            console.log("Producto eliminado correctamente")
        } catch (error) {
            console.error(error)
        }
    }
}

// Crear una instancia de ProductManager
const manager = new ProductManager();

//Se llama al método "addProduct""
// manager.addProduct("Reloj Montreal", "Reloj Montreal Hombre Analogico", 15000, "url-img", "abdc1", 10)
// manager.addProduct("Reloj Montreal", "Reloj Montreal Hombre Digital", 15000, "url-img", "abdc2", 10)
// manager.addProduct("Reloj Montreal", "Reloj Montreal Hombre Clásico", 20000, "url-img", "abdc3", 10)
// manager.addProduct("Reloj Montreal", "Reloj Montreal Hombre Deportivo", 18000, "url-img", "abdc4", 10)
// manager.addProduct("Reloj Montreal", "Reloj Montreal Hombre Moda", 18000, "url-img", "abdc5", 10)
// manager.addProduct("Reloj Montreal", "Reloj Montreal Mujer Moda", 18000, "url-img", "abdc6", 10)
// manager.addProduct("Reloj Montreal", "Reloj Montreal Mujer Deportivo", 15000, "url-img", "abdc7", 10)
// manager.addProduct("Reloj Montreal", "Reloj Montreal Mujer Digital", 19000, "url-img", "abdc8", 10)
// manager.addProduct("Reloj Montreal", "Reloj Montreal Mujer Analogico", 17000, "url-img", "abdc9", 10)
// manager.addProduct("Reloj Montreal", "Reloj Montreal Mujer Clásico", 22000, "url-img", "abdc10", 10)

//Se llama al método "getProducts"
// console.log(manager.getProducts())

//Se evalua "getProductById", devuelve error si no encuentra el producto, o el producto en caso de encontrarlo 
// manager.getProductById(2)

// Actualizar el producto 
// manager.updateProduct(4, { price: 26000, stock: 15 });

//Eliminar un producto
// manager.deleteProduct(10)


// Exporto la clase ProductManager
export default ProductManager