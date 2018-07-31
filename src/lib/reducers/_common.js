import {
  G_START_LOADING,
  G_STOP_LOADING,
  G_ADD_DATASETS_TO_COMPARISON,
  G_NOTIFICATION_ADD,
  G_NOTIFICATION_CLOSE,
  G_RECEIVE_METADATA_ALIASES,
  G_REMOVE_DATASETS_FROM_COMPARISON,
  G_RESTORE_STATE_FROM_COOKIES
} from '../actions/_common'
import Cookie from 'js-cookie'

const init = {
  loading: 0,
  metadataAliases: {},
  datasetCompare: [],
  notifications: {
    current: undefined,
    queue: []
  }
}
const commonReducer = (state=init, action) => {
  switch(action.type){
    case G_RESTORE_STATE_FROM_COOKIES:
      return {
        ...state,
        datasetCompare: Cookie.getJSON('g_compareDS') || state.datasetCompare
      }

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

    case G_NOTIFICATION_ADD:
      var notif = state.notifications

      if(!state.notifications.current){
        notif.current = action.notification
      }
      else{
        notif.queue.push(action.notification)
      }
      console.log(notif)

      return {
        ...state,
        notifications: {...notif}
      }

    case G_NOTIFICATION_CLOSE:
      var notif = state.notifications
      notif.current = notif.queue.shift()
      console.log(notif)
      return {
        ...state,
        notifications: {...notif}
      }

    case G_ADD_DATASETS_TO_COMPARISON:
      var comp = state.datasetCompare
      var changed = false
      if(!Array.isArray(action.dsids)){
        action.dsids = [action.dsids]
      }
      action.dsids.forEach((id) => {
        if(!comp.includes(id)){
          comp.push(id)
          changed = true
        }
      })
      if(changed){
        Cookie.set('g_compareDS', comp, {expires: 90})
      }
      return {
        ...state,
        datasetCompare: changed ?[...comp] :comp
      }

    case G_RECEIVE_METADATA_ALIASES:
      return {
        ...state,
        metadataAliases: action.aliases
      }

    case G_REMOVE_DATASETS_FROM_COMPARISON:
      var comp = state.datasetCompare
      var changed = false
      if(!Array.isArray(action.dsids)){
        action.dsids = [action.dsids]
      }
      action.dsids.forEach((id) => {
        var idx = comp.indexOf(id)
        if(idx !== -1){
          comp.splice(idx, 1)
          changed = true
        }
      })
      if(changed){
        Cookie.set('g_compareDS', comp, {expires: 90})
      }
      return {
        ...state,
        datasetCompare: changed ?[...comp] :comp
      }

    default:
      return state
  }
}

export default commonReducer
export {commonReducer}
