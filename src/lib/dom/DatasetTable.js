import React from 'react'
import {Button, Table, TableHead, TableRow, TableCell} from 'react-toolbox'

import {Dataset} from '../api/dataset.js'

const DatasetTable = ({datasets, keys = [], editBtn=false}) => {
  if(keys.length == 0 && datasets.length > 0){
    for(var m of datasets[0].getMetadata()){
      keys.push(m.key)
    }
  }

  var rows = []
  for(var ds of datasets){
    var cells = []
    for(var k of keys){
      var meta = ds.getMetadata(k)
      cells.push(<TableCell>{meta !== null ? meta.value : ""}</TableCell>)
    }
    rows.push(<TableRow>{cells}{editBtn ?<TableCell><Button icon="create" flat/></TableCell>: ""}</TableRow>)
  }
  return <Table
    heading="true"
  >
    <TableHead>
      {keys.map((item, index) => (<TableCell>{item}</TableCell>))}
      {editBtn ?<TableCell/> :""}
    </TableHead>
    {rows}
  </Table>
}

export default DatasetTable
