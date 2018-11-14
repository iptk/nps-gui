import {Study} from '../../api/stapi'
import {G_START_LOADING, G_STOP_LOADING} from '../_common'
import {NotificationLevel, notifyUser} from '../../util/notification'

const RECEIVE_STUDIES = 'RECEIVE_STUDIES'

const saveStudy = ({page, numResults, ...params}) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    params['limit'] = numResults
    params['offset'] = page*numResults
    study
      .search(params)
      .then(res => {
        dispatch({type: RECEIVE_STUDIES, result: res})
      })
      .catch(err => {
        notifyUser(dispatch, {
          message: "studydetails.err.loadstudies",
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
  ADD_COHORT,
  CHANGE_STUDY_NAME,
  RECEIVE_STUDY,
  START_EDIT
}
