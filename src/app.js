import express, { urlencoded } from 'express';
import path from 'path';
import { __dirname } from './utils.js';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js';
import handlebars from 'express-handlebars';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', productsRouter, cartsRouter);
app.use('/views', viewsRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error deconocido 🎃: ${error.message}`
    console.error(message);
    res.status(500).json({ message }); 
})

export default app;





