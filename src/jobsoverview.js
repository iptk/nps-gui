import React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {Button, Card, CardTitle, Snackbar} from 'react-toolbox'

import Page from './lib/dom'
import reducer from './lib/reducers/jobsoverview'

class JobsOverview extends Page{
  constructor(props){
    super(props, reducer)
  }

  render(){
    const {t} = this.props
    return super.render()
  }
}

export default translate('pages')(Jobs)
