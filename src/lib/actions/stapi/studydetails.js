import {Study} from '../../api/stapi'
import {G_START_LOADING, G_STOP_LOADING} from '../_common'
import {NotificationLevel, notifyUser} from '../../util/notification'

const ADD_COHORT = 'ADD_COHORT',
  CHANGE_STUDY_NAME = 'CHANGE_STUDY_NAME',
  RECEIVE_STUDY = 'RECEIVE_STUDY',
  START_EDIT = 'START_EDIT'

const loadStudy = (id) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    Study
      .get(id, true)
      .then(res => {
        dispatch({type: RECEIVE_STUDY, result: res})
      })
      .catch(err => {
        notifyUser(dispatch, {
          message: "studydetails.err.loadstudy",
          level: NotificationLevel.ERROR
        })
      })
      .finally(() => {
        dispatch({type: G_STOP_LOADING})
      })
  }
}

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
        notifyUser(dispatch, {
          message: "studydetails.succ.savestudy",
          level: NotificationLevel.SUCCESS
        })
      })
      .catch(err => {
        notifyUser(dispatch, {
          message: "studydetails.err.savestudy",
          level: NotificationLevel.ERROR
        })
      })
      .finally(() => {
        dispatch({type: G_STOP_LOADING})
      })
  }
}

export {
  loadStudy,
  saveStudy,
  ADD_COHORT,
  CHANGE_STUDY_NAME,
  RECEIVE_STUDY,
  START_EDIT
}
