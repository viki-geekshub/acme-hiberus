import axios from 'axios';
import store from '../store';
import { API_URL } from '../../api-config';

export const getPopularMovies = async(page = 1) => {
    try {
        const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&page=' + page, {
            
        });
        store.dispatch({
            type: 'GET_POPULAR_MOVIES',
            payload: res.data.results
        })
        return res;
    } catch (error) {
        console.error(error)
    }
}
export const getDetailsMovie = async (id) => {
    try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/` + id + `?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`, {
            
        });
        store.dispatch({
            type: 'GET_DETAILS_MOVIE',
            payload: res.data
        })
        return res;
    } catch (error) {
        console.error(error)
    }
} 
export const searchByQuery = async (search, page) => {
    try{
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query=${search}&page=${page}`, {
            
        });
        store.dispatch({
            type: 'GET_MATCHING_MOVIES',
            payload: res.data
        })
        return res;

    } catch (error) {
        console.error(error)
    }
}
export const getRatingMovies = async() => {
    try {
        const res = await axios.get(API_URL + 'movies/rating/info', {
            headers: {
                Authorization: localStorage.getItem('authToken')
            }
        });
        store.dispatch({
            type: 'GET_RATING_MOVIES',
            payload: res.data
        })
        return res.data;
    } catch (error) {
        console.error(error)
    }
}
export const insertRating = async (ratingMovie) => {
    try {
        const res = await axios.post(API_URL + 'movies/rating/', ratingMovie, {
            headers: {
                Authorization: localStorage.getItem('authToken')
            }
        });
        store.dispatch({
            type: 'POST_RATING_MOVIES',
            payload: res.data
        })
        return res.data;
    } catch (error) {
        console.error(error)
    }
}
export const updateRating = async (ratedMovieId, value) => {
    try {
        const res = await axios.put(API_URL + 'movies/update/', {ratedMovieId, value}, {
            headers: {
                Authorization: localStorage.getItem('authToken')
            }
        });
        console.log(ratedMovieId)  
        store.dispatch({
            type: 'PUT_UPDATED_RATING',
            payload: res.data.movie
        })
        return res.data;
    } catch (error) {
        console.error(error)
    }
}
export const cleanUp = () => {
    store.dispatch({
        type: 'CLEAN_RATINGS',
        payload: []
    })
}