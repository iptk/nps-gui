const reducer = (state = [], action) => {
  switch(action.type){
    case 'FILTER_SINGLE_CHANGE':
      return Object.assign({}, state, {
        filter_global: action.filter
      })

    case 'FILTER_GLOBAL_CHANGE':
      return Object.assign({}, state, {
        filter_single: action.filter
      })

    default:
      return state
  }
}

export default reducer
