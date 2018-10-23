import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'

import {
  G_REMOVE_DATASETS_FROM_COMPARISON,
  gFetchMetadataAliases
} from '../../lib/actions/_common'
import {fetchDatasets, UPDATE_SELECTED_MIDS} from '../../lib/actions/dsapi/datasetcompare'
import {
  ChooseMetaDatasetsCard,
  DatasetListCard,
  MetaDatasetComparisonCard,
  Page
} from '../../lib/dom'
import reducer from '../../lib/reducers/dsapi/datasetcompare'

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
  ({dss, ma, onStatusChange}) => (
    <ChooseMetaDatasetsCard datasets={dss} metaaliases={ma}
      onStatusChange={onStatusChange}
    />
  )
)

const _metaComparisonCards = connect(
  (state) => ({dss: state.l.datasets, mids: state.l.selectedMids})
)(
  ({dss, mids}) => (
    mids.map(mid =>
      <React.Fragment key={mid}>
        <MetaDatasetComparisonCard metaid={mid} datasets={dss}/>
        <br/>
      </React.Fragment>
    )
  )
)

class DatasetCompare extends Page{
  constructor(props){
    super(props, reducer)
  }

  componentDidMount(){
    this.store.dispatch(fetchDatasets(this.store.getState().g.datasetCompare))
  }

  onSelectedChange = (mid, selected) => {
    this.store.dispatch(
      {type: UPDATE_SELECTED_MIDS, mid: mid, selected: selected}
    )
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
        <_chooseMetaCard onStatusChange={this.onSelectedChange.bind(this)}/>
        <br/>
        <section>
          <_metaComparisonCards/>
        </section>
      </div>
    )
  }
}

export default translate('pages')(DatasetCompare)
