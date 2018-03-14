import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider, connect} from 'react-redux'
import {translate} from 'react-i18next'
import {Button, Card, CardTitle, Snackbar} from 'react-toolbox'

import {fetchDataset, saveTags, TAGS_SAVED_SNACKBAR_TIMEOUT} from './lib/actions/datasetmeta'
import {DatasetFilesCard, MetaDatasetCardCollection, TagCard} from './lib/dom'
import reducer from './lib/reducers/datasetmeta'

// from lib/dom
const _subscribedFilesCard = connect(
  (state) => ({dlbase: state.filesbaseurl, files: state.dataset.files})
)(DatasetFilesCard)

const _subscribedMDColl = connect(
  (state) => ({metadatasets: state.dataset.metadatasets})
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
    this.fetchDs = this.fetchDs.bind(this)
    this.fetchDs()
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
          <_subscribedMDColl/>
          <section>
            <_tagsSavedSnackbar onTimeout={this.dismissTagsSnackbar.bind(this)}/>
          </section>
        </div>
      </Provider>
    )
  }
}

export default translate('pages')(DatasetMeta)
