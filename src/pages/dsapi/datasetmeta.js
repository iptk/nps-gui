import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {connect} from 'react-redux'
import {withNamespaces} from 'react-i18next'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'

import {
  G_ADD_DATASETS_TO_COMPARISON,
  G_REMOVE_DATASETS_FROM_COMPARISON,
  G_RESTORE_LOCAL_STORE_DEFAULTS,
  gFetchMetadataAliases
} from '../../lib/actions/_common'
import {
  deleteMetadata,
  fetchDataset,
  fetchRelatedDatasets,
  saveMetadata,
  ADD_EMPTY_METADATASET
} from '../../lib/actions/dsapi/datasetmeta'
import {
  DatasetFilesCard,
  DatasetListCard,
  MetaDatasetCardCollection,
  Page
} from '../../lib/dom'
import reducer from '../../lib/reducers/dsapi/datasetmeta'

// from lib/dom
const _subscribedFilesCard = connect(
  (state) => ({dlbase: state.l.filesbaseurl, files: state.l.dataset.files})
)(DatasetFilesCard)

const _subscribedMDColl = connect(
  (state) => ({
    metadatasets: state.l.dataset.metadatasets,
    aliases: state.g.metadataAliases
  })
)(MetaDatasetCardCollection)

const _relatedDSCard = connect(
  (state) => ({dsids: state.l.related})
)(DatasetListCard)

// locally defined
const _actionCardTitle = withNamespaces('pages-dsapi')(connect(
  (state) => ({dsid: state.l.dataset.id})
)(
  ({dsid, t}) => (
    <CardHeader title={t('datasetmeta.actioncard.title')}
    subheader={t('datasetmeta.actioncard.dataset')+': '+dsid}/>
  )
))

const _dlBtn = withNamespaces('pages-dsapi')(connect(
  (state) => ({url: state.l.downloadurl})
)(
  ({url, t}) => (
    <Button href={url} disabled={url == undefined} fullWidth>
      <Icon>file_download</Icon>
      {t('datasetmeta.actioncard.download')}
    </Button>
  )
))

const _compBtn = withNamespaces('pages-dsapi')(connect(
  (state) => ({dsid: state.l.dataset.id, dsComp: state.g.datasetCompare})
)(
  ({dsid, dsComp, onClick, t}) => {
    var inComp = dsid !== undefined && dsComp.includes(dsid)
    return (
      <Button disabled={dsid == undefined} fullWidth
        onClick={onClick.bind(this, inComp
            ?G_REMOVE_DATASETS_FROM_COMPARISON
            :G_ADD_DATASETS_TO_COMPARISON,
          dsid
        )}
      >
        <Icon>{inComp ?'turned_in' :'turned_in_not'}</Icon>
        {inComp
          ?t('datasetmeta.actioncard.removefromcomp')
          :t('datasetmeta.actioncard.addtocomp')
        }
      </Button>
    )
  }
))

class DatasetMeta extends Page{
  constructor(props){
    super(props, reducer)
  }

  componentDidMount(){
    this.initState()
  }

  componentDidUpdate(prevProps){
    if(this.props.match.params.dsid !== prevProps.match.params.dsid){
      this.store.dispatch({type: G_RESTORE_LOCAL_STORE_DEFAULTS})
      this.initState()
    }
  }

  initState(){
    this.fetchMAliases = this.fetchMAliases.bind(this)
    this.fetchMAliases()
    this.fetchDs = this.fetchDs.bind(this)
    this.fetchDs()
    this.store.dispatch(fetchRelatedDatasets(this.props.match.params.dsid))
  }

  fetchMAliases(){
    this.store.dispatch(gFetchMetadataAliases())
  }

  fetchDs(){
    this.store.dispatch(fetchDataset(this.props.match.params.dsid))
  }

  addMetaset(){
    this.store.dispatch({type: ADD_EMPTY_METADATASET})
  }

  saveMetaset(metaset){
    this.store.dispatch(saveMetadata(metaset))
  }

  deleteMetaset(meta, isNewSet){
    this.store.dispatch(deleteMetadata(
      this.store.getState().l.dataset, meta.id, isNewSet
    ))
  }

  toggleComp(signal, dsid){
    this.store.dispatch({type: signal, dsids: [dsid]})
  }

  render(){
    const {t} = this.props
    return super.render(
      <div>
        <section>
          <Card>
            <_actionCardTitle/>
            <_dlBtn/>
            <Button onClick={this.fetchDs.bind(this)} fullWidth>
              <Icon>update</Icon>
              {t('datasetmeta.actioncard.reload')}
            </Button>
            <Button onClick={this.fetchMAliases.bind(this)} fullWidth>
              <Icon>update</Icon>
              {t('datasetmeta.actioncard.reloadmaliases')}
            </Button>
            <Button onClick={this.addMetaset.bind(this)} fullWidth>
              <Icon>add</Icon>
              {t('datasetmeta.actioncard.addmetadataset')}
            </Button>
            <_compBtn onClick={this.toggleComp.bind(this)}/>
          </Card>
          <br/>
        </section>
        <section>
          <_relatedDSCard title={t('datasetmeta.relatedds')}/>
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

export default withNamespaces('pages-dsapi')(DatasetMeta)
