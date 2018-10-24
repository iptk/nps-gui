import React from 'react'
import {withNamespaces} from 'react-i18next'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

import {Link} from 'react-router-dom'

import CollapsableCard from './CollapsableCard'

class DatasetListCard extends CollapsableCard{
  onDelete = (id) => {
    if(this.props.onDelete){
      this.props.onDelete(id)
    }
  }
  render(){
    var {dsids, onDelete, t, title} = this.props
    var rows = dsids.map((id) => (
      <ListItem key={id}>
        <ListItemText primary={
          <Link to={"/ds/dataset/"+id}>{id}</Link>
        }/>
        {onDelete &&
          <ListItemSecondaryAction>
            <IconButton onClick={this.onDelete.bind(this, id)}>
              <Icon>clear</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        }
      </ListItem>
    ))
    return super.render(
      title || t('DatasetListCard.title'),
      <List>
        {rows}
      </List>
    )
  }
}

export default withNamespaces('dom')(DatasetListCard)
