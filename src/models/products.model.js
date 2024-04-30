import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    thumbnail: {
        type: [String]
    }
})

//Agregamos el plugin para que funcione paginate
productsSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model("products", productsSchema)

export default ProductModel