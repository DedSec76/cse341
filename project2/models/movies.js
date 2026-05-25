const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    title: { 
        type: String,
        trim: true,
        required: [true, 'Title is required']
    },
    director: {  
        type: String,
        trim: true
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    },
    genres: {
        type: [String],
        validate: {
            validator: (val) => {
                return val.length <= 3;
            },
            message: 'Array cannot has more than 3 elements'
        }
    },
    rating: {
        type: Number,
        required: [true, 'rating is required']
    },
    durationMinutes: {
        type: Number,
        required: [true, 'durationMinutes is required']
    },
    isOscarWinner: {
        type: Boolean,
        default: false
    }
})

const Movie = model('Movie', movieSchema);

module.exports = Movie;