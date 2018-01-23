import {combineReducers} from 'redux'

import {
  START_LOADING,
  FILTER_GLOBAL_CHANGE,
  FILTER_SINGLE_CHANGE,
  RECEIVE_DATASET
} from '../actions/index'

const filterReducer = (state = {}, action) => {
  switch(action.type){
    case FILTER_SINGLE_CHANGE:
      return {
        ...state,
        single: action.filter
      }

    case FILTER_GLOBAL_CHANGE:
      return {
        ...state,
        global: action.filter
      }

    default:
      return state
  }
}

const loaderReducer = (state = false, action) => {
  switch(action.type){
    case START_LOADING:
      return true

    case RECEIVE_DATASET:
      return false

    default:
      return state
  }
}

const datasetReducer = (state = [], action) => {
  switch(action.type){
    case RECEIVE_DATASET:
      return action.result

    default:
      return state
  }
}

export default combineReducers({
  filter: filterReducer,
  loading: loaderReducer,
  dataset: datasetReducer
})
