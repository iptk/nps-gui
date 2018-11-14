import {Study} from '../../api/stapi'
import {G_START_LOADING, G_STOP_LOADING} from '../_common'
import {NotificationLevel, notifyUser} from '../../util/notification'

const RECEIVE_STUDIES = 'RECEIVE_STUDIES'

const searchStudies = ({page=0, numResults=25, searchterm, ...params}) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    if(!params['limit'] && !params['offset']){
      params['limit'] = numResults
      params['offset'] = page*numResults
    }
    if(searchterm && searchterm.length > 0 && !params['filter']){
      params['filter'] = searchterm
    }
    Study
      .search(params)
      .then(res => {
        dispatch({type: RECEIVE_STUDIES, result: res})
      })
      .catch(err => {
        notifyUser(dispatch, {
          message: "studylist.err.loadstudies",
          level: NotificationLevel.ERROR
        })
      })
      .finally(() => {
        dispatch({type: G_STOP_LOADING})
      })
  }
}

export {
  searchStudies,
  RECEIVE_STUDIES,
}
