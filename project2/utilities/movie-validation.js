const { z } = require('zod')

const movieSchema = z.object({
    title: z.string("Not a string!").trim().min(1, "Title is required"),
    director: z.string("Not a string!").trim().min(2, "Director name too short"),
    year: z.number("Not a number").int("Year must be an integer").min(1895, "Min value 1895").max(2050, "Max value 2050"),
    genres: z.array(z.string().trim().min(1)).max(3, "3 genres like max!"),
    rating: z.number("Not a number").min(0.1, "Rating must be greater than 0").max(10, "Max rating is 10"),
    durationMinutes: z.number("Not a number!").min(1, "Duration in minutos must be greater than 0").max(300, "Max duration is 300 minutes"),
    isOscarWinner: z.boolean("Not a boolean")
})

const idSchema = z.object({
    movie_id: z.string().regex(/^[0-9a-fA-F]{24}$/)
})

module.exports =  {movieSchema, 
                   movieUpdate: movieSchema.partial(), 
                   idSchema} 