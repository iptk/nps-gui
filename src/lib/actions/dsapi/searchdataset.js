import {Dataset} from '../../api/dsapi'

import {G_START_LOADING, G_STOP_LOADING} from '../_common'
import {NotificationLevel, notifyUser} from '../../util/notification'

const FILTER_GLOBAL_CHANGE = 'FILTER_GLOBAL_CHANGE',
  FILTER_SINGLE_CHANGE = 'FILTER_SINGLE_CHANGE',
  RECEIVE_DATASET = 'RECEIVE_DATASET',
  FIELDS_CHANGE = 'FIELDS_CHANGE',
  COUNT_CHANGE = 'COUNT_CHANGE',
  START_CHANGE = 'START_CHANGE',
  RECOGNIZE_IDS = 'RECOGNIZE_IDS'

const fetchDataset = (filter) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    var filters = []
    var regex = RegExp(/^([a-z\d]{40})$/, 'i')
    var ids = []
    for(var f of filter.single){
      for(var sf of f){
        if(regex.test(sf)){
          ids.push(sf)
        }
      }
      filters.push(filter.global.concat(f))
    }
    if(filters.length === 0 && filter.global.length > 0){ // only global filters
        filters.push(filter.global)
    }

    dispatch({type: RECOGNIZE_IDS, ids: ids})

    // Don't ask the api without a query
    if(filters.length === 0){
      const dummy = {
        datasets: [],
        range:{
          start: 0,
          end: 0,
          max: 0
        }
      }
      dispatch({type: RECEIVE_DATASET, result: dummy})
      dispatch({type: G_STOP_LOADING})
      return
    }

    Dataset.search(filters, filter.fields, filter.start, filter.count)
      .then(res => {
        dispatch({type: RECEIVE_DATASET, result: res})
      })
      .catch(err => {
        notifyUser(dispatch, {
          message: "common.err.fetchmultids",
          level: NotificationLevel.ERROR
        })
      })
      .finally(() => {
        dispatch({type: G_STOP_LOADING})
      })
  }
}

export {
  FILTER_GLOBAL_CHANGE,
  FILTER_SINGLE_CHANGE,
  RECEIVE_DATASET,
  FIELDS_CHANGE,
  COUNT_CHANGE,
  START_CHANGE,
  RECOGNIZE_IDS,
  fetchDataset
}
