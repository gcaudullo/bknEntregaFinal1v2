import { Server } from 'socket.io';
import ProductManager from './product-manager.js';

const productManager = new ProductManager('./products.json');

export const init = (httpServer) => {
  const io = new Server(httpServer);

  io.on('connection', (socketClient) => {
    // Enviar la lista de productos cuando un cliente se conecta
    console.log('Cliente conectado: ', socketClient.id);
    const sendProductList = async () => {
      try {
        const products = await productManager.getProducts();
        console.log(products)
        socketClient.emit('listOfProducts', products);
      } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
      }
    };

    // Llama a la función para enviar la lista de productos cuando un cliente se conecta
    sendProductList();

    socketClient.on('addProduct', async (productData) => {
      try {
        // Lógica para agregar el producto a través de WebSocket
        productManager.addProduct(productData);
        io.emit('productAdded', productData);
      } catch (error) {
        console.error('Error al agregar un producto:', error);
      }
    });

    socketClient.on('deleteProduct', async (productId) => {
      try {
        // Lógica para eliminar un producto a través de WebSocket
        await productManager.deleteProduct(parseInt(productId));
        io.emit('productDeleted', productId);
      } catch (error) {
        console.error('Error al eliminar un producto:', error);
      }
    });

    socketClient.on('disconnect', () => {
      console.log('Cliente desconectado: ', socketClient.id);
    });
  });
};
