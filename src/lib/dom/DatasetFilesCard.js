import React from 'react'
import {
  Button, Card, CardTitle, List, ListItem
} from 'react-toolbox'
import {translate} from 'react-i18next'

const DatasetFilesCard = ({dlbase, files, t}) => {
  var rows = files.map((fname) => (
    <ListItem key={fname} caption={fname} leftIcon='file_download'
      to={dlbase+fname}
    />
  ))
  return (<Card>
      <CardTitle title={t('DatasetFilesCard.files')}/>
      <List ripple>
        {rows}
      </List>
    </Card>)
}

export default translate('dom')(DatasetFilesCard)
