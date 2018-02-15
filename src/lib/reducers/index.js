import {combineReducers} from 'redux'

import {
  START_LOADING,
  FILTER_GLOBAL_CHANGE,
  FILTER_SINGLE_CHANGE,
  RECEIVE_DATASET
} from '../actions/index'

const initFilter = {
  single: [],
  global: []
}
const filterReducer = (state = initFilter, action) => {
  switch(action.type){
    case FILTER_SINGLE_CHANGE:
      var filter = action.filter.split('\n')
      filter.forEach(
        // cut trailing and leading whitespaces, shrink multiple ws to single
        (o,i,a) => a[i] = o.trim().replace(/ +(?= )/g,'').split(' ')
      )
      return {
        ...state,
        single: filter
      }

    case FILTER_GLOBAL_CHANGE:
      return {
        ...state,
        global: action.filter.split(' ')
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
      var datasets = []
      for(var res of action.result){
        datasets = [
          ...datasets,
          ...res.datasets.map((item, index) => item.dataset)
        ]
      }
      return datasets

    default:
      return state
  }
}

export default combineReducers({
  filter: filterReducer,
  loading: loaderReducer,
  dataset: datasetReducer
})
