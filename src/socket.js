import { Server } from 'socket.io'
import ProductManager from './product-manager.js';

export const init = (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', (socketClient) => {
    // ... Otros manejadores de eventos ...
  
    socketClient.on('addProduct', (productData) => {
        // Lógica para agregar el producto a través de WebSocket
        productManager.addProduct(productData);
        socketServer.emit('productAdded', productData);
    });
  
    socketClient.on('deleteProduct', (productId) => {
        // Lógica para eliminar un producto a través de WebSocket
        productManager.deleteProduct(productId);
        socketServer.emit('productDeleted', productId);
    });
  });
} 

