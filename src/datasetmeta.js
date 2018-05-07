import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {Button, Card, CardTitle, Snackbar} from 'react-toolbox'

import {
  deleteMetadata,
  fetchDataset,
  fetchMetadataAliases,
  saveMetadata,
  ADD_EMPTY_METADATASET
} from './lib/actions/datasetmeta'
import {DatasetFilesCard, MetaDatasetCardCollection, Page} from './lib/dom'
import reducer from './lib/reducers/datasetmeta'

// from lib/dom
const _subscribedFilesCard = connect(
  (state) => ({dlbase: state.s.filesbaseurl, files: state.s.dataset.files})
)(DatasetFilesCard)

const _subscribedMDColl = connect(
  (state) => ({
    metadatasets: state.s.dataset.metadatasets,
    aliases: state.s.maliases.aliases
  })
)(MetaDatasetCardCollection)

// locally defined
const _actionCardTitle = translate('pages')(connect(
  (state) => ({dsid: state.s.dataset.id})
)(
  ({dsid, t}) => (
    <CardTitle title={t('datasetmeta.actioncard.title')}
    subtitle={t('datasetmeta.actioncard.dataset')+': '+dsid}/>
  )
))

const _dlBtn = translate('pages')(connect(
  (state) => ({url: state.s.downloadurl})
)(
  ({url, t}) => (
    <Button href={url} disabled={url == undefined} icon="file_download" label={t('datasetmeta.actioncard.download')} flat/>
  )
))

class DatasetMeta extends Page{
  constructor(props){
    super(props, reducer)
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

  addMetaset(){
    this.store.dispatch({type: ADD_EMPTY_METADATASET})
  }

  saveMetaset(metaset, isNewSet){
    this.store.dispatch(saveMetadata(metaset, isNewSet))
  }

  deleteMetaset(meta, isNewSet){
    this.store.dispatch(deleteMetadata(
      this.store.getState().s.dataset, meta.id, isNewSet
    ))
  }

  render(){
    const {t} = this.props
    return super.render(
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
          <_subscribedFilesCard/>
          <br/>
        </section>
        <_subscribedMDColl onSave={this.saveMetaset.bind(this)} onDelete={this.deleteMetaset.bind(this)}/>
      </div>
    )
  }
}

export default translate('pages')(DatasetMeta)
