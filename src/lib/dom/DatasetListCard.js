import React from 'react'
import {translate} from 'react-i18next'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

class DatasetListCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expanded: false
    }
  }

  expand(){
    this.setState({
      expanded: !this.state.expanded
    })
  }
  render(){
    var {dsids, onDelete, t} = this.props
    var rows = dsids.map((id) => (
      <ListItem key={id}>
        <ListItemText primary={id}/>
        <ListItemSecondaryAction>
          <IconButton onClick={onDelete.bind(this, id)}>
            <Icon>clear</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))
    return (
      <Card>
        <CardHeader title={t('DatasetListCard.title')}
          action={
            <IconButton onClick={this.expand.bind(this)}>
              <Icon>{this.state.expanded ?'expand_less' :'expand_more'}</Icon>
            </IconButton>
          }
        />
        <Collapse in={this.state.expanded} timeout='auto'>
          <List>
            {rows}
          </List>
        </Collapse>
      </Card>)
  }
}

export default translate('dom')(DatasetListCard)
