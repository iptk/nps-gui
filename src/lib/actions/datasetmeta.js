import {Dataset} from '../api'

const RECEIVE_DATASET = 'RECEIVE_DATASET',
  START_LOADING = 'START_LOADING',
  TAGS_ADDEMPTY = 'TAGS_ADDEMPTY',
  TAGS_UPDATETMP = 'TAGS_UPDATETMP'

const fetchMetadata = (id) => {
  return (dispatch) => {
    dispatch({type: START_LOADING})
    Dataset.getByID(id)
      .then(ds => dispatch({type: RECEIVE_DATASET, result: ds}))

  }
}

export {fetchMetadata, START_LOADING, RECEIVE_DATASET, TAGS_ADDEMPTY, TAGS_UPDATETMP}
