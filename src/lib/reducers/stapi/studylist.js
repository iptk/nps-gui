import {RECEIVE_STUDIES} from '../../actions/stapi/studylist'

const init = {
  studies: [],
  range: {
    start: 0,
    end: 0,
    max: 0
  }
}
const reducer = (state = init, action) => {
  switch(action.type){
    case RECEIVE_STUDIES:
      return {
        studies: action.result.studies,
        range: action.result.range
      }
      
    default:
      return state
  }
}

export default reducer
