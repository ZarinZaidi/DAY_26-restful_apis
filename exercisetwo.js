const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

let products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 }
];

// Route for hello/welcome page
app.get('/', (req, res) => {
    res.json({ message: 'Hello, welcome to Exercise 2 submission page. Task given is to:', first: 'Create an API and use GET and POST method.', second: 'Create /products and use if else condition also to show some result.' });
});

// Route for GET /products
app.get('/products', (req, res) => {
    res.json(products);
});

// Route for POST /products
app.post('/products', (req, res) => {
    const { name, price } = req.body;

    //Check if product details are valid
    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required.' });
    }

    //Creating new products to be added
    const newProduct = {
        id: products.length + 1,
        name,
        price
    };

    //Save the new product in the 'products array'
    products.push(newProduct);

    //Respond for success
    res.status(201).json(newProduct);
});

//Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});