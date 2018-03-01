import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider, connect} from 'react-redux'
import {translate} from 'react-i18next'

import {fetchMetadata} from './lib/actions/datasetmeta'
import {MetaDatasetCardCollection} from './lib/dom'
import reducer from './lib/reducers/datasetmeta'

const _subscribedMDColl = connect(
  (state) => ({metadatasets: state.dataset.metadatasets})
)(MetaDatasetCardCollection)

class DatasetMeta extends React.Component{
  constructor(){
    super()
    this.store = createStore(
      reducer,
      applyMiddleware(thunkMiddleware)
    )
  }

  render(){
    return(
      <Provider store={this.store}>
        <_subscribedMDColl/>
      </Provider>
    )
  }
}

export default translate('pages')(DatasetMeta)
