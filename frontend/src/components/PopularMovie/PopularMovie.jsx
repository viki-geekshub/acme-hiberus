import React from 'react';
import './PopularMovie.scss';
import { useHistory } from "react-router-dom";

const PopularMovie = ({popular}) => {
    const history = useHistory();
    const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
    const getDetails = (id) => { 
        history.push("/details/" + id)
        }
    return (
        <div className="popularMovieCard" onClick={getDetails.bind(this, popular.id)}>
            <span className="popularMovieName"><strong>{popular.original_title}</strong></span><br/>
            {
                popular.poster_path && <div><img src={`${baseImgUrl}${popular.poster_path}`} alt="" className="popularMovieImage" /><br/></div>
            }
            {
                !popular.poster_path && <div><span className="notAvailable">Image not available</span><br/></div>
            }     
            <span className="popularMovieDate">{popular.release_date}</span>
        </div>
    )
}

export default PopularMovie;
