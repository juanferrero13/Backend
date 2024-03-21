//Importo todos los modulos con ES6 para no mezclar las dos formas de importación y que se genere un error

//Importo el modulo de FileSystem 
import fs from "fs";
// Importo la clase ProductManager del archivo ProductManager.js
import ProductManager from "./controllers/productManager.js"
// Importo la clase CartManager del archivo CartManager.js
import CartManager from "./controllers/cartManager.js";

// Importar el modulo de express y creo el PUERTO 8080
import express from "express"
const PUERTO = 8080
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"

// Creación de app express
const app = express()

// Creo una instancia de ProductManager
const productManager = new ProductManager()
const cartManager = new CartManager()

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`)
})

//Utilizamos json para los datos
app.use(express.json())
//Le dice al servidor que vamos a trabajar con datos complejos, por ejemplo al recibir varias querys
app.use(express.urlencoded({ extended: true }))

//Configuro ruta de mi productRouter y cartRouter
app.use("/", productsRouter)
app.use("/", cartsRouter)

//Agregar un prefijo virtual para cambiar el nombre de la carpeta public y comvertirla en un recurso estatico
app.use("/index", express.static("public"))