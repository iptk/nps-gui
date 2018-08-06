import React from 'react'
import {translate} from 'react-i18next'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'
import {Link} from 'react-router-dom'

import amber from '@material-ui/core/colors/amber'
import green from '@material-ui/core/colors/green'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

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

class NotificationSnackbar extends React.Component{
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
    var {
      classes, level, message, needsTranslation=false, t, link, action
    } = this.props
    this.state.open = true
    const handleClose = this.handleClose.bind(this)
    if(link){
      action = <Button component={Link} to={link.href} color='secondary'
        key='action'
        onClick={this.handleClose.bind(this)}>
          {link.needsTranslation ?t(link.text) :link.text}
        </Button>
    }
    if(!link && action){
      action = React.closeElement(action, {key: 'action'})
    }
    var closeBtn = <IconButton
        key="close"
        color="inherit"
        onClick={handleClose}
      >
        <Icon className={classes.icon}>close</Icon>
      </IconButton>
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
          action={action ?[action, closeBtn] :closeBtn}
        />
      </Snackbar>
    )
  }
}

NotificationSnackbar = translate('err')(
  withStyles(messageStyles)(NotificationSnackbar)
)

export default NotificationSnackbar
export {NotificationSnackbar}
