import {MetaDataset} from '../api'

const FILTER_GLOBAL_CHANGE = 'FILTER_GLOBAL_CHANGE',
  START_LOADING = 'START_LOADING'

const fetchDataset = (id) => {
  return (dispatch) => {
    dispatch({type: START_LOADING})
    Dataset.getByID()
      .then(ds => dispatch({type: RECEIVE_DATASET, result: ds}))

  }
}

export {fetchDataset}
