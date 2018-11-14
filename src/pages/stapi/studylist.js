import React from 'react'
import {connect} from 'react-redux'
import {withNamespaces} from 'react-i18next'

import TextField from '@material-ui/core/TextField'

import reducer from '../../lib/reducers/stapi/studylist'
import {Page} from '../../lib/dom'

import StudiesTable from '../../lib/dom/stapi/StudiesTable'

const _StudiesTable = connect(
  (state) => ({
    studies: state.l.studies,
    range: state.l.range
  })
)(
  (props) => <StudiesTable {...props}/>
)
class StudyList extends Page{
  constructor(props){
    super(props, reducer)
    this.state = {
      page: 0,
      numResults: 25
    }
  }

  onChangeSearch(evt){
    //
  }

  onChangePage(page){
    this.setState({
      page: page
    })
  }

  onChangeRowsPerPage(num){
    this.setState({
      numResults: num
    })
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
        <_StudiesTable
          onChangeRowsPerPage={this.onChangeRowsPerPage.bind(this)}
          onChangePage={this.onChangePage.bind(this)}
          rowsPerPage={this.state.numResults}
        />
      </div>
    )
  }
}

export default withNamespaces('pages-stapi')(StudyList)
