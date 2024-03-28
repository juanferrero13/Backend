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