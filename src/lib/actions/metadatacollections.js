import {MetadataCollection} from '../api'
import {G_START_LOADING, G_STOP_LOADING} from './_common'

const RECEIVE_DATASET = 'RECEIVE_DATASET'

const fetchCollections = (id) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    MetadataCollection
      .fetchAll()
      .then(res => {
        dispatch({type: RECEIVE_DATASET, result: res})
        dispatch({type: G_STOP_LOADING})
      })

  }
}

export {
  fetchCollections,
  RECEIVE_DATASET
}
