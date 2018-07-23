import React from 'react'
import {translate} from 'react-i18next'

import Checkbox from '@material-ui/core/Checkbox'
import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import CollapsableCard from './CollapsableCard'

class ChooseMetaDatasetsCard extends CollapsableCard{
  onSelectionChange = (mid, checked) => {
    if(this.props.onStatusChange){
      this.props.onStatusChange(mid, checked)
    }
  }

  render(){
    var {datasets, metaaliases, t} = this.props
    var dsCount = datasets.length
    var mdCount = {}
    var onSelCh = this.onSelectionChange.bind(this)

    datasets.forEach((ds) => {
      Object.keys(ds.metadatasets).forEach((mid) => {
        if(mid in mdCount){
          mdCount[mid]++
        }
        else{
          mdCount[mid] = 1
        }
      })
    })

    var rows = Object.keys(mdCount).map((mid) => (
      <ListItem button key={mid} dense button>
        <Checkbox onChange={(evt, checked) => onSelCh(mid, checked)}
          disableRipple
        />
        <ListItemText primary={
          (mid in metaaliases ?metaaliases[mid] :mid)
          + ` (${mdCount[mid]} / ${dsCount})`
        }/>
      </ListItem>
    ))

    return super.render(
      t('ChooseMetaDatasetsCard.metasets'),
      <List>
        {rows}
      </List>
    )
  }
}

export default translate('dom')(ChooseMetaDatasetsCard)
