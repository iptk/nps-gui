import React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {Button, Card, CardTitle} from 'react-toolbox'

import {JobCard, Page} from './lib/dom'
import reducer from './lib/reducers/jobsoverview'
import {fetchJobs} from './lib/actions/jobsoverview'

const _JobCard = connect(
  (state) => ({jobs: state.s.jobs})
)(JobCard)

class JobsOverview extends Page{
  constructor(props){
    super(props, reducer)
    this.getJobs = this.getJobs.bind(this)
    this.getJobs()
  }

  getJobs(){
    this.store.dispatch(fetchJobs())
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
        <_JobCard/>
      </div>
    )
  }
}

export default translate('pages')(JobsOverview)
