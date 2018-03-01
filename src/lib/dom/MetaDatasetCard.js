import React from 'react'
import {Card, CardTitle} from 'react-toolbox'
import {Table, TableHead, TableRow, TableCell} from 'react-toolbox'
import {translate} from 'react-i18next'

const MetaDatasetCard = ({metads, t}) => {
  metadata = metads.getMetadata()
  var rows = Object.keys(metadata).forEach((key) => (
    <TableRow key={key+'__'+metadata[key]}>
      <TableCell key={key}>{key}</TableCell>
      <TableCell key={metadata[key]}>{metadata[key]}</TableCell>
    </TableRow>
  ))
  return (<Card>
      <CardTitle title={metads.id}/>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell key='__head_key'>{t('metadatasetcard.key')}</TableCell>
            <TableCell key='__head_value'>{t('metadatasetcard.value')}</TableCell>
          </TableRow>
        </TableHead>
      {metarows}
      </Table>
    </Card>)
}

export default translate('dom')(MetaDatasetCard)
