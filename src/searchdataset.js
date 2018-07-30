import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'

import {Link} from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import TextField from '@material-ui/core/TextField'

import {FILTER_SINGLE_CHANGE, FILTER_GLOBAL_CHANGE, FIELDS_CHANGE, START_CHANGE, COUNT_CHANGE, fetchDataset} from './lib/actions/searchdataset'
import {DatasetTable, Page, QueryList} from './lib/dom'
import reducer from './lib/reducers/searchdataset'
import {debounceWrapper} from './lib/util'

const _subscribedDatasetTable = connect(
  (state) => ({datasets: state.l.dataset, keys: state.l.filter.fields})
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

const _resultNums = translate('pages')(connect(
  (state) => ({
    start: state.l.filter.start,
    end: state.l.filter.end,
    total: state.l.filter.total
  })
)(
  ({end, start, total, t}) => (<p>{t('searchdataset.results')} {start} - {end} / {total}</p>)
))

const _directDSLinks = translate('pages')(connect(
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
          <Button component={Link} to={'/dataset/'+id}>{id}</Button>
        ))}
      </p>
    )
  }
))

class SearchDataset extends Page{
  constructor(props){
    super(props, reducer)
    this.store.dispatch({type: FIELDS_CHANGE, fields: ["PatientName", "SeriesDescription", "AcquisitionDate", "SeriesDate"]})
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

  render(){
    const {classes, t} = this.props
    return super.render(
      <section>
        <TextField type="text" label={t('searchdataset.filter_single')}
          fullWidth multiline rows={5} margin='normal'
          onChange={debounceWrapper(this.applyNewFilter.bind(this, FILTER_SINGLE_CHANGE), 600)}/>
        <TextField type="text" label={t('searchdataset.filter_global')}
          fullWidth margin='normal'
          onChange={debounceWrapper(this.applyNewFilter.bind(this, FILTER_GLOBAL_CHANGE), 600)}/>
        <TextField type="text" label={t('searchdataset.fields')}
          fullWidth margin='normal'
          defaultValue="PatientName,SeriesDescription,AcquisitionDate,SeriesDate"
          onChange={debounceWrapper(this.applyFields.bind(this), 600)}/>
        <br/>
        <section>
          <TextField type="number" label={t('searchdataset.resultcount')}
            fullWidth margin='normal'
            onChange={debounceWrapper(this.changeCount.bind(this), 600)}
            defaultValue="10"/>
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
        <_subscribedDatasetTable editBtn={true} dlBtn={true}/>
      </section>
    )
  }
}

export default translate('pages')(SearchDataset)
