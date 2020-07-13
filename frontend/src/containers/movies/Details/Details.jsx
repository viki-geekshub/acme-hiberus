import React, { useEffect, Fragment, useState } from 'react'
import {connect} from 'react-redux';
import './Details.scss';
import { Rate } from 'antd';
import { notification } from 'antd';
import { getDetailsMovie, getRatingMovies, insertRating, cleanUp } from '../../../redux/actions/movies';
const Details = (props) => {
    console.log(props)
const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
const id = props.match.params.id;
const [rate, setRate] = useState(0);
    useEffect(() => { 
        getDetailsMovie(id)
        getRatingMovies()
        .then(res=> {
               res.find(rating=> rating.movieId == id) ? setRate(res.find(rating=> rating.movieId == id).rating) : setRate()
        })
        .catch(console.error)
        return () => {
            cleanUp()
        };
    }, [])
    const handleChange = value => {
        const ratingMovie = 
            {
                "movieId": props.details.id,
                "rating": value
            };
        const ratedMovie = props.ratings.find(rating=> rating.movieId === props.details.id);
        
        !ratedMovie ?
            insertRating(ratingMovie)
            .then(res => {
                setRate(ratingMovie.rating)
                notification.success({ message: 'Rating', description: 'Rating saved successfully.',duration:2000})
                getRatingMovies()
            })
            .catch(error=>{
                console.log(error);
                notification.success({message: 'An error has occurred while trying to process the request.', error})
            }) : 
            notification.success({ message: 'Rating', description: 'You cannot change the rating of the movie..',duration:2000})

            // updateRating(ratedMovie.id, value)
            // .then(res => {
            //     setRate(ratingMovie.rating)
            //     notification.success({ message: 'Rating', description: 'The rating has been updated.',duration:2000})
            //     getRatingMovies()    
            // }) 
            // .catch(error=>{
            //     console.log(error);
            //     notification.success({message: 'An error has occurred while trying to process the request.', error})
            // })
    }    
    return (
        <Fragment>  
            { 
            props.details && 
                <div className="popularDetailsMovieCard">
                    <div className="image">
                        {
                            props.details.poster_path && <div><img src={`${baseImgUrl}${props.details.poster_path}`} alt="" className="movieImage" /><br/></div>
                        }
                        {
                            !props.details.poster_path && <div><span className="notAvailable">Image not available</span><br/></div>
                        }
                    </div>
                    <div className="details">
                        <span className="movieName"><strong>Original Title: </strong>{props.details.original_title}</span>
                        {rate !== 0 && <Rate allowHalf value={rate} onChange={handleChange} className="movieRating" />}
                        <br/>
                        <span className="movieDate"><strong>Release date: </strong>{props.details.release_date}</span>
                        <br/>
                        <span className="movieOverview"><strong>Sinopsis: </strong>{props.details.overview}</span>
                        <br/>
                    </div>
                </div>     
            }
        </Fragment> 
    )
}
const mapStateToProps = (state) => ({ details: state.movie.details, ratings: state.movie.ratings}) 
export default connect(mapStateToProps)(Details)
