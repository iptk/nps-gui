import React from 'react'
import {List, ListItem, ListSubHeader, Chip} from 'react-toolbox'

const QueryList = ({queryVals}) => {
  var items = queryVals.map((chips, i) => {
    chips = chips.map((chip, j) => (<Chip key={chip+j}>{chip}</Chip>))
    return <ListItem key={chips.join()+i} itemContent={<div>{chips}</div>}/>
  })
  return (
    <List>
      <ListSubHeader caption="Queries"/>
      {items}
    </List>
  )
}

export default QueryList
