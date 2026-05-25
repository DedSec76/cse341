const { ObjectId } = require('mongodb');
const Movie = require('../models/movies');
const mongoose = require('mongoose');

const controller = {}

controller.getAllMovies = async (req, res) => {
    try {
        const result = await Movie.find();

        if(!result) {
            return res.status(404).json({
                success: false,
                message: 'Movies not found'
            })
        }

        return res.status(200).json({
            success: true,
            moviesFounded: result.length,
            movies: result
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

controller.getMovie = async (req, res) => {
    const movieId = req.params.movie_id

    if(!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Object ID'
        })
    }

    try {
        const result = await Movie.findById(movieId)

        if(!result) {
            return res.status(404).json({
                success: false,
                message: `Data with ID = ${movieId} not found`
            })
        }

        return res.status(200).json({
            success: true,
            data: result
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Server error!'
        })
    }
}

controller.createMovie = async (req, res) => {
    try {

        if(!req.body.title.trim() || !req.body.year || !req.body.rating || !req.body.durationMinutes ) {
            return res.status(400).json({
                success: false,
                message: 'Title, year, rating and durationMinutes are required'
            })
        }

        const result = await Movie.create(req.body);

        return res.status(201).json({
            success: true,
            id: result._id,
            message: `Movie Created successfully`
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message | 'Internal Error'
        })
    }
}

controller.updateMovie = async (req, res) => {
    const movieId = req.params.movie_id

    if(!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({
            success: false,
            message: `Movie ID=${movieId} is invalid`
        })
    }

    try {
        const result = await Movie.findByIdAndUpdate(movieId, { $set: req.body }, { returnDocument: 'after' });

        if(!result) {
            return res.status(404).json({
                success: false,
                message: `The movie with ID=${movieId} was not found`
            })
        }

        return res.status(200).json({
            success: true,
            message: `The movie with ID=${movieId} was updated`
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message | 'Server Error'
        })
    }
}

controller.deleteMovie = async (req, res) => {
    const movieId = req.params.movie_id;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({
            success: false,
            message: `Movid ID=${movieId} is invalid`
        })
    }
    
    try {
        const result = await Movie.findByIdAndDelete(movieId)

        if(!result) {
            return res.status(400).json({
                success: false,
                message: `No data for Movie was found.`
            })
        }

        return res.status(200).json({
            success: true,
            message: `Movie data with ID=${movieId} was deleted succesfully`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message | 'Server Error'
        })
    }
}
module.exports = controller