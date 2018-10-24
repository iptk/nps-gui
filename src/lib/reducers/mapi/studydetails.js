import {RECEIVE_STUDY, START_EDIT} from '../../actions/mapi/studydetails'
import {Study} from '../../api/mapi'

const init = {
  study: new Study({}),
  edit: false,
  manualEdit: false
}
const reducer = (state = init, action) => {
  switch(action.type){
    case RECEIVE_STUDY:
      return {
        ...state,
        study: action.result,
        edit: manualEdit || !!action.result.id
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
