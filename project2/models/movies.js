const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    title: String,
    director: String,
    year: Number,
    genres: {
        type: [String],
        validate: {
            validator: (val) => {
                return val.length <= 3;
            },
            message: 'Array cannot has more than 3 elements'
        }
    },
    rating: Number,
    durationMinutes: Number,
    isOscarWinner: Boolean
})

const Movie = model('Movie', movieSchema);

module.exports = Movie;