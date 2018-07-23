import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'

import {
  G_REMOVE_DATASETS_FROM_COMPARISON,
  gFetchMetadataAliases
} from './lib/actions/_common'
import {fetchDatasets, UPDATE_SELECTED_MIDS} from './lib/actions/datasetcompare'
import {
  ChooseMetaDatasetsCard,
  DatasetListCard,
  MetaDatasetComparisonCard,
  Page
} from './lib/dom'
import reducer from './lib/reducers/datasetcompare'

const _dsListCard = connect(
  (state) => ({dsids: state.g.datasetCompare})
)(
  ({dsids, onDelete, t}) => (
    <DatasetListCard dsids={dsids} onDelete={onDelete}/>
  )
)

const _chooseMetaCard = connect(
  (state) => ({dss: state.l.datasets, ma: state.g.metadataAliases})
)(
  ({dss, ma}) => (
    <ChooseMetaDatasetsCard datasets={dss} metaaliases={ma}
    />
  )
)

const _metaComparisonCards = connect(
  (state) => ({dss: state.l.datasets, mids: state.l.selectedMids})
)(
  ({dss, mids}) => (
    mids.map(mid => <MetaDatasetComparisonCard metaid={mid} datasets={dss}/>)
  )
)

class DatasetCompare extends Page{
  constructor(props){
    super(props, reducer)
    this.store.dispatch(fetchDatasets(this.store.getState().g.datasetCompare))
  }

  onSelectedChange = (mid, selected) => {
    var selection = this.store.getState().l.selectedMids
    if(selected){
      selection.push(selected)
    }
    else{
      var idx = selection.indexOf(selected)
      if(idx >= 0){
        array.splice(idx, 1)
      }
    }
    this.store.dispatch({type: UPDATE_SELECTED_MIDS, mids: selection})
  }

  removeDs(id){
    this.store.dispatch({type: G_REMOVE_DATASETS_FROM_COMPARISON, dsids: [id]})
  }

  render(){
    const {t} = this.props
    return super.render(
      <div>
        <_dsListCard onDelete={this.removeDs.bind(this)}/>
        <br/>
        <_chooseMetaCard/>
        <br/>
        <section>
          <_metaComparisonCards/>
        </section>
      </div>
    )
  }
}

export default translate('pages')(DatasetCompare)
