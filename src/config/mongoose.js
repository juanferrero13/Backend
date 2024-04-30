//Nos conectamos a Mongo Atlas por medio de mongoose
import mongoose from "mongoose"
import ProductModel from "../models/products.model.js"

const db = async () => {
    await mongoose.connect("mongodb+srv://juanpabloferrero13:coderhouse@cluster0.247wzzb.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log("Conectados a la BD"))
        .catch((error) => console.log(`Error ${error}`))

    // const resp = await ProductModel.find().explain("executionStats")
    //El método explain da una estadistica de la consulta y le paso el parametro "executionStats" para obtener todos los detalles
    // console.log(resp)
}

db()


export default mongoose