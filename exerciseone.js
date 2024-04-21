const express = require('express');
const app = express();
const port = 3000;

// Route for hello/welcome page
app.get('/', (req, res) => {
    res.json({ message: 'Hello, welcome to Exercise 1 submission page. Please use the following /keywords:', task: 'to access the information about the exercise', about: 'information of this API', image1: 'to access the first image', image2: 'to access the second image' });
});

// Route for task information page
app.get('/task', (req, res) => {
    res.json({ message: 'Task given is to:', first: 'Make an API', second: 'Put some data inside it up to 5', third: 'Include a route with an image' });
});

// Route for about page
app.get('/about', (req, res) => {
    res.json({ message: 'This is a simple API made with Express' });
});

// Route for image1
const path = require('path');
app.get('/image1', (req, res) => {
    const imagePath = path.join(__dirname, 'images', 'http.jpg')
    res.sendFile(imagePath);
});

// Route for image2
app.get('/image2', (req, res) => {
    const imagePath = path.join(__dirname, 'images', 'pic1.jpg')
    res.sendFile(imagePath);
});

//Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});