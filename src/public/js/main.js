//Generamos una instancia de socket.io desde el lado del cliente
const socket = io()

socket.on("products", (data) => {
    renderProducts(data)
})

//Función para rendirizar los productos
const renderProducts = (products) => {
    const contentProducts = document.getElementById("contentProducts")
    contentProducts.innerHTML = ""
    contentProducts.className = "contentProducts"

    products.forEach(item => {
        const card = document.createElement("div")
        card.className = "card-rtp"
        card.innerHTML = `
                            <h3>Título: ${item.title}</h3>
                            <p>Descripción: ${item.description}</p>
                            <p>Categoría: ${item.category}</p>
                            <h4>Precio: $${item.price}</h4>
                            <button class="btn-rtp">ELIMINAR PRODUCTO</button>
        `
        contentProducts.appendChild(card)

        //Agregamos el evento al boton de eliminar producto
        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id)
        })
    })
}

//Función para eliminar producto
const deleteProduct = (id) => {
    socket.emit("deleteProduct", id)
}

//Agregar productos
document.getElementById("btnSend").addEventListener("click", () => {
    saveProduct()
})

const saveProduct = () => {
    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true"
    }

    socket.emit("saveProduct", product)
}


//Chat Websockets - Handlebars
//Creamos una variable para guardar el nombre de usuario
let user
const chatBox = document.getElementById("chatBox")

//Utilizamos sweetAlert para el mensaje de bienvenida
Swal.fire({
    title: "Hola, identificate",
    input: "text",
    text: "Ingresa un nombre de usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && "Necesitas ingresar un nombre para continuar"
    },
    //Deshabilitamos los clicks por fuera
    allowOutsideClick: false,
}).then(result => {
    user = result.value
})

chatBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            //El metodo trim() nos permite quitar los espacios en blanco del principio y del final de un sting
            //Si el mensaje es > 0, lo enviamos al servidor
            socket.emit("message", { user: user, message: chatBox.value })
            chatBox.value = ""
        }
    }
})

//Listener de mensajes
socket.on("messagesLogs", data => {
    const log = document.getElementById("messagesLogs")
    let messages = []

    data.forEach(message => {
        messages = messages + `${message.user}: ${message.message} <br>`
    })
    log.innerHTML = messages
})