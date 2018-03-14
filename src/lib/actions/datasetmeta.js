import {Dataset} from '../api'

const RECEIVE_DATASET = 'RECEIVE_DATASET',
  START_LOADING = 'START_LOADING',
  TAGS_SAVED = 'TAGS_SAVED',
  TAGS_SAVED_SNACKBAR_TIMEOUT = 'TAGS_SAVED_SNACKBAR_TIMEOUT'

const fetchMetadata = (id) => {
  return (dispatch) => {
    dispatch({type: START_LOADING})
    Dataset.getByID(id)
      .then(ds => dispatch({type: RECEIVE_DATASET, result: ds}))

  }
}

const saveTags = (dataset, tags) => {
  return (dispatch) => {
    dataset.tags = tags
    dataset
      .save()
      .then(ds => dispatch({type: TAGS_SAVED, dataset: ds}))
  }
}

export {
  fetchMetadata,
  saveTags,
  START_LOADING,
  RECEIVE_DATASET,
  TAGS_SAVED,
  TAGS_SAVED_SNACKBAR_TIMEOUT
}
