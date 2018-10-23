import React from 'react'
import {translate} from 'react-i18next'

import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Icon from '@material-ui/core/Icon'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

import {Dataset} from '../api/dsapi/dataset'
import {changePage} from '../util'

class DatasetTable extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      orderBy: '',
      order: 'asc',
      selected: [],
      numRows: 0,
      numChecked: 0
    }
  }

  handleSort = (property, event) => {
    var order = 'desc'
    if(this.state.orderBy === property && this.state.order === 'desc'){
      order = 'asc'
    }
    this.setState({order, orderBy: property})
  }

  getProp = (ds, prop) => {
    var val = ''
    if(prop === 'ID'){
      val = ds.id
    }
    else{
      var m = ds.getMetadata(prop)
      if(m !== null){
        val = m.value
      }
    }
    return val.toLowerCase()
  }

  checkAll = (evt, selectAll) => {
    var selected = selectAll
      ?this.props.datasets.map(ds => ds.id)
      :[]
    this.setState({
      selected: selected,
      numChecked: selectAll ?this.state.numRows :0
    })
  }

  checkDS = (id) => {
    var selected = this.state.selected
    var idx = selected.indexOf(id)
    if(idx < 0){
      selected.push(id)
    }
    else{
      selected.splice(idx, 1)
    }
    this.setState({
      selected: selected,
      numChecked: this.state.numChecked + (idx < 0 ?1 :-1)
    })
  }

  addToCompare = () => {
    if(this.props.onAddToCompare){
      this.props.onAddToCompare(this.state.selected)
    }
  }

  removeFromCompare = () => {
    if(this.props.onRemoveFromCompare){
      this.props.onRemoveFromCompare(this.state.selected)
    }
  }

  toggleCompare = (id) => {
    if(this.props.comparison.includes(id)){
      if(this.props.onAddToCompare){
        this.props.onAddToCompare([id])
      }
    }
    else{
      if(this.props.onRemoveFromCompare){
        this.props.onRemoveFromCompare([id])
      }
    }
  }

  render(){
    const defaultVals = {datasets: [], keys: [], editBtn: false, dlBtn: false}
    var {datasets, keys, editBtn, dlBtn, t} = {...defaultVals, ...this.props}
    var {orderBy, order} = this.state

    this.state.numRows = datasets.length

    // order datasets
    if(orderBy){
      datasets = order === 'desc'
        ? datasets.sort((a, b) => (
          this.getProp(a, orderBy) < this.getProp(b, orderBy) ?-1 :1
        ))
        : datasets.sort((a, b) => (
          this.getProp(a, orderBy) < this.getProp(b, orderBy) ?1 :-1
        ))
    }
    keys = ['ID', ...keys]
    if(keys.length == 1 && datasets.length > 0){
      for(var m of datasets[0].getMetadata()){
        keys.push(m.key)
      }
    }

    // create rows
    var rows = []
    for(var ds of datasets){
      var cells = []
      var checked = this.state.selected.includes(ds.id)
      cells.push(
        <TableCell key={'__checkbox'}>
          <Checkbox checked={checked}/>
        </TableCell>
      )
      cells.push(<TableCell key={'__ID'}>{ds.id}</TableCell>)
      var firstCell = true
      for(var k of keys){
        if(firstCell){
          firstCell = false
          continue
        }
        var meta = ds.getMetadata(k)
        cells.push(<TableCell key={k}>{meta !== null ?meta.value :""}</TableCell>)
      }

      // edit + download button
      var btns = []
      if(this.props.comparison){
        btns.push(
          <Button key='__btncompare' onClick={this.toggleCompare.bind(this, ds.id)}>
            <Icon>compare_arrows</Icon>
          </Button>
        )
      }
      if(editBtn){
        btns.push(
          <Button key='__btnedit' onClick={()=>{changePage('/dataset/'+ds.id)}}>
            <Icon>create</Icon>
          </Button>
        )
      }
      if(dlBtn){
        btns.push(
          <Button key='__btndl' href={ds.getDownloadURL()}>
            <Icon>file_download</Icon>
          </Button>
        )
      }
      if(btns.length > 0){
        cells.push(<TableCell key='__btns'>{btns}</TableCell>)
      }

      // push row
      rows.push(
        <TableRow key={ds.id}
          onClick={this.checkDS.bind(this, ds.id)}
          role="checkbox"
          aria-checked={checked}
          selected={checked}
        >
          {cells}
        </TableRow>
      )
    }
    return (
      <Table>
        <TableHead key="__head">
          <TableRow>
            <TableCell>
              <Checkbox
                indeterminate={
                  this.state.numChecked > 0
                  && this.state.numChecked < this.state.numRows
                }
                checked={this.state.numChecked === this.state.numRows}
                onChange={this.checkAll}
              />
            </TableCell>
            {keys.map((item, index) => (
              <TableCell key={item} sortDirection={orderBy === item ?order :false}>
                <TableSortLabel
                  active={orderBy === item}
                  direction={order}
                  onClick={this.handleSort.bind(this, item)}
                >
                  {item}
                </TableSortLabel>
              </TableCell>
            ))}
            {editBtn ?<TableCell key="__edit"></TableCell> :""}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
          <TableRow>
            <TableCell colSpan={keys.length+2}>
              <Button onClick={this.addToCompare}>
                {t('DatasetTable.addtocompare')}
              </Button>
              <Button onClick={this.removeFromCompare}>
                {t('DatasetTable.removefromcompare')}
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default translate('dom')(DatasetTable)
