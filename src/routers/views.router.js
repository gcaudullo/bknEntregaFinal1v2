import ProductManager from '../product-manager.js';
import express from 'express';
const router = express.Router();
const productManager = new ProductManager('./products.json');



router.get('/', (req, res) => {
    const { query } = req;
    const { limit } = query;
    productManager.getProducts()
        .then(products => {
            if (!limit) {
                // No hay límite, pasa todos los productos
                res.render('home', { title: 'Productos 🚀', products });
            } else {
                // Aplicar el límite y pasar los productos filtrados
                const result = products.slice(0, parseInt(limit));
                res.render('home', { title: 'Productos 🚀', products: result });
            }
        })
        .catch(error => {
            console.error(error);
        });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { title: 'Real Time Products 😎' });
  });

export default router;