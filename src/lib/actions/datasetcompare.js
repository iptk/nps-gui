import {Dataset} from '../api'
import {G_START_LOADING, G_STOP_LOADING, G_NOTIFICATION_ADD} from './_common'
import {NotificationLevel, notifyUser} from '../util/notification'

const RECEIVE_DATASETS = 'RECEIVE_DATASETS',
  UPDATE_SELECTED_MIDS = 'UPDATE_SELECTED_MIDS'

const fetchDatasets = (ids) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    var promises = []
    for(var id of ids){
      promises.push(Dataset.getByID(id))
    }
    var allp = Promise.all(promises)
    allp.then(dss => {
      dispatch({type: RECEIVE_DATASETS, result: dss})
    })
    .catch(err => {
      notifyUser(dispatch, {
        message: "common.err.fetchmultids",
        needsTranslation: true,
        level: NotificationLevel.ERROR
      })
    })
    .finally(() => {
      dispatch({type: G_STOP_LOADING})
    })
  }
}

export {
  fetchDatasets,
  RECEIVE_DATASETS,
  UPDATE_SELECTED_MIDS
}
