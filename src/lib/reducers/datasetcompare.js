import {
  RECEIVE_DATASETS,
  UPDATE_SELECTED_MIDS
} from '../actions/datasetcompare'

import {MetaDataset} from '../api'

const init = {
  datasets: [],
  selectedMids: []
}
const reducer = (state = init, action) => {
  switch(action.type){
    case RECEIVE_DATASETS:
      return {
        ...state,
        datasets: action.result
      }

    case UPDATE_SELECTED_MIDS:
      var selection = state.selectedMids
      if(action.selected){
        selection.push(action.mid)
      }
      else{
        var idx = selection.indexOf(action.mid)
        if(idx >= 0){
          selection.splice(idx, 1)
        }
      }
      return {
        ...state,
        selectedMids: [...selection]
      }

    default:
      return state
  }
}

export default reducer
