import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider, connect} from 'react-redux'
import {translate} from 'react-i18next'
import {Button, Card, CardTitle} from 'react-toolbox'

import {
  fetchMetadata, TAGS_ADDEMPTY, TAGS_UPDATETMP
} from './lib/actions/datasetmeta'
import {MetaDatasetCardCollection, TagCard} from './lib/dom'
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

const _actionCardTitle = translate('pages')(connect(
  (state) => ({dsid: state.dataset.id})
)(
  ({dsid, t}) => (
    <CardTitle title={t('datasetmeta.actioncard.title')}
    subtitle={t('datasetmeta.actioncard.dataset')+': '+dsid}/>
  )
))

const _subscribedTagCard = connect(
  (state) => ({tags: state.tmpTags})
)(TagCard)

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

  tagsAdd(){
    this.store.dispatch({type: TAGS_ADDEMPTY})
    console.log(this.store.getState())
  }

  tagsDelete(deleted, remaining){
    this.store.dispatch({type: TAGS_UPDATETMP, tags: remaining})
  }

  tagsSave(tags){
    //
  }

  tagsEdit(prev, after, all){
    this.store.dispatch({type: TAGS_UPDATETMP, tags: all})
  }

  render(){
    const {t} = this.props
    return(
      <Provider store={this.store}>
        <div>
          <section>
            <Card>
              <_actionCardTitle/>
              <_dlBtn/>
            </Card>
            <br/>
          </section>
          <section>
            <_subscribedTagCard
              onAddTag={this.tagsAdd.bind(this)}
              onDelete={this.tagsDelete.bind(this)}
              onSave={this.tagsSave.bind(this)}
              />
            <br/>
          </section>
          <_subscribedMDColl/>
        </div>
      </Provider>
    )
  }
}

export default translate('pages')(DatasetMeta)
