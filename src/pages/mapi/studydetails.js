import React from 'react'
import {connect} from 'react-redux'
import {withNamespaces} from 'react-i18next'

import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

import reducer from '../../lib/reducers/mapi/studydetails'
import {Page} from '../../lib/dom'

import CohortTab from './studydetails/CohortTab'
import StudyTab from './studydetails/StudyTab'

const _Tabs = withNamespaces('pages-mapi')(connect(
  (state) => ({
    study: state.l.study
  })
)(
  ({onChange, study, studytabVal, t, value}) => (
    <Tabs value={value}
      onChange={onChange}
      scrollable
      scrollButtons="auto"
    >
      <Tab label={t('studydetails.studytab')}
        value={studytabVal}
        key={studytabVal}/>
      {study.cohorts.map(c => (
        <Tab label={c.name} key={`${c.name}.${c.id}`}
          value={`${c.name||''}.${c.id||''}`}/>
      ))}
    </Tabs>
  )
))

class StudyDetails extends Page{
  TAB_STUDY = "study"
  TAB_COHORT = "cohort"
  STUDYTAB_VALUE = "__study"

  constructor(props){
    super(props, reducer)
    this.state = {
      tab: {type: this.TAB_STUDY},
      selectedTab: this.STUDYTAB_VALUE
    }
  }

  changeTab(evt, value){
    var tab = {
      type: value === this.STUDYTAB_VALUE ?this.TAB_STUDY :this.TAB_COHORT
    }
    if(tab.type === this.TAB_COHORT){
      var split = value.split('.')
      tab.name = split[0]
      tab.id = split[1]
    }
    this.setState({
      tab: tab,
      selectedTab: value
    })
  }

  render(){
    var {selectedTab, tab} = this.state
    var cohort = (tab.type == this.TAB_STUDY
      ?null
      :this.store.getState().l.study.getCohortByIDorName(tab.id, tab.name)
    )
    return super.render(
      <div>
        <AppBar position="static">
          <_Tabs onChange={this.changeTab.bind(this)}
            value={selectedTab} studytabVal={this.STUDYTAB_VALUE}/>
        </AppBar>
        <br/>
        {tab.type === this.TAB_STUDY
          && <StudyTab store={this.store} onCohortDetail={this.changeTab.bind(this)}/>
        }
        {tab.type === this.TAB_COHORT
          && <CohortTab store={this.store} cohort={cohort}/>
        }
      </div>
    )
  }
}

export default StudyDetails
