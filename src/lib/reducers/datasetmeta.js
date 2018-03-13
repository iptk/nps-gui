import {
  START_LOADING,
  RECEIVE_DATASET,
  TAGS_ADDEMPTY,
  TAGS_UPDATETMP
} from '../actions/datasetmeta'

const init = {
  dataset: {
    metadatasets: []
  },
  "downloadurl": "#",
  tmpTags: []
}
const reducer = (state = init, action) => {
  switch(action.type){
    case RECEIVE_DATASET:
      return {
        ...state,
        dataset: action.result,
        downloadurl: action.result.getDownloadURL(),
        tmpTags: action.result.tags
      }

    case TAGS_ADDEMPTY:
      return {
        ...state,
        tmpTags: [...state.tmpTags, '']
      }

    case TAGS_UPDATETMP:{
      return {
        ...state,
        tmpTags: action.tags
      }
    }

    default:
      return state
  }
}

export default reducer
