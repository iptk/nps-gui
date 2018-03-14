import {MetadataCollection} from '../api'

const RECEIVE_DATASET = 'RECEIVE_DATASET'

const fetchCollections = (id) => {
  return (dispatch) => {
    MetadataCollection
      .fetchAll()
      .then(res => dispatch({type: RECEIVE_DATASET, result: res}))

  }
}

export {
  fetchCollections,
  RECEIVE_DATASET
}
