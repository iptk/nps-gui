import {
  ADD_COHORT,
  CHANGE_STUDY_NAME,
  RECEIVE_STUDY,
  START_EDIT
} from '../../actions/mapi/studydetails'
import {Study} from '../../api/mapi'

const init = {
  study: new Study({}),
  edit: true,
  manualEdit: false
}
const reducer = (state = init, action) => {
  switch(action.type){
    case ADD_COHORT:
      var study = state.study.clone()
      study.addCohort(action.cohort)
      return {
        ...state,
        study: study
      }

    case CHANGE_STUDY_NAME:
      state.study.name = action.value
      return {
        ...state,
        study: state.study.clone()
      }

    case RECEIVE_STUDY:
      return {
        ...state,
        study: action.result,
        edit: state.manualEdit || !!action.result.id
      }

    case START_EDIT:
      return {
        ...state,
        edit: true,
        manualEdit: true
      }

    default:
      return state
  }
}

export default reducer
