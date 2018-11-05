import React from 'react'
import {connect} from 'react-redux'
import {withNamespaces} from 'react-i18next'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import {
  ADD_COHORT,
  CHANGE_STUDY_NAME,
  START_EDIT
} from '../../lib/actions/mapi/studydetails'
import reducer from '../../lib/reducers/mapi/studydetails'
import {Page} from '../../lib/dom'
import CohortCard from '../../lib/dom/mapi/CohortCard'
import NewCohortDialog from '../../lib/dom/mapi/NewCohortDialog'

import {Cohort, Participant} from '../../lib/api/mapi'

const _CohortCards = connect(
  (state) => ({
    study: state.l.study
  })
)(
  ({study}) => study.cohorts.map(c =>
    <div key={c.name}>
      <br/>
      <CohortCard cohort={c}/>
    </div>
  )
)

const _StudyCardEdit = withNamespaces('pages-mapi')(connect(
  (state) => ({
    study: state.l.study,
    edit: state.l.edit
  })
)(
  ({study, edit, t, onStartEdit, onCreateCohort, onSaveStudy, onChangeName, currentName}) => {
    if(!edit){
      return (
        <CardActions>
          <Button onClick={onStartEdit} fullWidth>
            <Icon>edit</Icon>
            {t('studydetails.studycard.startedit')}
          </Button>
        </CardActions>
      )
    }
    return (
      <React.Fragment>
        <CardContent>
          <TextField
            onChange={onChangeName} margin="normal" defaultValue={currentName}
            label={t('studydetails.studycard.studyname')} fullWidth/>
        </CardContent>
        <CardActions>
          <Button onClick={onCreateCohort} fullWidth>
            <Icon>add</Icon>
            {t('studydetails.studycard.createcohort')}
          </Button>
          <Button onClick={onSaveStudy} fullWidth>
            <Icon>save</Icon>
            {t('studydetails.studycard.save')}
          </Button>
        </CardActions>
      </React.Fragment>
    )
  }
))

const _Title = withNamespaces('pages-mapi')(connect(
  (state) => ({
    title: state.l.study.id ?state.l.study.name :null,
    hasID: !!state.l.study.id
  })
)(
  ({title, hasID, t}) => (
    <Typography variant="display1" color="inherit" margin="normal">
      {title || t('studydetails.'+(hasID ?'unnamedstudy' :'newstudy'))}
    </Typography>
  )
))

class StudyDetails extends Page{
  constructor(props){
    super(props, reducer)
    this.state = {
      newCohortDialog: false
    }
  }

  addParticipants = (count, cohort, startIndex = 0) => {
    var name = (this.props.t
      ?this.props.t('studydetails.participant')
      :'Participant')
    for(var i = 0; i < count; i++){
      cohort.addParticipant(
        new Participant({alias: name+' '+(i+startIndex)})
      )
    }
  }

  createCohort({name, plannedParticipantCount, createParticipantCount}){
    if(name){
      var cohort = new Cohort({
        name: name,
        plannedParticipantCount: plannedParticipantCount
      })
      this.addParticipants(createParticipantCount, cohort)
      this.store.dispatch({type: ADD_COHORT, cohort: cohort})
    }
    this.setState({
      newCohortDialog: false
    })
  }

  openCreateCohortDialog(){
    this.setState({
      newCohortDialog: true
    })
  }

  saveStudy(){
    //
  }

  startEdit(){
    this.store.dispatch({type: START_EDIT})
  }

  changeName(evt){
    var name = evt.target.value
    if(name.length > 0){
      this.store.dispatch({type: CHANGE_STUDY_NAME, value: name})
    }
  }

  render(){
    var {t} = this.props
    var currentName = this.store.getState().l.study.name
    return super.render(
      <div>
        <_Title/>
        <Card>
          <CardHeader title={t('studydetails.studycard.title')}/>
          <_StudyCardEdit
            onStartEdit={this.startEdit.bind(this)}
            onCreateCohort={this.openCreateCohortDialog.bind(this)}
            onSaveStudy={this.saveStudy.bind(this)}
            onChangeName={this.changeName.bind(this)}
            currentName={this.store.getState().l.study.name}
          />
        </Card>
        {this.state.newCohortDialog
          ?<NewCohortDialog
            onClose={() => this.setState({newCohortDialog: false})}
            onSave={this.createCohort.bind(this)}
            />
          :null
        }
        <_CohortCards/>
      </div>
    )
  }
}

export default withNamespaces('pages-mapi')(StudyDetails)
