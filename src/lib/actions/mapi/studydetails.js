import {Dataset} from '../../api/mapi'
import {G_START_LOADING, G_STOP_LOADING} from '../_common'
import {NotificationLevel, notifyUser} from '../../util/notification'

const RECEIVE_STUDY = 'RECEIVE_STUDY',
  START_EDIT = 'START_EDIT'

const saveStudy = (study) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    if(!study.id){
      dispatch({type: START_EDIT})
    }
    study
      .save()
      .then(res => {
        dispatch({type: RECEIVE_STUDY, result: res})
      })
      .catch(err => {
        notifyUser(dispatch, {
          message: "metadatacollections.fetch",
          level: NotificationLevel.ERROR
        })
      })
      .finally(() => {
        dispatch({type: G_STOP_LOADING})
      })
  }
}

export {
  saveStudy,
  RECEIVE_STUDY,
  START_EDIT
}
