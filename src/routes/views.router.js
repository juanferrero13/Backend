// //Modelo de persistencia de FileSystem
// import fs from "fs"
// import express from "express"
// const router = express.Router()

// router.get("/", async (req, res) => {
//     try {
//         const products = await fs.promises.readFile("./src/models/products.json", "utf-8")
//         const productsJson = JSON.parse(products)
//         if (productsJson) {
//             res.render("home", { productsJson })
//         } else {
//             res.render("No hay productos disponibles")
//         }
//     } catch (error) {
//         console.log("Error al leer el archivo", error)
//         res.status(500).json({
//             error: "Error interno del servidor"
//         })
//     }
// })

// router.get("/realtimeproducts", async (req, res) => {
//     res.render("realtimeproducts")
// })

// export default router

import express from "express"
const router = express.Router()

router.get("/", async (req, res) => {
    res.render("chat")
})

export default router
