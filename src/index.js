import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {Input} from 'react-toolbox'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider, connect} from 'react-redux'
import debounce from 'lodash/debounce'
import {translate} from 'react-i18next'

import {FILTER_SINGLE_CHANGE, FILTER_GLOBAL_CHANGE, fetchDataset} from './lib/actions/index'
import FilteredDatasetTable from './lib/dom/FilteredDatasetTable'
import QueryList from './lib/dom/QueryList'
import reducer from './lib/reducers/index'

const _subscribedFilteredDatasetTable = connect(
  (state) => ({datasets: state.dataset})
)(FilteredDatasetTable)

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

class Index extends React.Component{
  constructor(){
    super()
    this.store = createStore(
      reducer,
      applyMiddleware(thunkMiddleware)
    )
  }

  applyNewFilter(type, val){
    // update filters in store
    this.store.dispatch({type: type, filter: val})

    // fetch dataset
    this.store.dispatch(fetchDataset(this.store.getState().filter))
  }

  render(){
    const {t} = this.props
    return(
      <Provider store={this.store}>
        <section>
          <Input type="text" label={t('index.filter_single')} multiline rows={10}
            onChange={debounce(this.applyNewFilter.bind(this, FILTER_SINGLE_CHANGE), 600)}/>
          <Input type="text" label={t('index.filter_global')}
            onChange={debounce(this.applyNewFilter.bind(this, FILTER_GLOBAL_CHANGE), 600)}/>
          <_subscribedQueryList/>
          <_subscribedFilteredDatasetTable/>
        </section>
      </Provider>
    )
  }
}

export default translate('pages')(Index)
