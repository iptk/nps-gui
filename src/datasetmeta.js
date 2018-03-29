import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider, connect} from 'react-redux'
import {translate} from 'react-i18next'
import {Button, Card, CardTitle, Snackbar} from 'react-toolbox'

import {
  deleteMetadata,
  fetchDataset,
  fetchMetadataAliases,
  saveMetadata,
  saveTags,
  TAGS_SAVED_SNACKBAR_TIMEOUT,
  ADD_EMPTY_METADATASET
} from './lib/actions/datasetmeta'
import {DatasetFilesCard, MetaDatasetCardCollection, TagCard} from './lib/dom'
import reducer from './lib/reducers/datasetmeta'

// from lib/dom
const _subscribedFilesCard = connect(
  (state) => ({dlbase: state.filesbaseurl, files: state.dataset.files})
)(DatasetFilesCard)

const _subscribedMDColl = connect(
  (state) => ({
    metadatasets: state.dataset.metadatasets,
    aliases: state.maliases.aliases
  })
)(MetaDatasetCardCollection)

const _subscribedTagCard = connect(
  (state) => ({tags: state.dataset.tags})
)(TagCard)

// locally defined
const _actionCardTitle = translate('pages')(connect(
  (state) => ({dsid: state.dataset.id})
)(
  ({dsid, t}) => (
    <CardTitle title={t('datasetmeta.actioncard.title')}
    subtitle={t('datasetmeta.actioncard.dataset')+': '+dsid}/>
  )
))

const _dlBtn = translate('pages')(connect(
  (state) => ({url: state.downloadurl})
)(
  ({url, t}) => (
    <Button href={url} icon="file_download" label={t('datasetmeta.actioncard.download')} flat/>
  )
))

const _tagsSavedSnackbar = translate('pages')(connect(
  (state) => ({active: state.tagsSavedSnackbar})
)(
  ({active, t, onTimeout}) => (
    <Snackbar
      action={t('datasetmeta.tagssnackbarclose')}
      active={active}
      label={t('datasetmeta.tagssnackbarcontent')}
      timeout={2000}
      onTimeout={onTimeout}
      type='accept'
    />
  )
))

class DatasetMeta extends React.Component{
  constructor(props){
    super(props)
    this.store = createStore(
      reducer,
      applyMiddleware(thunkMiddleware)
    )
    this.fetchMAliases = this.fetchMAliases.bind(this)
    this.fetchMAliases()
    this.fetchDs = this.fetchDs.bind(this)
    this.fetchDs()
  }

  fetchMAliases(){
    this.store.dispatch(fetchMetadataAliases())
  }

  fetchDs(){
    this.store.dispatch(fetchDataset(this.props.match.params.dsid))
  }

  tagsSave(tags){
    this.store.dispatch(saveTags(this.store.getState()['dataset'], tags))
  }

  dismissTagsSnackbar(){
    this.store.dispatch({type: TAGS_SAVED_SNACKBAR_TIMEOUT})
  }

  addMetaset(){
    this.store.dispatch({type: ADD_EMPTY_METADATASET})
  }

  saveMetaset(metaset, isNewSet){
    this.store.dispatch(saveMetadata(metaset, isNewSet))
  }

  deleteMetaset(meta, isNewSet){
    this.store.dispatch(deleteMetadata(
      this.store.getState()['dataset'], meta.id, isNewSet
    ))
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
              <Button label={t('datasetmeta.actioncard.reload')} icon='update'
                onMouseUp={this.fetchDs.bind(this)} flat/>
              <Button label={t('datasetmeta.actioncard.reloadmaliases')}
                icon='update' onMouseUp={this.fetchMAliases.bind(this)} flat/>
              <Button label={t('datasetmeta.actioncard.addmetadataset')}
                icon='add' onMouseUp={this.addMetaset.bind(this)} flat/>
            </Card>
            <br/>
          </section>
          <section>
            <_subscribedTagCard onSave={this.tagsSave.bind(this)}/>
            <br/>
          </section>
          <section>
            <_subscribedFilesCard/>
            <br/>
          </section>
          <_subscribedMDColl onSave={this.saveMetaset.bind(this)} onDelete={this.deleteMetaset.bind(this)}/>
          <section>
            <_tagsSavedSnackbar onTimeout={this.dismissTagsSnackbar.bind(this)}/>
          </section>
        </div>
      </Provider>
    )
  }
}

export default translate('pages')(DatasetMeta)
