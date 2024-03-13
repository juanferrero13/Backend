//Importo todos los modulos con ES6 para no mezclar las dos formas de importación y que se genere un error

//Importo el modulo de FileSystem 
import fs from "fs";
// Importo la clase ProductManager del archivo ProductManager.js
import ProductManager from "./ProductManager.js"

// Importar el modulo de express y creo el PUERTO 8080
import express from "express"
const PUERTO = 8080

// Creación de app express
const app = express()

// Creo una instancia de ProductManager
const productManager = new ProductManager()

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`)
})


app.get("/products", async (req, res) => {
    try {
        //Leo los productos del "products.json"
        const products = await fs.promises.readFile("./products.json", "utf-8")
        //Parseo los productos
        const productsJson = JSON.parse(products)
        //Busco el limite y utilizo el metodo "Number" para convertir el dato del query de String a Number
        let limit = Number(req.query.limit)
        //Utilizamos el metodo "slice" para devolver un cierto número de productos 
        let productsLimit = productsJson.slice(0, limit)
        //Si se establece un limite se devuelven solo esos productos, de lo contario el array entero
        if (limit) {
            res.send(productsLimit)
        } else {
            res.send(productsJson)
        }
    } catch (error) {
        console.log("Error al leer el archivo", error)
    }
})


app.get("/products/:pid", async (req, res) => {
    try {
        //Leo los productos del "products.json"
        const products = await fs.promises.readFile("./products.json", "utf-8")
        //Parseo los productos
        const productsJson = JSON.parse(products)
        //Utilizo el "params" para mandarle un numero de ID por parametro
        const id = parseInt(req.params.pid)
        //Buscamos el producto que coincida con el ID ingresado
        const productId = productsJson.find(prod => prod.id === id)
        //Si se encuantra el producto con el ID ingresado devolvemos ese producto, de lo contrario devolvemos un mensaje indicando que no se encontro el producto con ese ID
        if (productId) {
            res.send(productId)
        } else {
            res.send("Producto no encontrado")
        }
    } catch (error) {
        console.log("Error al leer el archivo", error)
    }
})