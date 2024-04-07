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


//Handlebars

import express from "express"
const PUERTO = 8080

import viewRouter from "./routes/views.router.js"
//Importo el modulo de express-handlebars
import exphbs from "express-handlebars"

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

app.use("/", viewRouter)

//Instancia de socket.io del lado del servidor
const io = new Server(httpServer)

//Obtenemos el array de productos
import ProductManager from "./controllers/productManager.js"
const productManager = new ProductManager("./src/models/products.json")

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
