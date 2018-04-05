import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {Input} from 'react-toolbox'
import {connect} from 'react-redux'
import debounce from 'lodash/debounce'
import {translate} from 'react-i18next'

import Page from './lib/dom/Page'
import {FILTER_SINGLE_CHANGE, FILTER_GLOBAL_CHANGE, fetchDataset} from './lib/actions/searchdataset'
import {DatasetTable, QueryList} from './lib/dom'
import reducer from './lib/reducers/searchdataset'

const _subscribedDatasetTable = connect(
  (state) => ({datasets: state.dataset})
)(DatasetTable)

const _subscribedQueryList = connect(
  (state) => {
    var chips = []
    for(var single of state.filter.single){
      chips.push(single.concat(state.filter.global))
    }
    return {
      queryVals: chips
    }
  }
)(QueryList)

class SearchDataset extends Page{
  constructor(props){
    super(props, reducer)
  }

  applyNewFilter(type, val){
    // update filters in store
    this.store.dispatch({type: type, filter: val})

    // fetch dataset
    this.store.dispatch(fetchDataset(this.store.getState().filter))
  }

  render(){
    const {t} = this.props
    return super.render(
      <section>
        <Input type="text" label={t('searchdataset.filter_single')} multiline rows={10}
          onChange={debounce(this.applyNewFilter.bind(this, FILTER_SINGLE_CHANGE), 600)}/>
        <Input type="text" label={t('searchdataset.filter_global')}
          onChange={debounce(this.applyNewFilter.bind(this, FILTER_GLOBAL_CHANGE), 600)}/>
        <_subscribedQueryList/>
        <_subscribedDatasetTable keys={['AcquisitionDateTime', 'PatientsName', 'SeriesDescription']} editBtn={true} dlBtn={true}/>
      </section>
    )
  }
}

export default translate('pages')(SearchDataset)
