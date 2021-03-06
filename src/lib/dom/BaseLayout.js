import React from 'react'
import ReactDOM from 'react-dom'
import {translate} from 'react-i18next'

import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'

import {changePage} from '../util'

import NPSContext from '../util/NPSContext'

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar
})

@withStyles(styles)
class BaseLayout extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }

  changePage(url){
    this.props.history.push(url)
  }

  toggleDrawer = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const {classes, t, version} = this.props
    const drawer = (
      <div>
        <div className={classes.toolbar}/>
        <List>
          <ListItem onClick={()=>{changePage('/')}} button>
            <ListItemText primary={t('navigation.home')}/>
          </ListItem>
          <ListItem onClick={()=>{changePage('/search')}} button>
            <ListItemText primary={t('navigation.searchdataset')}/>
          </ListItem>
          <ListItem onClick={()=>{changePage('/metadata/collections')}} button>
            <ListItemText primary={t('navigation.metadatasetcollections')}/>
          </ListItem>
          <ListItem onClick={()=>{changePage('/datasets/compare')}} button>
            <ListItemText primary={t('navigation.datasetcompare')}/>
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText primary={version[0]} secondary={version[1]}/>
          </ListItem>
        </List>
      </div>
    )
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <IconButton onClick={this.toggleDrawer} color="inherit">
              <Icon>menu</Icon>
            </IconButton>
            <NPSContext.custom.Consumer>
            {({__page}) => (
            <Typography variant="title" color="inherit" noWrap>
              {__page.title}
            </Typography>
            )}
            </NPSContext.custom.Consumer>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          open={this.state.open}
          onClose={this.toggleDrawer}
          ModalProps={{
            keepMounted: true
          }}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
        <main>
          <div className={classes.toolbar}/>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default translate('dom')(BaseLayout)
