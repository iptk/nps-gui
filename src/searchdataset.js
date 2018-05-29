import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import TextField from '@material-ui/core/TextField'

import {FILTER_SINGLE_CHANGE, FILTER_GLOBAL_CHANGE, FIELDS_CHANGE, START_CHANGE, COUNT_CHANGE, fetchDataset} from './lib/actions/searchdataset'
import {DatasetTable, Page, QueryList} from './lib/dom'
import reducer from './lib/reducers/searchdataset'
import {debounceWrapper} from './lib/util'

const _subscribedDatasetTable = connect(
  (state) => ({datasets: state.s.dataset, keys: state.s.filter.fields})
)(DatasetTable)

const _subscribedQueryList = connect(
  (state) => {
    var chips = []
    for(var single of state.s.filter.single){
      chips.push(single.concat(state.s.filter.global))
    }
    return {
      queryVals: chips
    }
  }
)(QueryList)

const _resultNums = translate('page')(connect(
  (state) => ({
    start: state.s.filter.start,
    end: state.s.filter.start + state.s.dataset.length
  })
)(
  ({end, start, t}) => (<p>{t('searchdataset.results')} {start} - {end}</p>)
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
    this.store.dispatch(fetchDataset(this.store.getState().s.filter))
  }

  applyFields(target){
    var fields = target.value.split(',')
    this.store.dispatch({type: FIELDS_CHANGE, fields: fields})
    this.store.dispatch(fetchDataset(this.store.getState().s.filter))
  }

  changeCount(target){
    this.store.dispatch({type: COUNT_CHANGE, count: target.value})
    this.store.dispatch(fetchDataset(this.store.getState().s.filter))
  }

  changeStart(forward){
    this.store.dispatch({type: START_CHANGE, forward: forward})
    this.store.dispatch(fetchDataset(this.store.getState().s.filter))
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
