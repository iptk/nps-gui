import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {connect} from 'react-redux'
import {withNamespaces} from 'react-i18next'

import {Link} from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import TextField from '@material-ui/core/TextField'

import {
  G_ADD_DATASETS_TO_COMPARISON,
  G_REMOVE_DATASETS_FROM_COMPARISON
} from '../../lib/actions/_common'
import {FILTER_SINGLE_CHANGE, FILTER_GLOBAL_CHANGE, FIELDS_CHANGE, START_CHANGE, COUNT_CHANGE, fetchDataset} from '../../lib/actions/dsapi/searchdataset'
import {DatasetTable, Page, QueryList} from '../../lib/dom'
import reducer from '../../lib/reducers/dsapi/searchdataset'
import {debounceWrapper} from '../../lib/util'
import {notifyUser, NotificationLevel} from '../../lib/util/notification.js'
import NPSContext from '../../lib/util/NPSContext'

const _subscribedDatasetTable = connect(
  (state) => ({
    datasets: state.l.dataset,
    keys: state.l.filter.fields,
    comparison: state.g.datasetCompare
  })
)(DatasetTable)

const _subscribedQueryList = connect(
  (state) => {
    var chips = []
    for(var single of state.l.filter.single){
      chips.push(single.concat(state.l.filter.global))
    }
    return {
      queryVals: chips
    }
  }
)(QueryList)

const _resultNums = withNamespaces('pages-dsapi')(connect(
  (state) => ({
    start: state.l.filter.start,
    end: state.l.filter.end,
    total: state.l.filter.total
  })
)(
  ({end, start, total, t}) => {
    if(total != 0){
      start += 1
      end += 1
      total += 1
    }
    return(
      <p>{t('searchdataset.results')} {start} - {end} / {total}</p>
    )
  }
))

const _directDSLinks = withNamespaces('pages-dsapi')(connect(
  (state) => ({ids: state.l.filter.recognizedIDs})
)(
  ({ids, t}) => {
    if(ids.length === 0){
      return null
    }
    return (
      <p>
        {t('searchdataset.jumptods')}
        {ids.map((id) => (
          <Button component={Link} to={'/ds/dataset/'+id}>{id}</Button>
        ))}
      </p>
    )
  }
))

class SearchDataset extends Page{
  constructor(props){
    super(props, reducer)
  }

  componentDidMount(){
    this.applyDefaults()
  }

  applyDefaults(searchdataset){
    this.store.dispatch({
      type: FILTER_SINGLE_CHANGE,
      filter: this.props.npsdefaults.filter
    })
    this.store.dispatch({
      type: COUNT_CHANGE, count: this.props.npsdefaults.count
    })
    this.store.dispatch({
      type: FIELDS_CHANGE, fields: this.props.npsdefaults.fields.split(',')
    })
    this.applyNewFilter(
      FILTER_GLOBAL_CHANGE, {value: this.props.npsdefaults.filterGlobal}
    )
  }

  applyNewFilter(type, target){
    // update filters in store
    this.store.dispatch({type: type, filter: target.value})

    // fetch dataset
    this.store.dispatch(fetchDataset(this.store.getState().l.filter))
  }

  applyFields(target){
    var fields = target.value.split(',')
    this.store.dispatch({type: FIELDS_CHANGE, fields: fields})
    this.store.dispatch(fetchDataset(this.store.getState().l.filter))
  }

  changeCount(target){
    this.store.dispatch({type: COUNT_CHANGE, count: target.value})
    this.store.dispatch(fetchDataset(this.store.getState().l.filter))
  }

  changeStart(forward){
    this.store.dispatch({type: START_CHANGE, forward: forward})
    this.store.dispatch(fetchDataset(this.store.getState().l.filter))
  }

  notifyDSCompChange(ids, type){
    if(!ids || Array.isArray(ids) && ids.length === 0){
      return
    }
    this.store.dispatch({type: G_ADD_DATASETS_TO_COMPARISON, dsids: ids})
    notifyUser(this.store.dispatch,
      {
        level: NotificationLevel.SUCCESS,
        message: "searchdataset.updatedcomp",
        link: {
          href: '/ds/datasets/compare', text: '_common.go', needsTranslation: true
        }
      }
    )
  }

  addToCompare(ids){
    this.notifyDSCompChange(ids, G_ADD_DATASETS_TO_COMPARISON)
  }

  removeFromCompare(ids){
    this.notifyDSCompChange(ids, G_REMOVE_DATASETS_FROM_COMPARISON)
  }

  render(){
    const {classes, npsdefaults, t} = this.props
    return super.render(
      <section>
        <TextField type="text" label={t('searchdataset.filter_single')}
          fullWidth multiline rows={5} margin='normal'
          defaultValue={npsdefaults.filter}
          onChange={debounceWrapper(this.applyNewFilter.bind(this, FILTER_SINGLE_CHANGE), 600)}/>
        <TextField type="text" label={t('searchdataset.filter_global')}
          fullWidth margin='normal'
          defaultValue={npsdefaults.filterGlobal}
          onChange={debounceWrapper(this.applyNewFilter.bind(this, FILTER_GLOBAL_CHANGE), 600)}/>
        <TextField type="text" label={t('searchdataset.fields')}
          fullWidth margin='normal'
          defaultValue={npsdefaults.fields}
          onChange={debounceWrapper(this.applyFields.bind(this), 600)}/>
        <br/>
        <section>
          <TextField type="number" label={t('searchdataset.resultcount')}
            fullWidth margin='normal'
            onChange={debounceWrapper(this.changeCount.bind(this), 600)}
            defaultValue={npsdefaults.count}/>
          <_directDSLinks/>
          <Button onClick={this.changeStart.bind(this, false)} variant='flat'>
            <Icon>chevron_left</Icon>
            {t('searchdataset.pagebackwards')}
          </Button>
          <Button onClick={this.changeStart.bind(this, true)} variant='flat'>
            {t('searchdataset.pageforwards')}
            <Icon>chevron_right</Icon>
          </Button>
          <_resultNums/>
        </section>
        <_subscribedQueryList/>
        <_subscribedDatasetTable editBtn={true} dlBtn={true}
          onAddToCompare={this.addToCompare.bind(this)}
          onRemoveFromCompare={this.removeFromCompare.bind(this)}
        />
      </section>
    )
  }
}

export default withNamespaces('pages-dsapi')(
  (props) => (
    <NPSContext.defaults.Consumer>
      {({searchdataset}) => (
        <SearchDataset npsdefaults={searchdataset} {...props}/>
      )}
    </NPSContext.defaults.Consumer>
  )
)
