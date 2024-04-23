import express, { Router } from "express"

const router = express.Router()

//Importamos el modelo
import UsersModel from "../models/users.model.js"

//Obtenemos el listado de todos los usuarios
router.get("/", async (req, res) => {
    try {
        const users = await UsersModel.find()
        res.json(users)
    } catch (error) {
        res.status(500).json("Error en el servidor")
    }
})

//Subimos un nuevo usuario por Postman
router.post("/", async (req, res) => {
    const newUser = req.body
    //Tomamos los datos del body de la peticion
    try {
        const user = new UsersModel(newUser)
        await user.save()
        res.send({message: "Usuario creado exitosamente", user: user})
    } catch (error) {
        res.status(500).json("Error interno del servidor")
    }
})

//Actualizamos un usuario por ID
router.put("/:id", async (req, res) => {
    const idFind = req.params.id
    const newData = req.body

    try {
        const user = await UsersModel.findByIdAndUpdate(idFind, newData)
        res.status(200).send({message: "Usuario actualizado", user: user})
    } catch (error) {
        res.status(500).json("Error al actualizar el usuario")
    }
})

//Eliminamos un usuario por ID
router.delete("/:id", async (req, res) => {
    const idFind = req.params.id
    try {
        const user = await UsersModel.findByIdAndDelete(idFind)
        if(!user){
            return res.status(404).send("Usuario no encontrado")
        }
        res.status(200).send("Usuario eliminado correctamente")
    } catch (error) {
        res.status(500).json("Error interno del servidor")
    }
})

export default router