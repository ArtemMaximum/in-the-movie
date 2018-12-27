import { combineReducers } from 'redux'
import movies from './modules/movies/reducer'
import genres from './modules/genres/reducer'


export default combineReducers({
  movies,
  genres,
})
