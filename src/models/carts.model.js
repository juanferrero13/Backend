import mongoose from "mongoose"

const cartsSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})

//Middleware PRE de mongoose
cartsSchema.pre("findOne", function(next){
    this.populate("products")
    next()
})

const CartModel = mongoose.model("carts", cartsSchema)

export default CartModel