const router = require('express').Router();
const MovieController = require('../controllers/MovieController');
const { authentication } = require('../middleware/authentication.js')

router.post('/rating', authentication, MovieController.insertRating);
router.put('/update', authentication, MovieController.updateRating);
router.get('/rating/info', authentication, MovieController.getRatingMovies);

module.exports = router