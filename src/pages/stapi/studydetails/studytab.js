import React from 'react'
import {connect} from 'react-redux'
import {withNamespaces} from 'react-i18next'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import {
  ADD_COHORT,
  CHANGE_STUDY_NAME,
  START_EDIT,
  saveStudy
} from '../../../lib/actions/stapi/studydetails'
import CohortCard from '../../../lib/dom/stapi/CohortCard'
import NewCohortDialog from '../../../lib/dom/stapi/NewCohortDialog'

import {Cohort, Participant} from '../../../lib/api/stapi'

const _CohortCards = connect(
  (state) => ({
    study: state.l.study
  })
)(
  ({onCohortDetail, study}) => study.cohorts.map(c =>
    <div key={c.name}>
      <br/>
      <CohortCard cohort={c} onCohortDetail={onCohortDetail}/>
    </div>
  )
)

const _StudyCardEdit = withNamespaces('pages-stapi')(connect(
  (state) => ({
    study: state.l.study,
    edit: state.l.edit
  })
)(
  ({study, edit, t, onStartEdit, onCreateCohort, onSaveStudy, onChangeName, currentName}) => {
    var infoTable = (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>{t('studydetails.studycard.studyid')}</TableCell>
            <TableCell>{study.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('studydetails.studycard.cohortcount')}</TableCell>
            <TableCell>
              {Math.max(study.cohortIDs.length, study.cohorts.length)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    if(!edit){
      return (
        <CardActions>
          {infoTable}
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
          {infoTable}
          <br/>
          <TextField
            onChange={onChangeName} margin="normal" defaultValue={currentName}
            label={t('studydetails.studycard.studyname')} fullWidth
            error={study.name.length === 0}/>
        </CardContent>
        <CardActions>
          <Button onClick={onCreateCohort} fullWidth>
            <Icon>add</Icon>
            {t('studydetails.studycard.createcohort')}
          </Button>
          <Button onClick={onSaveStudy} fullWidth
            disabled={study.name.length === 0}
          >
            <Icon>save</Icon>
            {t('studydetails.studycard.save')}
          </Button>
        </CardActions>
      </React.Fragment>
    )
  }
))

const _Title = withNamespaces('pages-stapi')(connect(
  (state) => ({
    title: state.l.study.id ?state.l.study.name :null,
    hasID: !!state.l.study.id
  })
)(
  ({title, hasID, t}) => (
    <Typography variant="display1" color="inherit" paragraph>
      {title || t('studydetails.'+(hasID ?'unnamedstudy' :'newstudy'))}
    </Typography>
  )
))

class StudyTab extends React.PureComponent{
  constructor(props){
    super(props)
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
      this.props.store.dispatch({type: ADD_COHORT, cohort: cohort})
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

  onSaveStudy(){
    this.props.store.dispatch(saveStudy(this.props.store.getState().l.study))
  }

  startEdit(){
    this.props.store.dispatch({type: START_EDIT})
  }

  changeName(evt){
    var name = evt.target.value
    if(name.length > 0){
      this.props.store.dispatch({type: CHANGE_STUDY_NAME, value: name})
    }
  }

  render(){
    var {onCohortDetail, t} = this.props
    var currentName = this.props.store.getState().l.study.name
    return (
      <div>
        <_Title/>
        <Card>
          <CardHeader title={t('studydetails.studycard.title')}/>
          <_StudyCardEdit
            onStartEdit={this.startEdit.bind(this)}
            onCreateCohort={this.openCreateCohortDialog.bind(this)}
            onSaveStudy={this.onSaveStudy.bind(this)}
            onChangeName={this.changeName.bind(this)}
            currentName={this.props.store.getState().l.study.name}
          />
        </Card>
        {this.state.newCohortDialog
          ?<NewCohortDialog
            onClose={() => this.setState({newCohortDialog: false})}
            onSave={this.createCohort.bind(this)}
            />
          :null
        }
        <_CohortCards onCohortDetail={onCohortDetail}/>
      </div>
    )
  }
}

export default withNamespaces('pages-stapi')(StudyTab)
