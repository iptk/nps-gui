import React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {Button, Card, CardTitle} from 'react-toolbox'

import {JobCard, Page} from './lib/dom'
import reducer from './lib/reducers/jobsoverview'
import {fetchPendingJobs, fetchScheduledJobs} from './lib/actions/jobsoverview'

const _pendingJobCard = connect(
  (state) => ({jobs: state.s.jobs_pending})
)(JobCard)

const _scheduledJobCard = connect(
  (state) => ({jobs: state.s.jobs_scheduled})
)(JobCard)

class JobsOverview extends Page{
  constructor(props){
    super(props, reducer)
    this.getJobs = this.getJobs.bind(this)
    this.getJobs()
  }

  getJobs(){
    this.store.dispatch(fetchPendingJobs())
    this.store.dispatch(fetchScheduledJobs())
  }

  render(){
    const {t} = this.props
    return super.render(
      <div>
        <Card>
          <CardTitle>{t('jobsoverview.actions')}</CardTitle>
          <Button onMouseUp={this.getJobs.bind(this)}
            label={t('jobsoverview.refresh')}/>
        </Card>
        <br/>
        <_pendingJobCard status="pending"/>
        <br/>
        <_scheduledJobCard status="scheduled"/>
      </div>
    )
  }
}

export default translate('pages')(JobsOverview)
