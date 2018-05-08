import {Dataset} from '../api'

const FILTER_GLOBAL_CHANGE = 'FILTER_GLOBAL_CHANGE',
  FILTER_SINGLE_CHANGE = 'FILTER_SINGLE_CHANGE',
  RECEIVE_DATASET = 'RECEIVE_DATASET',
  START_LOADING = 'START_LOADING',
  FIELDS_CHANGE = 'FIELDS_CHANGE',
  COUNT_CHANGE = 'COUNT_CHANGE',
  START_CHANGE = 'START_CHANGE'

const fetchDataset = (filter) => {
  return (dispatch) => {
    dispatch({type: START_LOADING})
    var filters = []
    for(var f of filter.single){
      filters.push(filter.global.concat(f))
    }
    Dataset.search(filters, filter.fields, filter.start, filter.count)
      .then(res => dispatch({type: RECEIVE_DATASET, result: res}))

  }
}

export {FILTER_GLOBAL_CHANGE, FILTER_SINGLE_CHANGE, RECEIVE_DATASET, FIELDS_CHANGE, COUNT_CHANGE, START_CHANGE, fetchDataset}
