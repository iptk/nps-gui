import React from 'react'
import {translate} from 'react-i18next'

import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import CollapsableCard from './CollapsableCard'

class DatasetFilesCard extends CollapsableCard{
  render(){
    var {dlbase, files, t} = this.props
    var rows = files.map((fname) => (
      <ListItem button key={fname}
        onClick={() => window.open(dlbase+fname, '_blank')}
      >
        <ListItemIcon>
          <Icon>file_download</Icon>
        </ListItemIcon>
        <ListItemText primary={fname}/>
      </ListItem>
    ))
    return super.render(
      t('DatasetFilesCard.files'),
      <List>
        {rows}
      </List>
    )
  }
}

export default translate('dom')(DatasetFilesCard)
