var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');

module.exports = {

    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);

            res.json(movies);
        });
    },

    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },

    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },

    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },

    deleteActor: function(req,res){
        let movieID = new mongoose.Types.ObjectId(req.params.movieId);
        let actorID = new mongoose.Types.ObjectId(req.params.actorId);

        Movie.findOne({_id: movieID}, function(err,movie){
            if(err) return res.params.status(400).json(err);
            if(!movie) return res.status(404).json();
            Actor.findOne({_id: actorID}, function(err,actor){
                if(err) return res.status(400).json();
                if(!actor) return res.status(404).json();

                movie.actors.remove(actor._id);
                movie.save(function(err){
                    if(err) return res.status(500).json(err);
                    res.json(movie);
                });
            });
        });
    },

    // addActor: function(req,res){
    //     let movieID = new mongoose.Types.ObjectId(req.params.movieId);
    //     let actorID = new mongoose.Types.ObjectId(req.params.actorId);

    //     Movie.findOne({_id: movieID}, function (err,movie){
    //         if (err) return res.status(400).json(err);
    //         if(!movie) return res.status(404).json();

    //         Actor.findOne({_id: actorID}, function(err, actor){
    //             if (err) return res.status(400).json(err);
    //             if(!actor) return res.status(404).json();

    //             movie.actors.push(actor._id);
    //             movie.save(function (err){
    //                 if(err) return res.status(500).json(err);
    //                 res.json(movie);
    //             });
    //         });
    //     });
    // },
    addActor: function(req, res){
        Movie.findOne({ title : req.params.title }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ name : req.params.name }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
 
                movie.actors.push(actor._id);
                movie.save(function (err){
                    if(err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    getAllYear: function(req,res){
        let y1 = req.params.y1;
        let y2 = req.params.y2;

        Movie.where('year').gte(y2).where('year').lte(y1).populate('actors').exec(function(err,movie){
            if(err) return res.status(400).json(err);
            if(!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    delYear: function(req,res){
        let y1 = req.body.y1;
        let y2 = req.body.y2;

        Movie.where('year').gte(y2).where('year').lte(y1).exec(function(err,movie){
            if(err) return res.status(400).json(err);
            if(!movie) return res.status(404).json();

            let movieList = [];
            for(i = 0; i < movie.length; i++) {
              
                mID = movie[i]._id;
                movieList.push(mID); 
            }
            //console.log(movieList);
            for (i = 0; i < movieList.length; i ++){
                let rID = movieList[i];
                Movie.findOneAndRemove({_id: rID}, function(err){
                    if(err) return res.status(400).json(err);
                    res.json();
                });
            }

        });
    }
};