const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];

//Endpoint to register new user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    //Check if username already exist
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //10 is number of hashing round algorithm gonna be used. recs 10-12

    //Save the user in the 'users array'
    users.push({ username, password: hashedPassword });

    //Respond with success  message
    res.status(201).json({ message: 'User registered successfully' });
});

//Log in
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(user => user.username == username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Logged in successfully' });
});

//Endpoint to log out
app.delete('/logout', (req, res) => {
    //Logout logic would go here
    res.status(200).json({ message: 'Logged out successfully' });
});

//Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});