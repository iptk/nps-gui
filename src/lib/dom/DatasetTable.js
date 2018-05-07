import React from 'react'
import {Button, Table, TableHead, TableRow, TableCell} from 'react-toolbox'

import {Dataset} from '../api/dataset.js'

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
      btns.push(<Button href={"/dataset/"+ds.id} icon="create" flat/>)
    }
    if(dlBtn){
      btns.push(<Button href={ds.getDownloadURL()} icon="file_download" flat/>)
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
  return (<Table
    heading="true"
  >
    <TableHead key="__head">
      {keys.map((item, index) => (<TableCell key={item}>{item}</TableCell>))}
      {editBtn ?<TableCell key="__edit"></TableCell> :""}
    </TableHead>
    {rows}
  </Table>)
}

export default DatasetTable
