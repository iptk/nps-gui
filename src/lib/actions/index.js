import fetchRequest from '../util/fetchRequest'

const FILTER_GLOBAL_CHANGE = 'FILTER_GLOBAL_CHANGE',
  FILTER_SINGLE_CHANGE = 'FILTER_SINGLE_CHANGE',
  RECEIVE_DATASET = 'RECEIVE_DATASET',
  START_LOADING = 'START_LOADING'

const fetchDataset = (filter) => {
  return (dispatch) => {
    dispatch({type: START_LOADING})
    return fetchRequest('/v2/datasets/filter', 'POST', filter)
      .then(response => console.log(response))
      //.then(response => response.json())
      //.then(json => dispatch({type: RECEIVE_DATASET, result: json}))
    dispatch({type: RECEIVE_DATASET, result: [{tmp: 'asdf'}, {tmp: 'dfs'}]})
  }
}

export {FILTER_GLOBAL_CHANGE, FILTER_SINGLE_CHANGE, RECEIVE_DATASET, fetchDataset}
