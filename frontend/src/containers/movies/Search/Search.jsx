import React, { useEffect } from 'react'
import {connect} from 'react-redux';
import './Search.scss';
import PopularMovie from '../../../components/PopularMovie/PopularMovie';
import { searchByQuery } from '../../../redux/actions/movies';

const Search = (props) => {
    const search = props.match.params.search;
    useEffect(() => { 
        searchByQuery(search)
    }, [props.match.params])
    console.log(props)
    return (        
            <div className="moviesFoundContainer">
                {props.matchings?.results.map(popular => 
                <PopularMovie popular={popular}/>)}
            </div>
    )
}
const mapStateToProps = (state) => ({ matchings: state.movie.matchings}) 
export default connect(mapStateToProps)(Search)