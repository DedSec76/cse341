const router = require('express').Router()
const controller = require('../controllers/movieController')
const { handleErrors, validation } = require('../utilities/')
const { movieSchema, movieUpdate, idSchema } = require('../utilities/movie-validation')

/** 
 * @swagger
 * /movies/:
 *   get:
 *     summary: Get all movies data
 *     tags:
 *       - Movies
 *     responses:
 *       200:
 *         description: All data get expense
 *       400:
 *         description: Bad request
 *       404:
 *         description: Data not found
 *       500:
 *         description: Server Error
*/
router.get('/', handleErrors(controller.getAllMovies))

/** 
 * @swagger
 * /movies/{movie_id}:
 *   get:
 *     summary: Get a movie data by movie_id
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema: 
 *           type: string
 *         description: The movie ID must be Mongo Object ID 
 *     responses:
 *       200:
 *         description: All data get expense
 *       400:
 *         description: Bad request
 *       404:
 *         description: Data not found
 *       500:
 *         description: Server Error
*/
router.get('/:movie_id', validation(idSchema), handleErrors(controller.getMovie))

/** 
 * @swagger
 * /movies/create:
 *   post:
 *     summary: Create a new movie data
 *     tags:
 *       - Movies
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               director:
 *                 type: string
 *               year:
 *                 type: number
 *               genres:
 *                 type: array
 *               rating:
 *                   type: number
 *               durationMinutes:
 *                  type: number
 *               isOscarWinner:
 *                  type: boolean
 *                  example: false
 *     responses:
 *       201:
 *         description: Movie data created successfully
 *       500:
 *         description: Format incorrect
*/
router.post('/create', validation(movieSchema), handleErrors(controller.createMovie))

/** 
 * @swagger
 * /movies/{movie_id}:
 *   patch:
 *     summary: Update a movie by movie_id
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID must be Mongo Object ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *     responses:
 *       200:
 *         description: Movie data updated successfully
 *       404:
 *         description: Movie Data not found
*/
router.patch('/:movie_id', validation(movieUpdate), handleErrors(controller.updateMovie))

/** 
 * @swagger
 * /movies/{movie_id}:
 *   delete:
 *     summary: Delete a movie by movie_id
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID must be Mongo Object ID
 *     responses:
 *       200:
 *         description: Data deleted successfully
 *       404:
 *         description: Movie Data not found
 *       500:
 *         description: Error Internal
*/
router.delete('/:movie_id', validation(idSchema), handleErrors(controller.deleteMovie))


module.exports = router;