const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {
    getAll: function (req, res) {
        Actor.find(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },

    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },

    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },

    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    // addMovie: function (req, res) {
    //     Actor.findOne({ _id: req.params.id }, function (err, actor) {
    //         if (err) return res.status(400).json(err);
    //         if (!actor) return res.status(404).json();

    //         Movie.findOne({ _id: req.body.id }, function (err, movie) {
    //             if (err) return res.status(400).json(err);
    //             if (!movie) return res.status(404).json();

    //             actor.movies.push(movie._id);
    //             actor.save(function (err) {
    //                 if (err) return res.status(500).json(err);

    //                 res.json(actor);
    //             });
    //         });
    //     });
    // },

    addMovie: function (req, res) {
        Actor.findOne({ name: req.params.name }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ title: req.params.title }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },

    removeAll: function(req,res){
        let actorID = new mongoose.Types.ObjectId(req.params.actorId);

        Actor.findById(actorID, 'movies', function(err, list){
            movieList = list.movies;
            for(i = 0; i <movieList.length; i++){
                let movieID = movieList[i];
                Movie.findOneAndRemove({ _id: movieID }, function (err) {
                    if (err) return res.status(400).json(err);
        
                    res.json();
                });
            }
            
        })
        
        Actor.findOneAndRemove({ _id: actorID }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });

    },

    deleteMovie: function(req,res){
        let movieID = new mongoose.Types.ObjectId(req.params.movieId);
        let actorID = new mongoose.Types.ObjectId(req.params.actorId);

        Movie.findOne({_id: movieID}, function(err,movie){
            if(err) return res.status(400).json(err);
            if(!movie) return res.status(404).json();

            Actor.findOne({_id: actorID}, function(err,actor){
                if(err) return res.status(400).json(err);
                if(!actor) return res.status(404).json();
                actor.movies.remove(movie._id);
                actor.save(function(err){
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            });
        });
    },

    deleteAllMovie: function(req,res){
        let actorID = new mongoose.Types.ObjectId(req.params.actorId);
        Actor.updateOne({ '_id': actorID }, { $set: { 'movies': [] } }, function (err, actor) {
            if(err) return res.status(400).json(err);
            if(!actor) return res.status(404).json();

            res.json(actor);
        });


    }
};