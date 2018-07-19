import {
  G_START_LOADING,
  G_STOP_LOADING,
  G_RECEIVE_METADATA_ALIASES
} from '../actions/_common'

const init = {
  loading: 0,
  metadataAliases: {}
}
const commonReducer = (state=init, action) => {
  switch(action.type){
    case G_START_LOADING:
      return {
        ...state,
        loading: state.loading < 0 ?1 :state.loading+1
      }

    case G_STOP_LOADING:
      return {
        ...state,
        loading: state.loading > 0 ?state.loading-1 :0
      }

    case G_RECEIVE_METADATA_ALIASES:
      return {
        ...state,
        metadataAliases: action.aliases
      }
    default:
      return state
  }
}

export default commonReducer
export {commonReducer}
