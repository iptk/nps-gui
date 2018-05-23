import {MetadataCollection} from '../api'
import {START_LOADING, STOP_LOADING} from './_common'

const RECEIVE_DATASET = 'RECEIVE_DATASET'

const fetchCollections = (id) => {
  return (dispatch) => {
    dispatch({type: START_LOADING})
    MetadataCollection
      .fetchAll()
      .then(res => {
        dispatch({type: RECEIVE_DATASET, result: res})
        dispatch({type: STOP_LOADING})
      })

  }
}

export {
  fetchCollections,
  RECEIVE_DATASET
}
