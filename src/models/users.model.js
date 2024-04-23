import mongoose from "mongoose"

//Definimos el esquema: "schema"
//El "schema" es un objeto que nos permite definir la forma de los documentos. Configuramos el nombre de los campos y los tipos de datos que almacenan.
const usersSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number
})

//Definir el modelo:
const UsersModel = mongoose.model("usuarios", usersSchema)

export default UsersModel

