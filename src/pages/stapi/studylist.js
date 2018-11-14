import React from 'react'
import {connect} from 'react-redux'
import {withNamespaces} from 'react-i18next'
import debounceWrapper from '../../lib/util/debounceWrapper'

import TextField from '@material-ui/core/TextField'

import {searchStudies} from '../../lib/actions/stapi/studylist'
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
      numResults: 25,
      searchterm: ''
    }
    this.fetchNewResults()
  }

  onChangeSearch(target){
    var searchterm = target.value
    var newstate = {searchterm: searchterm}
    this.setState(newstate)
    this.fetchNewResults(newstate)
  }

  onChangePage(page){
    var page = Math.max(page-1, 0)
    var newstate = {page: page}
    this.setState(newstate)
    this.fetchNewResults(newstate)
  }

  onChangeRowsPerPage(num){
    var newstate = {numResults: num}
    this.setState(newstate)
    this.fetchNewResults(newstate)
  }

  fetchNewResults(specialProps={}){
    var props = {...this.state, ...specialProps}
    this.store.dispatch(searchStudies(props))
  }

  render(){
    var {t} = this.props
    return super.render(
      <div>
        <TextField
          label={t('studylist.search')}
          onChange={debounceWrapper(this.onChangeSearch.bind(this), 600)}
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
