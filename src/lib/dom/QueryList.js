import React from 'react'
import {List, ListItem, ListSubHeader, Chip} from 'react-toolbox'
import {translate} from 'react-i18next'

const QueryList = ({queryVals, t}) => {
  var items = queryVals.map((chips, i) => {
    chips = chips.map((chip, j) => (<Chip key={chip+j}>{chip}</Chip>))
    return <ListItem key={chips.join()+i} itemContent={<div>{chips}</div>}/>
  })
  return (
    <List>
      <ListSubHeader caption={t('QueryList.queries')}/>
      {items}
    </List>
  )
}

export default translate('dom')(QueryList)
