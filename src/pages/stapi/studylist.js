import React from 'react'
import {connect} from 'react-redux'
import {withNamespaces} from 'react-i18next'

import TextField from '@material-ui/core/TextField'

import reducer from '../../lib/reducers/stapi/studylist'
import {Page} from '../../lib/dom'

class StudyList extends Page{

  constructor(props){
    super(props, reducer)
  }

  onChangeSearch(evt){
    //
  }

  render(){
    var {t} = this.props
    return super.render(
      <div>
        <TextField
          label={t('studylist.search')}
          onChange={this.onChangeSearch.bind(this)}
          margin="normal"
          type="search"
          fullWidth/>
      </div>
    )
  }
}

export default withNamespaces('pages-stapi')(StudyList)
