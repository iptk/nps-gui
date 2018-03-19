import React from 'react'
import {Card, CardTitle} from 'react-toolbox'
import {Table, TableHead, TableRow, TableCell} from 'react-toolbox'
import {translate} from 'react-i18next'

const MetaDatasetCard = ({alias, metads, t}) => {
  var metadata = metads.getMetadata()
  var rows = metadata.map((md, _) => {
    var val = md.value
    if(Array.isArray(val)){
      val = val.join('; ')
    }
    return (<TableRow key={md.key+'__'+md.value}>
        <TableCell key={'__key__'+md.key}>{md.key}</TableCell>
        <TableCell key={'__val__'+md.value}>{val}</TableCell>
      </TableRow>)
  })

  var title = alias || metads.id
  var subtitle = alias ?metads.id :''

  return (<Card>
      <CardTitle title={title} subtitle={subtitle}/>
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