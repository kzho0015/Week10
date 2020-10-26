const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const path = require('path');

const app = express();
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "dist/w10")));

mongoose.connect('mongodb://localhost:27017/movies',{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
app.get('/', (req,res) =>{
    res.send('Week 7 lab');
});

//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);

//app.post('/actors/:id/movies', actors.addMovie);
app.put('/actors/:name/:title', actors.addMovie);

app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:actorId/all', actors.removeAll);
app.delete('/actors/:actorId/:movieId/delMovie', actors.deleteMovie);
app.put('/actors/:actorId/delAllMovie', actors.deleteAllMovie);

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/:movieId/:actorId/delActor', movies.deleteActor);
// app.put('/movies/:movieId/:actorId/addActor', movies.addActor);
app.put('/movies/:title/:name', movies.addActor);
app.get('/movies/:y1/:y2', movies.getAllYear);
app.delete('/movies', movies.delYear);