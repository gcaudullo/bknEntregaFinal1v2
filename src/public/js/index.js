const addProductForm = document.getElementById('addProductForm');
const deleteProductForm = document.getElementById('deleteProductForm');
const socket = io();

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(addProductForm);
    const productData = {};
    formData.forEach((value, key) => {
        productData[key] = value;
    });
    socket.emit('addProduct', productData);
});

deleteProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(deleteProductForm);
    const productId = formData.get('productId');
    socket.emit('deleteProduct', productId);
});

socket.on('listOfProducts', async (products) => {
    await actualizarVista(products);
});

socket.on('productAdded', async (productData) => {
    console.log('Producto agregado:', productData);
});

// Evento para eliminar un producto
socket.on('productDeleted', async (productId) => {
    console.log('Producto eliminado:', productId);
});

async function actualizarVista(products) {
    const productListDiv = document.getElementById('product-list');
    // Limpia el contenido existente en el div.
    productListDiv.innerHTML = '';
    // Itera sobre la lista de productos y crea elementos HTML para mostrar cada producto.
    products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
        <p><strong>Id</strong>: ${product.id}</p>
        <p><strong>Title</strong>: ${product.title}</p>
        <p><strong>Description</strong>: ${product.description}</p>
        <p><strong>Code</strong>: ${product.code}</p>
        <p><strong>Price</strong>: ${product.price}</p>
        <p><strong>Status</strong>: ${product.status}</p>
        <p><strong>Stock</strong>: ${product.stock}</p>
        <p><strong>Category</strong>: ${product.category}</p>
        <hr/>
      `;
        // Agrega el elemento del producto al div de la lista de productos.
        productListDiv.appendChild(productDiv);
    });
}
