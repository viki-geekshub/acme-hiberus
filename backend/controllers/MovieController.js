const { User, Movie } = require('../models/index.js')

const MovieController = {
    getRatingMovies(req,res){ 
        Movie.findAll({
            where: {
                userId: req.user.id
            }
        })
        .then(ratings=>res.status(200).send(ratings)) 
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'An error has occurred while trying to process the request.', error})
        })
    },
    async insertRating(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.user.id
                }
            })
            if (!user) {
                return res.status(400).send({
                    message: 'You must be logged in to rate this movie.'
                })
            }
            const movie = await Movie.create({
                movieId: req.body.movieId,
                userId: req.user.id,
                rating: req.body.rating
            });
            res.status(201).send({
                movie,
                message: 'Rating saved successfully.'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'There was a problem trying to save your rating.'
            });
        }
    },
    async updateRating(req, res) { 
        try{
            const user = await User.findOne({
                where: {
                    id: req.user.id
                }
            })
            if (!user) {
                return res.status(400).send({
                    message: 'You must be logged in to rate this movie.'
                })
            }
            const updatedRate = await Movie.update({
                rating: req.body.value
            }, 
                {
                    where: {
                        movieId: req.body.ratedMovieId 
                    }
                }) 
            res.send({
                updatedRate,
                message: 'The rating has been updated.'
            });
        } catch{(error=> {
                    console.log(error);
                     res.status(500).send({
                        message: 'There was a problem trying to save your rating.'
                    })
                })          
        }
    }
}
module.exports = MovieController;