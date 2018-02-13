import {Dataset} from '../api'

const FILTER_GLOBAL_CHANGE = 'FILTER_GLOBAL_CHANGE',
  FILTER_SINGLE_CHANGE = 'FILTER_SINGLE_CHANGE',
  RECEIVE_DATASET = 'RECEIVE_DATASET',
  START_LOADING = 'START_LOADING'

const fetchDataset = (filter) => {
  return (dispatch) => {
    dispatch({type: START_LOADING})
    var filters = []
    for(var f of filter.single){
      filters.push(filter.global.concat(f))
    }
    dispatch({type: RECEIVE_DATASET, result: Dataset.search(filters)})
  }
}

export {FILTER_GLOBAL_CHANGE, FILTER_SINGLE_CHANGE, RECEIVE_DATASET, fetchDataset}
