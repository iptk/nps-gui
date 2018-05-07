import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {Input} from 'react-toolbox'
import {connect} from 'react-redux'
import debounce from 'lodash/debounce'
import {translate} from 'react-i18next'

import {FILTER_SINGLE_CHANGE, FILTER_GLOBAL_CHANGE, FIELDS_CHANGE, fetchDataset} from './lib/actions/searchdataset'
import {DatasetTable, Page, QueryList} from './lib/dom'
import reducer from './lib/reducers/searchdataset'

const _subscribedDatasetTable = connect(
  (state) => ({datasets: state.s.dataset, keys: state.s.filter.fields})
)(DatasetTable)

const _subscribedQueryList = connect(
  (state) => {
    var chips = []
    for(var single of state.s.filter.single){
      chips.push(single.concat(state.s.filter.global))
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
    this.store.dispatch(fetchDataset(this.store.getState().s.filter))
  }

  applyFields(fields){
    fields = fields.split(',')
    this.store.dispatch({type: FIELDS_CHANGE, fields: fields})
    this.store.dispatch(fetchDataset(this.store.getState().s.filter))
  }

  render(){
    const {t} = this.props
    return super.render(
      <section>
        <Input type="text" label={t('searchdataset.filter_single')} multiline rows={10}
          onChange={debounce(this.applyNewFilter.bind(this, FILTER_SINGLE_CHANGE), 600)}/>
        <Input type="text" label={t('searchdataset.filter_global')}
          onChange={debounce(this.applyNewFilter.bind(this, FILTER_GLOBAL_CHANGE), 600)}/>
        <Input type="text" label={t('searchdataset.fields')}
          onChange={debounce(this.applyFields.bind(this), 600)}/>
        <_subscribedQueryList/>
        <_subscribedDatasetTable editBtn={true} dlBtn={true}/>
      </section>
    )
  }
}

export default translate('pages')(SearchDataset)
