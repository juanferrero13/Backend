import express from "express"
const router = express.Router()
import CartManager from "../controllers/cartManager.js"
const cartManager = new CartManager("./src/models/carts.json")

//1) Creamos un nuevo carrito:

router.post("/api/carts", async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.json(newCart)
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
})

//2) Listamos productos que pertenecen a un carrito determinado

router.get("/api/carts/:cid", async (req, res) => {
    const cartId = Number(req.params.cid)

    try {
        const cart = await cartManager.getCartById(cartId)
        res.json(cart.products).send({message: "Productos listados correctamente"})
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
})

//3) Agregar productos a distintos carritos: 

router.post("/api/carts/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid)
    const productId = req.params.pid
    const quantity = req.body.quantity || 1

    try {
        const updateCart = await cartManager.agregarProductoAlCarrito(cartId, productId, quantity)
        res.json(updateCart.products)
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
})


export default router