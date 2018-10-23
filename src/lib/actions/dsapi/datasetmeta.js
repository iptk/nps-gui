import {NPS} from '../../api'
import {Dataset} from '../../api/dsapi'
import {G_START_LOADING, G_STOP_LOADING} from '../_common'
import {NotificationLevel, notifyUser} from '../../util/notification'

const RECEIVE_DATASET = 'RECEIVE_DATASET',
  ALIASES_SAVED = 'ALIASES_SAVED',
  METADATA_SAVED = 'METADATA_SAVED',
  ADD_EMPTY_METADATASET = 'ADD_EMPTY_METADATASET',
  RECEIVE_RELATED_DATASETS = 'RECEIVE_RELATED_DATASETS'

const deleteMetadata = (dataset, metaid) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    if(isNewSet){
      dataset.removeMetaDataset('__empty')
      dataset.metadatasets = {...dataset.metadatasets}
      dispatch({type: RECEIVE_DATASET, result: dataset})
      dispatch({type: G_STOP_LOADING})
    }
    else{
      dataset.deleteMetaDataset(metaid)
        .then(succ => {
          dataset.metadatasets = {...dataset.metadatasets}
          dispatch({type: RECEIVE_DATASET, result: dataset})
          notifyUser(dispatch,{
            message: "datasetmeta.succ.deletemeta",
            level: NotificationLevel.SUCCESS
          })
        })
        .catch(err => {
          notifyUser(dispatch, {
            message: "datasetmeta.err.deletemeta",
            level: NotificationLevel.ERROR
          })
        })
        .finally(() => {
          dispatch({type: G_STOP_LOADING})
        })
    }
  }
}

const fetchDataset = (id) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    Dataset.getByID(id)
      .then(ds => {
        dispatch({type: RECEIVE_DATASET, result: ds})
      })
      .catch(err => {
        notifyUser(dispatch, {
          message: "common.err.fetchsingleds",
          level: NotificationLevel.ERROR
        })
      })
      .finally(() => {
        dispatch({type: G_STOP_LOADING})
      })

  }
}

const saveMetadata = (metaset) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    metaset.save()
      .then(meta => {
        dispatch({
          type: METADATA_SAVED, metadataset: meta, isNewSet: isNewSet
        })
        notifyUser(dispatch, {
          message: "datasetmeta.succ.savemeta",
          level: NotificationLevel.SUCCESS
        })
      })
      .catch(err => {
        notifyUser(dispatch, {
          message: "datasetmeta.err.savemeta",
          level: NotificationLevel.ERROR
        })
      })
      .finally(() => {
        dispatch({type: G_STOP_LOADING})
      })
  }
}

const fetchRelatedDatasets = (id) => {
  return (dispatch) => {
    // TODO:
    // we need an api-call for this!
    var srv = NPS.getServer()
    var url = srv.elasticsearchurl
    url += '/iptk-meta-*/_search?q='+id

    dispatch({type: G_START_LOADING})
    fetch(
        url,
        {
          method: 'GET',
          redirect: 'follow',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: srv.cors,
          credentials: srv.credentials
        }
      )
      .then(resp => resp.json())
      .then(json => {
        if(!json.hits){
          throw "Elasticsearch-request does not contain hits-field"
        }
        var dsids = json.hits.hits.map(hit => hit._id)
        dispatch({type: RECEIVE_RELATED_DATASETS, dsids: dsids})
      })
      .catch(err => {
        notifyUser(dispatch, {
          message: "datasetmeta.err.fetchrelated",
          level: NotificationLevel.ERROR
        })
      })
      .finally(dispatch({type: G_STOP_LOADING}))
  }
}

export {
  deleteMetadata,
  fetchDataset,
  fetchRelatedDatasets,
  saveMetadata,
  ADD_EMPTY_METADATASET,
  RECEIVE_DATASET,
  RECEIVE_RELATED_DATASETS,
  ALIASES_SAVED,
  METADATA_SAVED
}
