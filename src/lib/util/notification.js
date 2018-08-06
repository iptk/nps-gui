import {G_NOTIFICATION_ADD} from '../actions/_common'

const NotificationLevel = Object.freeze({
  ERROR: {class: 'error', icon: 'error'},
  WARNING: {class: 'warning', icon: 'warning'},
  INFO: {class: 'info', icon: 'info'},
  SUCCESS: {class: 'success', icon: 'check_circle'}
})

const notifyUser = (dispatch, {
  message, level=NotificationLevel.INFO, needsTranslation=true, ...attrs
}) => {
  dispatch({type: G_NOTIFICATION_ADD, notification:{
    message: message,
    level: level,
    needsTranslation: needsTranslation,
    ...attrs
  }})
}

export default notifyUser
export {NotificationLevel, notifyUser}
