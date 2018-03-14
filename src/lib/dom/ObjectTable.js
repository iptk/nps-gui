import React from 'react'
import {Card, CardTitle} from 'react-toolbox'
import {Table, TableHead, TableRow, TableCell} from 'react-toolbox'
import {translate} from 'react-i18next'

const ObjectTable = ({object, t}) => {
  const flattenDict = (obj, keyPrefix="") => {
    var flat = []
    for(var key of Object.keys(obj)){
      if(typeof obj[key] == 'object'){
        var sub = flattenDict(obj[key], keyPrefix+key+'.')
        flat.push(...sub)
      }
      else{
        flat.push({
          key: keyPrefix+key,
          value: Array.isArray(obj[key]) ?obj[key].join('; ') :obj[key]
        })
      }
    }
    return flat
  }

  var rowData = flattenDict(object)
  var rows = rowData.map((row) => {
    return (<TableRow key={row.key}>
        <TableCell key={'__key__'+row.key}>{row.key}</TableCell>
        <TableCell key={'__val__'+row.key}>{row.value}</TableCell>
      </TableRow>)
  })
  return (<Table selectable={false}>
      <TableHead>
        <TableCell key='__head_key'>{t('ObjectTable.key')}</TableCell>
        <TableCell key='__head_value'>{t('ObjectTable.value')}</TableCell>
      </TableHead>
      {rows}
    </Table>)
}

export default translate('dom')(ObjectTable)
