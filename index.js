const express = require('express');
const app = express();
const port = 3000;

//Midleware to handle some of the incoming request
// const bodyParser = require('body-parser');
//somehow using this cannot run on my machine

//Dummy data for books, authors, users
let books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' },
];

let authors = [
    { id: 1, author: 'Author 1' },
    { id: 2, author: 'Author 2' },
    { id: 3, author: 'Author 3' },
];

let users = [
    { id: 1, username: 'user1', email: 'user1@gmail.com' },
    { id: 2, username: 'user2', email: 'user2@gmail.com' },
    { id: 3, username: 'user3', email: 'user3@gmail.com' },
];

//If you are using body-parser, need to use this code
// app.use(bodyParser.json());
app.use(express.json());

//Books API 
//Get all the books 
app.get('/books', (req, res) => {
    res.json(books);
});

//Get specific book by ID 
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id == parseInt(req.params.id));

    if (!book) return res.status(404).json({ error: 'Book not found' });

    res.json(book);
});

//Add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    const book = { id: books.length + 1, title, author };
    books.push(book);
    res.status(201).json(book);
});

// Update a book
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const index = books.findIndex(book => book.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    books[index] = { id: parseInt(id), title, author };
    res.json(books[index]);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const index = books.findIndex(book => book.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const deletedBook = books.splice(index, 1)[0];
    res.json(deletedBook);
});

//Authors API
//Get all the authors 
app.get('/authors', (req, res) => {
    res.json(authors);
});

//Get specific authors by ID 
app.get('/authors/:id', (req, res) => {
    const author = authors.find(a => a.id == parseInt(req.params.id));

    if (!author) {
        return res.status(404).json({ error: 'Author not found' });
    }

    res.json(author);
});

//Add a new author
app.post('/authors', (req, res) => {
    const { name } = req.body;
    const author = { id: authors.length + 1, name };
    authors.push(author);
    res.status(201).json(author);
});

//Users API
//Get all the users
app.get('/users', (req, res) => {
    res.json(users);
});

//Get specific users by ID 
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

//Add a new author
app.post('/users', (req, res) => {
    const { username, email } = req.body;
    const user = { id: users.length + 1, username, email };
    users.push(user);
    res.status(201).json(user);
});

//Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// GET:
// curl http://localhost:3000/books

// GET books by id:
// curl http://localhost:3000/books/{id}

// POST:
// curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d "{\"title\":\"Book 1 Title\",\"author\":\"Author 1 name\"}"

// PUT:
// curl -X PUT http://localhost:3000/books/{id} -H "Content-Type: application/json" -d "{\"title\":\"Updated Book 1 Title\"}"

// DELETE:
// curl -X DELETE http://localhost:3000/books/{id}