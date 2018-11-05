import React from 'react'
import {withNamespaces} from 'react-i18next'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

class NewCohortDialog extends React.Component{
  state = {
    open: true,
    name: '',
    participantCount: 0,
    createParticipantCount: 0
  }

  save(){
    if(this.props.onSave){
      this.props.onSave({
        name: this.state.name,
        plannedParticipantCount: this.state.participantCount,
        createParticipantCount: this.state.createParticipantCount
      })
    }
    this.close()
  }

  close(){
    this.setState({
      open: false
    })
    if(this.props.onClose){
      this.props.onClose()
    }
  }

  render(){
    var {t} = this.props

    return (
      <Dialog
        open={this.state.open}
        onClose={this.close.bind(this)}
        scroll='paper'
        aria-labelledby="newCohortDialogTitle"
      >
        <DialogTitle id="newCohortDialogTitle">
          {t('NewCohortDialog.title')}
        </DialogTitle>
        <DialogContent>
          <TextField label={t('NewCohortDialog.cohortname')}
            onChange={(evt) => this.setState({name: evt.target.value})}
            fullWidth
            margin="normal"
            error={this.state.name.length == 0}/>
          <TextField label={t('NewCohortDialog.participantcount')}
            onChange={(evt) => this.setState({
              participantCount: Math.max(evt.target.value, 0)
            })}
            type="number"
            margin="normal"
            defaultValue={0}
            inputProps={{min: "0", step: "1"}}
            fullWidth/>
          <TextField label={t('NewCohortDialog.participantcreatecount')}
            onChange={(evt) => this.setState({
              createParticipantCount: Math.max(evt.target.value, 0)
            })}
            margin="normal"
            type="number"
            defaultValue={0}
            inputProps={{min: "0", step: "1"}}
            fullWidth/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.save.bind(this)}
            disabled={this.state.name.length == 0}
            fullWidth
          >
            {t('NewCohortDialog.createcohort')}
          </Button>
          <Button onClick={this.close.bind(this)} fullWidth>
            {t('NewCohortDialog.cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withNamespaces('dom-mapi')(NewCohortDialog)
