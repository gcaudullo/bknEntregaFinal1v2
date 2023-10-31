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