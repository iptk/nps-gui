import React from 'react'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import {Dataset} from '../api/dataset'
import {changePage} from '../util'

const DatasetTable = ({datasets, keys = [], editBtn=false, dlBtn=false}) => {
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
          {keys.map((item, index) => (<TableCell key={item}>{item}</TableCell>))}
          {editBtn ?<TableCell key="__edit"></TableCell> :""}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows}
      </TableBody>
    </Table>
  )
}

export default DatasetTable
