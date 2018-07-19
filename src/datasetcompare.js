import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'

import {
  G_REMOVE_DATASETS_FROM_COMPARISON,
  gFetchMetadataAliases
} from './lib/actions/_common'
import {fetchDataset} from './lib/actions/datasetcompare'
import {DatasetListCard, Page} from './lib/dom'
import reducer from './lib/reducers/datasetcompare'

const _dsListCard = translate('pages')(connect(
  (state) => ({dsids: state.g.datasetCompare})
)(
  ({dsids, onDelete, t}) => (
    <DatasetListCard dsids={dsids} onDelete={onDelete}/>
  )
))

class DatasetCompare extends Page{
  constructor(props){
    super(props, reducer)
  }

  removeDs(id){
    this.store.dispatch({type: G_REMOVE_DATASETS_FROM_COMPARISON, dsids: [id]})
  }

  render(){
    const {t} = this.props
    return super.render(
      <div>
        <_dsListCard onDelete={this.removeDs.bind(this)}/>
      </div>
    )
  }
}

export default translate('pages')(DatasetCompare)
