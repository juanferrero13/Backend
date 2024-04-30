// //Importo todos los modulos con ES6 para no mezclar las dos formas de importación y que se genere un error

// //Importo el modulo de FileSystem 
// import fs from "fs";
// // Importo la clase ProductManager del archivo ProductManager.js
// import ProductManager from "./controllers/productManager.js"
// // Importo la clase CartManager del archivo CartManager.js
// import CartManager from "./controllers/cartManager.js";

// // Importar el modulo de express y creo el PUERTO 8080
// import express from "express"
// const PUERTO = 8080
// import productsRouter from "./routes/products.router.js"
// import cartsRouter from "./routes/carts.router.js"


// //Importo el modulo de express-handlebars
// import exphbs from "express-handlebars"

// // Creación de app express
// const app = express()

// // import viewRouter from "./routes/views.router.js"

// //Configuramos el motor de plantilla
// app.engine("handlebars", exphbs.engine())
// //Le decimos a express que cuando vea un archivo de extension "handlebars" utilice el motor de plantillas "handlebars"

// app.set("view engine", "handlebars")
// //Nuevamente le decimos que la vista de nuestra aplicacion es desarrollada con handlebars

// app.set("views", "./src/views")
// //Le decimos donde tiene que ir a buscar los archivos "handlebars"

// //Middleware
// app.use(express.static("./src/public"))


// // Creo una instancia de ProductManager
// const productManager = new ProductManager()
// const cartManager = new CartManager()


// app.listen(PUERTO, () => {
//     console.log(`Escuchando en el puerto: ${PUERTO}`)
// })

// //Utilizamos json para los datos
// app.use(express.json())
// //Le dice al servidor que vamos a trabajar con datos complejos, por ejemplo al recibir varias querys
// app.use(express.urlencoded({ extended: true }))

// //Configuro ruta de mi productRouter y cartRouter
// app.use("/", productsRouter)
// app.use("/", cartsRouter)
// // app.use("/", viewRouter)

// //Agregar un prefijo virtual para cambiar el nombre de la carpeta public y comvertirla en un recurso estatico
// app.use("/index", express.static("public"))


// Importar el modulo de express y creo el PUERTO 8080
import express from "express"
const PUERTO = 8080

//Importo la conexión a la DB
import "./config/mongoose.js"


//Importo el modulo de express-handlebars
import exphbs from "express-handlebars"
import usersRouter from "./routes/users.router.js"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewRouter from "./routes/views.router.js"

//Importo los modelos
import ProductModel from "./models/products.model.js"
import CartModel from "./models/carts.model.js"

//Importamos socket
import { Server } from "socket.io"

// Creación de app express
const app = express()

//Configuramos el motor de plantilla
app.engine("handlebars", exphbs.engine())
//Le decimos a express que cuando vea un archivo de extension "handlebars" utilice el motor de plantillas "handlebars"
app.set("view engine", "handlebars")
//Nuevamente le decimos que la vista de nuestra aplicacion es desarrollada con handlebars
app.set("views", "./src/views")
//Le decimos donde tiene que ir a buscar los archivos "handlebars"

//Utilizamos json para los datos
app.use(express.json())
//Le dice al servidor que vamos a trabajar con datos complejos, por ejemplo al recibir varias querys
app.use(express.urlencoded({ extended: true }))

//Middleware
app.use(express.static("./src/public"))

//Con httpServer nos guardamos una referencia a nuestro servidor express
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`)
})

//Rutas
app.use("/", viewRouter)
app.use("/", usersRouter)
app.use("/", productsRouter)
app.use("/", cartsRouter)

//Ruta para chat Websocket
app.get("/", (req, res) => {
    res.render("index")
})


//Ruta para ver los productos
app.get("/products", async (req, res) => {
    const page = req.query.page || 1
    let limit = 3
    try {
        const products = await ProductModel.paginate({}, { limit, page })

        const finalProducts = products.docs.map(prod => {
            const { _id, ...rest } = prod.toObject()
            return rest
        })

        res.render("products", {
            products: finalProducts,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            totalPages: products.totalPages
        })

    } catch (error) {
        res.status(500).send("Error interno del servidor", error)
    }
})

//Instancia de socket.io del lado del servidor
const io = new Server(httpServer)

//Chat Websockets
let messages = []

//Establecemos la conección
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado")

    socket.on("message", data => {
        messages.push(data)

        //Emitimos mensaje para el cliente con el array de datos
        io.emit("messagesLogs", messages)
    })
})

//Generamos la conección
io.on("connection", async (socket) => {
    console.log("Un cliente se conecto")

    //Enviamos el array de productos utilizando el metodo getProduct del ProductManager
    socket.emit("products", await productManager.getProducts())

    //Recibimos la funcion "deleteProduct" desde el cliente
    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id)
    })

    //Enviamos el array de productos actualizados
    socket.emit("products", await productManager.getProducts())

    //Recibimos la funcion "saveProduct" desde el cliente
    socket.on("saveProduct", async (product) => {
        await productManager.addProduct(
            product.title,
            product.description,
            product.price,
            product.img,
            product.code,
            product.stock,
            product.status,
            product.category
        )
    })
})

// const main = async () => {
//     const product1 = await ProductModel.findById("6627d9e0f79cf167e429ffab")
//     console.log(product1)

//     const cart1 = await CartModel.findById("66305d81023504e98573f940")
//     console.log(cart1)

//     cart1.products.push(product1)

//     await CartModel.findByIdAndUpdate("66305d81023504e98573f940", cart1)

//     const cart1Find = await CartModel.findById("66305d81023504e98573f940").populate("products")
//     console.log(cart1Find)
// }

// main()