const action_filter_single_change = "FILTER_SINGLE_CHANGE",
  action_filter_global_change="FILTER_GLOBAL_CHANGE"

const reducer = (state = [], action) => {
  switch(action.type){
    case action_filter_single_change:
      return Object.assign({}, state, {
        filter_global: action.filter
      })

    case action_filter_global_change:
      return Object.assign({}, state, {
        filter_single: action.filter
      })

    default:
      return state
  }
}

export default reducer
