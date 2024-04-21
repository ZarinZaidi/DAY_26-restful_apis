const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

//Dummy data for movies, directors, actors
let movies = [
    { id: 1, title: 'Harry Potter (2001)', director: 'Chris Columbus' },
    { id: 2, title: 'Twenty-Five Twenty-One', director: 'Jung Ji-hyun' },
    { id: 3, title: 'Kuch Kuch Hota Hai', director: 'Karan Johar' },
];

let directors = [
    { id: 1, name: 'Karan Johar' },
    { id: 2, name: 'Jung Ji-hyun' },
    { id: 3, name: 'Joseph Kosinski' },
];

let actors = [
    { id: 1, name: 'Gong Hyo Jin' },
    { id: 2, name: 'Louis Partridge' },
    { id: 3, name: 'Chutimon Chuengcharoensukying (Aokbab)' },
];

//Movies API 
//Get all the movies 
app.get('/movies', (req, res) => {
    res.json(movies);
});

//Get specific movie by ID 
app.get('/movies/:id', (req, res) => {
    const movie = movies.find(b => b.id == parseInt(req.params.id));

    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    res.json(movie);
});

//Add a new movie
app.post('/movies', (req, res) => {
    const { title, director } = req.body;
    const movie = { id: movies.length + 1, title, director };
    movies.push(movie);
    res.status(201).json(movie);
});

// Update a movie
app.put('/movies/:id', (req, res) => {
    const { id } = req.params;
    const { title, director } = req.body;
    const index = movies.findIndex(movie => movie.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    movies[index] = { id: parseInt(id), title, director };
    res.json(movies[index]);
});

// Delete a movie
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    const index = movies.findIndex(movie => movie.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    const deletedMovie = movies.splice(index, 1)[0];
    res.json(deletedMovie);
});

//Directors API
//Get all the directors 
app.get('/directors', (req, res) => {
    res.json(directors);
});

//Get specific directors by ID 
app.get('/directors/:id', (req, res) => {
    const director = directors.find(a => a.id == parseInt(req.params.id));

    if (!director) {
        return res.status(404).json({ error: 'Director not found' });
    }

    res.json(director);
});

//Add a new director
app.post('/directors', (req, res) => {
    const { name } = req.body;
    const director = { id: directors.length + 1, name };
    directors.push(director);
    res.status(201).json(director);
});

// Update a director
app.put('/directors/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const index = directors.findIndex(director => director.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Director not found' });
    }
    directors[index] = { id: parseInt(id), name };
    res.json(directors[index]);
});

// Delete a director
app.delete('/directors/:id', (req, res) => {
    const { id } = req.params;
    const index = directors.findIndex(director => director.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Director not found' });
    }
    const deletedDirector = directors.splice(index, 1)[0];
    res.json(deletedDirector);
});

//Actors API
//Get all the actors
app.get('/actors', (req, res) => {
    res.json(actors);
});

//Get specific actors by ID 
app.get('/actors/:id', (req, res) => {
    const actor = actors.find(u => u.id == parseInt(req.params.id));

    if (!actor) {
        return res.status(404).json({ error: 'Actor not found' });
    }

    res.json(actor);
});

//Add a new actor
app.post('/actors', (req, res) => {
    const { name } = req.body;
    const actor = { id: actors.length + 1, name };
    actors.push(actor);
    res.status(201).json(actor);
});

// Update an actor
app.put('/actors/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const index = actors.findIndex(actor => actor.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Actor not found' });
    }
    actors[index] = { id: parseInt(id), name };
    res.json(actors[index]);
});

// Delete an actor
app.delete('/actors/:id', (req, res) => {
    const { id } = req.params;
    const index = actors.findIndex(actor => actor.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Actor not found' });
    }
    const deletedActor = actors.splice(index, 1)[0];
    res.json(deletedActor);
});

//Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

/*Movies API
GET:
curl http://localhost:3000/movies
curl http://localhost:3000/movies/{id}

POST:
curl -X POST http://localhost:3000/movies -H "Content-Type: application/json" -d "{\"title\":\"New Movies\",\"director\":\"Director Name\"}"

PUT:
curl -X PUT http://localhost:3000/movies/{id} -H "Content-Type: application/json" -d "{\"title\":\"Updated Movie Title\"}"

DELETE:
curl -X DELETE http://localhost:3000/movies/{id}
*/

/*Directors API
GET:
curl http://localhost:3000/directors
curl http://localhost:3000/directors/{id}

POST:
curl -X POST http://localhost:3000/directors -H "Content-Type: application/json" -d "{\"name\":\"New Director\"}"

PUT:
curl -X PUT http://localhost:3000/directors/{id} -H "Content-Type: application/json" -d "{\"name\":\"Updated Director Name\"}"

DELETE:
curl -X DELETE http://localhost:3000/directors/{id}
*/

/*Actors API
GET:
curl http://localhost:3000/actors
curl http://localhost:3000/actors/{id}

POST:
curl -X POST http://localhost:3000/actors -H "Content-Type: application/json" -d "{\"name\":\"New Actor\"}"

PUT:
curl -X PUT http://localhost:3000/actors/{id} -H "Content-Type: application/json" -d "{\"name\":\"Updated Actor Name\"}"

DELETE:
curl -X DELETE http://localhost:3000/actors/{id}
*/