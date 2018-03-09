import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider, connect} from 'react-redux'
import {translate} from 'react-i18next'
import {Button, Card, CardTitle} from 'react-toolbox'

import {fetchMetadata} from './lib/actions/datasetmeta'
import {MetaDatasetCardCollection} from './lib/dom'
import reducer from './lib/reducers/datasetmeta'

const _subscribedMDColl = connect(
  (state) => ({metadatasets: state.dataset.metadatasets})
)(MetaDatasetCardCollection)

const _dlBtn = translate('pages')(connect(
  (state) => ({url: state.downloadurl})
)(
  ({url, t}) => (
    <Button href={url} icon="file_download" label={t('datasetmeta.actioncard.download')} flat/>
  )
))

class DatasetMeta extends React.Component{
  constructor(props){
    super(props)
    this.store = createStore(
      reducer,
      applyMiddleware(thunkMiddleware)
    )
    this.fetchMeta = this.fetchMeta.bind(this)
    this.fetchMeta()
  }

  fetchMeta(){
    this.store.dispatch(fetchMetadata(this.props.match.params.dsid))
  }

  render(){
    const {t} = this.props
    return(
      <Provider store={this.store}>
        <div>
          <section>
            <Card>
              <CardTitle title={t('datasetmeta.actioncard.title')}/>
              <_dlBtn/>
            </Card>
            <br/>
          </section>
          <_subscribedMDColl/>
        </div>
      </Provider>
    )
  }
}

export default translate('pages')(DatasetMeta)
