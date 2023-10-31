import ProductManager from '../product-manager.js';
import express from 'express';
const router = express.Router();
export const productManager = new ProductManager('./products.json');



router.get('/products', (req, res) => {
    const { query } = req;
    const { limit } = query;
    productManager.getProducts()
        .then(products => {
            if (!limit) {
                res.status(200).json(products);
            } else {
                const result = products.slice(0, parseInt(limit));
                res.status(200).json(result);
            }
        })
        .catch(error => {
            console.error(error);
        });
});

router.get('/products/:pId', (req, res) => {
    const { pId } = req.params;
    productManager.getProductById(parseInt(pId))
        .then(product => {
            if (product === 'Product Not found! 😨') {
                res.status(404).json({ error: 'Product Not found! 😨' });
            } else {
                res.status(200).json(product);
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error obtaining product.' });
        });
});

router.post('/products', (req, res) => {
    productManager.addProduct(req.body)
        .then(() => {
            res.status(201).json(req.body);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error adding product.' });
        });
});

router.put('/products/:pid', (req, res) => {
    const { pid } = req.params; // Obtiene el ID del producto de la URL
    const productData = req.body; // Obtiene los datos a actualizar desde el cuerpo de la solicitud

    // Llama al método updateProduct de ProductManager para actualizar el producto
    productManager.updateProduct(parseInt(pid), productData)
        .then(() => {
            res.status(200).json({ message: 'Product updated successfully' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Error updating product' });
        });
});

router.delete('/products/:pid', (req, res) => {
    const { pid } = req.params; // Obtiene el ID del producto de la URL

    // Llama al método deleteProduct de ProductManager para eliminar el producto
    productManager.deleteProduct(parseInt(pid))
        .then(() => {
            res.status(200).json({ message: 'Product successfully removed' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Error deleting product' });
        });
});

export default router;