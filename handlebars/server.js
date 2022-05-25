const express = require('express');
const { engine } = require("express-handlebars");
const app = express();

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views','./views');
app.set('view engine','hbs');

// Inicializacion de lista de productos
const Container = require('../app');
const Productos = new Container();

/*Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.
Ambas páginas contarán con un botón que redirija a la otra.
 */
app.get('/productos', (req, res) => {
    const products = Productos.getProducts();
    res.render('./products', { products });
});

/*Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).
 */
app.get('/', (req, res) => {
    res.render('form');
})

app.post('/productos', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    Productos.addProduct(req.body);
    res.redirect('/');
});

app.listen(8080, () => {
  console.log('Escuchando!');
});

