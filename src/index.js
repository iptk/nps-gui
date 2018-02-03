import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {Input} from 'react-toolbox'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider, connect} from 'react-redux'
import debounce from 'lodash/debounce'

import {FILTER_SINGLE_CHANGE, FILTER_GLOBAL_CHANGE, fetchDataset} from './lib/actions/index'
import FilteredDatasetTable from './lib/dom/FilteredDatasetTable'
import reducer from './lib/reducers/index'

const _subscribedFilteredDatasetTable = connect(
  (state) => ({datasets: state.dataset})
)(FilteredDatasetTable)

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
    val = val.split('\n')
    this.store.dispatch({type: type, filter: val})

    // fetch dataset
    this.store.dispatch(fetchDataset(this.store.getState().filter))
  }

  render(){
    return(
      <Provider store={this.store}>
        <section>
          <Input type="text" label="Filter" multiline rows={10}
            onChange={debounce(this.applyNewFilter.bind(this, FILTER_SINGLE_CHANGE), 600)}/>
          <Input type="text" label="Filter all" multiline rows={10}
            onChange={debounce(this.applyNewFilter.bind(this, FILTER_GLOBAL_CHANGE), 600)}/>
          <_subscribedFilteredDatasetTable/>
        </section>
      </Provider>
    )
  }
}

export default Index
