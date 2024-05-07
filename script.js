let listaProductos = [
    { id: 12, nombre: "remera mangas largas", categoria: "indumentaria", stock: 3, precio: 7300, rutaImagen: "remera-ml.jpeg" },
    { id: 15, nombre: "short de basquet", categoria: "indumentaria", stock: 8, precio: 5600, rutaImagen: "short.jpg" },
    { id: 2, nombre: "pelota de futbol", categoria: "deportes", stock: 2, precio: 5000, rutaImagen: "pelota-futbol.jpg" },
    { id: 7, nombre: "remera mangas cortas", categoria: "indumentaria", stock: 4, precio: 4500, rutaImagen: "remera.jpg" },
    { id: 9, nombre: "pelota de voley", categoria: "deportes", stock: 1, precio: 2800, rutaImagen: "pelota-voley.jpg" },
    { id: 5, nombre: "gorra 1", categoria: "indumentaria", stock: 7, precio: 2650, rutaImagen: "gorra.jpg" },
    { id: 17, nombre: "gorra 2", categoria: "indumentariaaa", stock: 7, precio: 2650, rutaImagen: "gorra2.jpg" },
]

principal(listaProductos)

function principal(productos) {
    let carrito = []

    let botonMostrarOcultar = document.getElementById("mostrarOcultar")
    botonMostrarOcultar.addEventListener("click", mostrarOcultar)

    let botonBuscar = document.getElementById("botonBuscar")
    botonBuscar.addEventListener("click", () => filtrarYRenderizar(productos, carrito))
    renderizarProductos(productos, carrito)
}

function mostrarOcultar(e) {
    let contenedorProductos = document.getElementById("contenedorProductos")
    let contenedorCarrito = document.getElementById("contenedorCarrito")

    // toggle
    contenedorProductos.classList.toggle("oculto")
    contenedorCarrito.classList.toggle("oculto")

    console.dir(e.target)
    if (e.target.innerText === "Ver carrito") {
        console.log(true)
        e.target.innerText = "Ver productos"
    } else {
        console.log(false)
        e.target.innerText = "Ver carrito"
    }
}

function filtrarYRenderizar(productos, carrito) {
    let productosFiltrados = filtrarProductos(productos)
    renderizarProductos(productosFiltrados, carrito)
}

function filtrarProductos(productos) {
    let inputBusqueda = document.getElementById("inputBusqueda")
    return productos.filter(producto => producto.nombre.includes(inputBusqueda.value) || producto.categoria.includes(inputBusqueda.value))
}


function renderizarProductos(productos, carrito) {
    let contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ""

    productos.forEach(producto => {
        let tarjetaProducto = document.createElement("div")

        tarjetaProducto.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src=./images/${producto.rutaImagen} />
            <h4>Precio: ${producto.precio}</h4>
            <p>Stock: ${producto.stock}</p>
            <button id=botonCarrito${producto.id}>Agregar al carrito</button>
        `

        contenedorProductos.appendChild(tarjetaProducto)

        let botonAgregarAlCarrito = document.getElementById("botonCarrito" + producto.id)
        botonAgregarAlCarrito.addEventListener("click", (e) => agregarProductoAlCarrito(e, productos, carrito))
    });
}

function agregarProductoAlCarrito(e, productos, carrito) {
    let idDelProducto = Number(e.target.id.substring(12))
    console.log(idDelProducto)

    let posProductoEnCarrito = carrito.findIndex(producto => producto.id === idDelProducto)
    let productoBuscado = productos.find(producto => producto.id === idDelProducto)

    if (posProductoEnCarrito !== -1) {
        carrito[posProductoEnCarrito].unidades++
        carrito[posProductoEnCarrito].subtotal = carrito[posProductoEnCarrito].precioUnitario * carrito[posProductoEnCarrito].unidades
    } else {
        carrito.push({
            id: productoBuscado.id,
            nombre: productoBuscado.nombre,
            precioUnitario: productoBuscado.precio,
            unidades: 1,
            subtotal: productoBuscado.precio
        })
    }

    console.log(carrito)
    renderizarCarrito(carrito)
}

function renderizarCarrito(carrito) {
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    contenedorCarrito.innerHTML = ""
    carrito.forEach(producto => {
        let tarjetaProductoCarrito = document.createElement("div")
        tarjetaProductoCarrito.className = "tarjetaProductoCarrito"
        tarjetaProductoCarrito.id = `tarjetaProductoCarrito${producto.id}`

        tarjetaProductoCarrito.innerHTML = `
            <p>${producto.nombre}</p>
            <p>${producto.precioUnitario}</p>
            <p>${producto.unidades}</p>
            <p>${producto.subtotal}</p>
            <button id=eliminar${producto.id}>ELIMINAR</button>
        `
        contenedorCarrito.appendChild(tarjetaProductoCarrito)

        let botonEliminar = document.getElementById(`eliminar${producto.id}`)
        botonEliminar.addEventListener("click", eliminarProductoDelCarrito)
    })
}

function eliminarProductoDelCarrito(e) {
    e.target.parentElement.remove()
}
