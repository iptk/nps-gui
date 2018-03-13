import React from 'react'
import {Card, CardTitle} from 'react-toolbox'
import {Table, TableHead, TableRow, TableCell} from 'react-toolbox'
import {translate} from 'react-i18next'

const MetaDatasetCard = ({metads, t}) => {
  var metadata = metads.getMetadata()
  var rows = metadata.map((md, _) => (
    <TableRow key={md.key+'__'+md.value}>
      <TableCell key={'__key__'+md.key}>{md.key}</TableCell>
      <TableCell key={'__val__'+md.value}>{md.value}</TableCell>
    </TableRow>
  ))
  return (<Card>
      <CardTitle title={metads.id}/>
      <Table selectable={false}>
        <TableHead>
          <TableCell key='__head_key'>{t('MetaDatasetCard.key')}</TableCell>
          <TableCell key='__head_value'>{t('MetaDatasetCard.value')}</TableCell>
        </TableHead>
      {rows}
      </Table>
    </Card>)
}

export default translate('dom')(MetaDatasetCard)
