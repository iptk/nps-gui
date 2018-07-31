import React from 'react'
import {translate} from 'react-i18next'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'

import amber from '@material-ui/core/colors/amber'
import green from '@material-ui/core/colors/green'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

const MessageLevel = Object.freeze({
  ERROR: {class: 'error', icon: 'error'},
  WARNING: {class: 'warning', icon: 'warning'},
  INFO: {class: 'info', icon: 'info'},
  SUCCESS: {class: 'success', icon: 'check_circle'}
})

const messageStyles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing.unit,
  }
})

class MessageSnackbar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      open: true
    }
  }

  handleClose = () => {
    this.setState({open: false})
    if(this.props.onClose){
      this.props.onClose()
    }
  }

  render(){
    var {classes, level, message, needsTranslation=false, t} = this.props
    this.state.open = true
    const handleClose = this.handleClose.bind(this)
    return (
      <Snackbar
        open={this.state.open}
        autoHideDuration={6000}
        anchorOrigin={{vertical:  'bottom', horizontal:'center'}}
        onClose={handleClose}
      >
        <SnackbarContent
          className={classNames(classes[level.class], classes.margin)}
          message={
            <span className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)}>
                {level.icon}
              </Icon>
              {needsTranslation ?t(message) :message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={handleClose}
            >
              <Icon className={classes.icon}>close</Icon>
            </IconButton>
          ]}
        />
      </Snackbar>
    )
  }
}

MessageSnackbar = translate('err')(
  withStyles(messageStyles)(MessageSnackbar)
)

export default MessageSnackbar
export {MessageLevel, MessageSnackbar}
