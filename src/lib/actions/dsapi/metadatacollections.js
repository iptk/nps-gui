import {MetadataCollection} from '../../api/dsapi'
import {G_START_LOADING, G_STOP_LOADING} from '../_common'
import {NotificationLevel, notifyUser} from '../../util/notification'

const RECEIVE_DATASET = 'RECEIVE_DATASET'

const fetchCollections = (id) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    MetadataCollection
      .fetchAll()
      .then(res => {
        dispatch({type: RECEIVE_DATASET, result: res})
      })
      .catch(err => {
        /*notifyUser(dispatch, {
          message: "metadatacollections.fetch",
          level: NotificationLevel.ERROR
        })*/
      })
      .finally(() => {
        dispatch({type: G_STOP_LOADING})
      })

  }
}

export {
  fetchCollections,
  RECEIVE_DATASET
}
