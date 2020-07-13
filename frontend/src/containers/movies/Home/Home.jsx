import React, { useEffect } from 'react'
import {connect} from 'react-redux';
import './Home.scss';
import { getPopularMovies } from '../../../redux/actions/movies';
import PopularMovie from '../../../components/PopularMovie/PopularMovie';

const Home = (props) => {
    useEffect(() => { 
        getPopularMovies()
    }, [])
    return (        
            <div className="popularMoviesContainer">
                {props.populars?.map(popular => 
                <PopularMovie popular={popular} key={popular.id}/>)} 
            </div>
    )
}
const mapStateToProps = (state) => ({ populars: state.movie.populars}) 
export default connect(mapStateToProps)(Home)