import {combineReducers} from 'redux'

import {
  FILTER_GLOBAL_CHANGE,
  FILTER_SINGLE_CHANGE,
  RECEIVE_DATASET,
  FIELDS_CHANGE,
  START_CHANGE,
  COUNT_CHANGE,
  RECOGNIZE_IDS
} from '../actions/searchdataset'

const initFilter = {
  single: [],
  global: [],
  fields: [],
  recognizedIDs: [],
  count: 10,
  start: 0,
  end: 0,
  total: 0
}
const filterReducer = (state = initFilter, action) => {
  switch(action.type){
    case FILTER_SINGLE_CHANGE:
      var filter = action.filter.split('\n')
      filter = filter.filter(line => line.length > 0)
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
        global: action.filter.split(' ').filter(f => f !== '')
      }

    case FIELDS_CHANGE:
      return {
        ...state,
        fields: action.fields
      }

    case COUNT_CHANGE:
      return {
        ...state,
        count: Number(action.count)
      }

    case START_CHANGE:
      var start = Number(state.start) + Number(action.forward ?state.count :-state.count)
      if(start < 0){
        start = 0
      }
      return {
        ...state,
        start: start
      }

    case RECOGNIZE_IDS:
      return {
        ...state,
        recognizedIDs: action.ids
      }

    case RECEIVE_DATASET:
      return {
        ...state,
        start: action.result.range.start,
        end: action.result.range.end,
        total: action.result.range.max
      }

    default:
      return state
  }
}

const datasetReducer = (state = [], action) => {
  switch(action.type){
    case RECEIVE_DATASET:
      return action.result.datasets

    default:
      return state
  }
}

export default combineReducers({
  filter: filterReducer,
  dataset: datasetReducer
})
