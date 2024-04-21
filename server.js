const express = require('express');
const app = express();
const port = 3000;

// Route for hello page
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello, welcome to your first API!' });
});

// Route for about page
app.get('/about', (req, res) => {
    res.json({ message: 'This is a simple API made with Express' });
});

// Route for image
const path = require('path');
app.get('/image', (req, res) => {
    const imagePath = path.join(__dirname, 'images', 'keypoints.jpg')
    res.sendFile(imagePath);
});

//Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});