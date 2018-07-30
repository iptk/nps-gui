import React from 'react'
import {translate} from 'react-i18next'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

const MessageLevel = Object.freeze({
  ERROR: {color: 'error', icon: 'error'},
  WARNING: {color: 'warning', icon: 'warning'},
  INFO: {color: 'info', icon: 'info'},
  SUCCESS: {color: 'success', icon: 'check_circle'}
})

class MessageSnackbar extends React.Component{
  constructor(props){
    super(props)
  }
  
  render(){
    var {level, message, needsTranslation, t} = this.props
    return (
      <Snackbar
        open={this.state.open}
        autoHideDuration={6000}
      >
        <SnackbarContent
          message={
            <span>
              <Icon>{level.icon}</Icon>
              {needsTranslation ?t(message) :message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={onClose}
            >
              <Icon>close</Icon>
            </IconButton>
          ]}
        />
      </Snackbar>
    )
  }
}

export default MessageSnackbar
export {MessageLevel, MessageSnackbar}
