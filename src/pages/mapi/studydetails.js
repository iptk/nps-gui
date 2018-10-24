import React from 'react'
import {connect} from 'react-redux'
import {withNamespaces} from 'react-i18next'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

import {START_EDIT} from '../../lib/actions/mapi/studydetails'
import reducer from '../../lib/reducers/mapi/studydetails'
import {Page} from '../../lib/dom'

const _Title = withNamespaces('pages-mapi')(connect(
  (state) => ({
    title: state.l.study.id ?state.l.study.name :null,
    hasID: !!state.l.study.id
  })
)(
  ({title, hasID, t}) => (
    <Typography variant="display1" color="inherit">
      {title || t('studydetails.'+(hasID ?'unnamedstudy' :'newstudy'))}
    </Typography>
  )
))
const _StudyCardEdit = withNamespaces('pages-mapi')(connect(
  (state) => ({
    study: state.l.study,
    edit: state.l.edit
  })
)(
  ({study, edit, t, onStartEdit, onCreateCohort, onSaveStudy}) => {
    if(!edit){
      return (
        <div>
          <Button onClick={onStartEdit} fullWidth>
            <Icon>edit</Icon>
            {t('studydetails.studycard.startedit')}
          </Button>
        </div>
      )
    }
    return (
      <div>
        <Button onClick={onCreateCohort} fullWidth>
          <Icon>add</Icon>
          {t('studydetails.studycard.createcohort')}
        </Button>
        <Button onClick={onSaveStudy} fullWidth>
          <Icon>save</Icon>
          {t('studydetails.studycard.save')}
        </Button>
      </div>
    )
  }
))

class StudyDetails extends Page{
  constructor(props){
    super(props, reducer)
    window._s = this.store
  }

  createCohort(){
    //
  }

  saveStudy(){
    //
  }

  startEdit(){
    this.store.dispatch({type: START_EDIT})
  }

  render(){
    var {t} = this.props
    return super.render(
      <div>
        <_Title/>
        <Card>
          <CardHeader title={t('studydetails.studycard.title')}/>
          <_StudyCardEdit
            onStartEdit={this.startEdit.bind(this)}
            onCreateCohort={this.createCohort.bind(this)}
            onSaveStudy={this.saveStudy.bind(this)}
          />
        </Card>
      </div>
    )
  }
}

export default withNamespaces('pages-mapi')(StudyDetails)
