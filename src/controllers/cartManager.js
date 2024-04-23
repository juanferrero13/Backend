//Modelo de persistencia de datos usando FileSystem

// import fs from "fs";

// class CartManager {
//     constructor(path = "./src/models/carts.json") {
//         this.carts = []
//         this.path = path
//         this.lastId = 0

//         //Cargar carritos almacenados en el archivo
//         this.cargarCarritos()
//     }

//     async cargarCarritos() {
//         try {
//             const data = await fs.promises.readFile(this.path, "utf-8")
//             this.carts = JSON.parse(data);
//             if (this.carts.length > 0) {
//                 // Verifico si hay por lo menos un carrito creado. 
//                 this.lastId = Math.max(...this.carts.map(cart => cart.id))
//                 // Utilizo el método map para crear un array que solo tenga los identificadores del carrito y con Math.max obtengo el mayor. 
//             }
//         } catch (error) {
//             console.log("Error al crear los carritos: ", error)
//             //Si no existe el archivo, lo voy a crear: 
//             await this.guardarCarritos()
//         }
//     }

//     async guardarCarritos() {
//         try {
//             await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
//             // console.log("Carrito guardado correctamente")
//         } catch (error) {
//             console.log("Error al guardar el carrito", error)
//         }
//     }

//     async crearCarrito() {
//         try {
//             const nuevoCarrito = {
//                 id: ++this.lastId,
//                 products: []
//             }

//             this.carts.push(nuevoCarrito)

//             // Guardamos el array en el archivo:
//             await this.guardarCarritos()
//             return nuevoCarrito
//         } catch (error) {
//             console.log("Error al crear el carrito", error)
//         }
//     }

//     async getCarritoById(carritoId) {
//         try {
//             const carrito = this.carts.find(cart => cart.id === carritoId)

//             if (!carrito) {
//                 console.log("No hay carrito con ese id")
//                 return;
//             }

//             return carrito
//         } catch (error) {
//             console.log("Error al obtener un carrito por id: ", error)
//         }
//     }

//     async agregarProductoAlCarrito(carritoId, productoId, quantity = 1) {
//         try {
//             const carrito = await this.getCarritoById(carritoId)
//             const existeProducto = carrito.products.find(item => item.product === productoId)

//             if (existeProducto) {
//                 existeProducto.quantity += quantity
//             } else {
//                 carrito.products.push({ product: productoId, quantity })
//             }

//             await this.guardarCarritos()
//             return carrito
//         } catch (error) {
//             console.log("Error al agregar producto al carrito", error)
//         }
//     }
// }

// export default CartManager


/* ************************************************************************************************ */

//Modelo de persistencia de datos usando MondoDB

import CartModel from "../models/carts.model.js"

class CartManager {

    async createCart() {
        try {
            const newCart = new CartModel({ products: [] })
            await newCart.save()
            return newCart
        } catch (error) {
            console.log(`Error al crear un nuevo carrito ${error}`)
            throw error
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId)

            if (!cart) {
                console.log("No hay ningun carrito con ese ID")
                return null
            }
        } catch (error) {
            console.log("Error al obtener un carrito por ID" + error)
            throw error
        }
    }

    async addProductsToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await this.getCartById(cartId)
            const existProduct = cart.products.find(item => item.product.toString() === productId)

            if (existProduct) {
                existProduct.quantity += quantity
            } else {
                cart.products.push({ product: productId, quantity })
            }

            //Cuando se modifica hay que marcarlo con "markModified"
            //Marcamos la propiedad "products" como modificada
            cart.markModified("products")

            await cart.save()
            return cart
        } catch (error) {
            console.log("Error al agregar el producto", error)
            throw error
        }
    }
}

export default CartManager