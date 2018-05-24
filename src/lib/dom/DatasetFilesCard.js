import React from 'react'
import {translate} from 'react-i18next'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

class DatasetFilesCard extends React.Component{
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
    return (
      <Card>
        <CardHeader title={t('DatasetFilesCard.files')}
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

export default translate('dom')(DatasetFilesCard)
