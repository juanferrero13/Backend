//Utilizando modelo de persistencia con FileSystem

// import fs from "fs";
// import express from "express"
// const router = express.Router()

// import ProductManager from "../controllers/productManager.js"
// const productManager = new ProductManager()


// //Traer/mostrar productos utilizando el query limit
// router.get("/api/products", async (req, res) => {
//     try {
//         //Leo los productos del "products.json"
//         const products = await fs.promises.readFile("./src/models/products.json", "utf-8")
//         //Parseo los productos
//         const productsJson = JSON.parse(products)
//         //Busco el limite y utilizo el metodo "Number" para convertir el dato del query de String a Number
//         let limit = Number(req.query.limit)
//         //Utilizamos el metodo "slice" para devolver un cierto número de productos 
//         let productsLimit = productsJson.slice(0, limit)
//         //Si se establece un limite se devuelven solo esos productos, de lo contario el array entero
//         if (limit) {
//             res.send(productsLimit)
//         } else {
//             res.send(productsJson)
//         }
//     } catch (error) {
//         console.log("Error al leer el archivo", error)
//         res.status(500).json({
//             error: "Error interno del servidor"
//         })
//     }
// })


// //Traer/filtrar productos por ir
// router.get("/api/products/:pid", async (req, res) => {
//     try {
//         //Leo los productos del "products.json"
//         const products = await fs.promises.readFile("./src/models/products.json", "utf-8")
//         //Parseo los productos
//         const productsJson = JSON.parse(products)
//         //Utilizo el "params" para mandarle un numero de ID por parametro
//         const id = parseInt(req.params.pid)
//         //Buscamos el producto que coincida con el ID ingresado
//         const productId = productsJson.find(prod => prod.id === id)
//         //Si se encuantra el producto con el ID ingresado devolvemos ese producto, de lo contrario devolvemos un mensaje indicando que no se encontro el producto con ese ID
//         if (productId) {
//             res.send(productId)
//         } else {
//             res.send("Producto no encontrado")
//         }
//     } catch (error) {
//         console.log("Error al leer el archivo", error)
//         res.status(500).json({
//             error: "Error interno del servidor"
//         });
//     }
// })


// //Enviar/crear productos
// router.post("/api/products", async (req, res) => {
//     try {
//         const { title, description, price, thumbnail, code, stock, status, category } = req.body

//         // Verifico campos requeridos
//         if (!title || !description || !price || !thumbnail || !code || !stock) {
//             return res.status(400).json({ error: "Datos del producto no proporcionados" })
//         }

//         // Leo el archivo JSON existente de productos
//         const products = await fs.promises.readFile("./src/models/products.json", "utf-8")
//         const productsJson = JSON.parse(products)

//         // Genero el ID único para el nuevo producto
//         const newProductId = productsJson.length > 0 ? productsJson[productsJson.length - 1].id + 1 : 1

//         // Creo objeto del nuevo producto con el ID generado
//         const newProduct = {
//             id: newProductId,
//             title,
//             description,
//             price,
//             thumbnail,
//             code,
//             stock,
//             status,
//             category
//         }

//         // Agrego el nuevo producto al arreglo de productos
//         productsJson.push(newProduct)

//         // Escribo los productos actualizados de vuelta al archivo JSON
//         await fs.promises.writeFile("./src/models/products.json", JSON.stringify(productsJson))

//         // Envio una respuesta de éxito con el nuevo producto
//         res.status(201).json({ message: "Producto agregado correctamente" })
//     } catch (error) {
//         console.error("Error al agregar el producto:", error)
//         res.status(500).json({ error: "Error interno del servidor" })
//     }
// });


// //Actualizar productos
// router.put("/api/products/:pid", async (req, res) => {
//     try {
//         const productId = parseInt(req.params.pid)
//         const updatedFields = req.body

//         // Verifico que el ID del producto sea válido
//         if (isNaN(productId)) {
//             return res.status(400).json({ error: "ID de producto inválido" })
//         }

//         // Leo el archivo JSON existente de productos
//         const products = await fs.promises.readFile("./src/models/products.json", "utf-8")
//         const productsJson = JSON.parse(products)

//         // Busco el producto por su ID
//         const productIndex = productsJson.findIndex(item => item.id === productId)

//         // Verifico si el producto existe
//         if (productIndex === -1) {
//             return res.status(404).json({ error: "Producto no encontrado" })
//         }

//         // Actualizo el producto con los campos proporcionados
//         const updatedProduct = { ...productsJson[productIndex], ...updatedFields }
//         productsJson[productIndex] = updatedProduct

//         // Escribo los productos actualizados de vuelta al archivo JSON
//         await fs.promises.writeFile("./src/models/products.json", JSON.stringify(productsJson))

//         // Envio una respuesta de éxito
//         res.status(200).json({ message: "Producto actualizado correctamente", updatedProduct })
//     } catch (error) {
//         console.error("Error al actualizar el producto:", error)
//         res.status(500).json({ error: "Error interno del servidor" })
//     }
// });


// //Eliminar productos 
// router.delete("/api/products/:pid", async (req, res) => {
//     try {
//         // Lee el contenido del archivo
//         const readFile = await fs.promises.readFile("./src/models/products.json", "utf-8")
//         let products = JSON.parse(readFile)

//         //Busco el ID del producto
//         const id = parseInt(req.params.pid)

//         // Verifico si el ID no es un número válido
//         if (isNaN(id)) {
//             res.status(404).json({ error: "El ID ingresado no es válido" })
//             return; // Retorna para evitar que continúe la ejecución del código
//         }

//         // Busco si el producto con el ID dado existe en la lista
//         const productIndex = products.findIndex(product => product.id === id)

//         // Si el producto no existe en la lista, devuelve un error
//         if (productIndex === -1) {
//             res.status(404).json({ error: "No se encontró ningún producto con el ID proporcionado" })
//             return; // Retorna para evitar que continúe la ejecución del código
//         }

//         // Filtra el array de productos para excluir el producto con el ID dado
//         products = products.filter(product => product.id !== id)

//         // Escribe los cambios en el archivo
//         await fs.promises.writeFile("./src/models/products.json", JSON.stringify(products))

//         res.status(200).json({ message: "Producto eliminado correctamente" })
//     } catch (error) {
//         console.error("Error al eliminar el producto:", error)
//         res.status(500).json({ error: "Error interno del servidor" })
//     }
// })

// export default router;


/* ************************************************************************************* */


//Utilizando modelo de persistencia con MongoDB

import express from "express"
const router = express.Router()

import ProductManager from "../controllers/productManager.js"
const productManager = new ProductManager()

// Traer/mostrar productos utilizando el query limit
router.get("/api/products", async (req, res) => {
    try {
        const limit = req.query.limit
        const products = await productManager.getProducts()
        if (limit) {
            res.json(products.slice(0, limit))
        } else {
            res.json(products)
        }
    } catch (error) {
        console.error("Error al obtener los productos", error)
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
})


//Traer/filtrar productos por ID
router.get("/api/products/:pid", async (req, res) => {
    const id = req.params.pid
    try {
        const product = await productManager.getProductById(id)
        if (!product) {
            res.json({
                error: "Producto no encontrado"
            })
        }
        res.json(product)
    } catch (error) {
        console.error("Error al obtener el producto", error)
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
})


//Enviar/crear productos
router.post("/api/products", async (req, res) => {
    const newProduct = req.body
    const {
        title,
        description,
        price,
        img,
        thumbnail,
        code,
        stock,
        status,
        category
    } = newProduct

    try {
        await productManager.addProduct(
            title,
            description,
            price,
            img,
            thumbnail,
            code,
            stock,
            status,
            category
        )
        res.status(201).json({
            message: "Producto agregado exitosamente"
        })
    } catch (error) {
        console.error("Error al agregar producto", error)
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
})


//Actualizar productos
router.put("/api/products/:pid", async (req, res) => {
    const id = req.params.pid
    const updatedProduct = req.body
    try {
        await productManager.updateProduct(id, updatedProduct)
        res.json({
            message: "Producto actualizado exitosamente"
        })
    } catch (error) {
        console.error("Error al actualizar producto", error)
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
})


//Eliminar producto
router.delete("/api/products/:pid", async (req, res) => {
    const id = req.params.pid

    try {
        await productManager.deleteProduct(id)
        res.json({
            message: "Producto eliminado exitosamente"
        })
    } catch (error) {
        console.error("Error al eliminar producto", error)
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
})


export default router




