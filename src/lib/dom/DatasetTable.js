import React from 'react'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

import {Dataset} from '../api/dataset'
import {changePage} from '../util'

class DatasetTable extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      orderBy: '',
      order: 'asc'
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

  render(){
    const defaultVals = {datasets: [], keys: [], editBtn: false, dlBtn: false}
    var {datasets, keys, editBtn, dlBtn} = {...defaultVals, ...this.props}
    var {orderBy, order} = this.state
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

    var rows = []
    for(var ds of datasets){
      var cells = []
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
        <TableRow key={ds.id}>
          {cells}
        </TableRow>
      )
    }
    return (
      <Table>
        <TableHead key="__head">
          <TableRow>
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
        </TableBody>
      </Table>
    )
  }
}

export default DatasetTable
