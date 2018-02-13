import React from 'react'
import {Table, TableHead, TableRow, TableCell} from 'react-toolbox'

import {Dataset} from '../api/dataset.js'

const DatasetTable = ({datasets, keys = []}) => {
  if(keys.length = 0 && datasets.length > 0){
    for(var m of datasets[0].getMetadata()){
      keys.append(m.key)
    }
  }
  console.log(datasets)

  var rows = []
  for(var ds of datasets){
    var cells = []
    for(var k of keys){
      cells.push(<TableCell>{datasets.getMetadata(k).value}</TableCell>)
    }
    rows.push(<TableRow>{cells}</TableRow>)
  }
  return <Table
    heading="true"
  >
    <TableHead>
      {keys.map((item, index) => (<TableCell></TableCell>))}
    </TableHead>
    {rows}
  </Table>
}

export default DatasetTable
