import React from 'react'
import ReactDOM from 'react-dom'
import {AppBar, IconButton, Layout, List, ListItem, NavDrawer, Panel, Sidebar} from 'react-toolbox'
import {translate} from 'react-i18next'

class BaseLayout extends React.Component {
  state = {
    drawerActive: false,
    drawerPinned: false,
    sidebarPinned: false
  }

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive })
  }

  toggleDrawerPinned = () => {
    this.setState({ drawerPinned: !this.state.drawerPinned })
  }

  toggleSidebar = () => {
    this.setState({ sidebarPinned: !this.state.sidebarPinned })
  }

  render() {
    const {t} = this.props
    return (
      <Layout>
        <NavDrawer active={this.state.drawerActive}
          pinned={this.state.drawerPinned} permanentAt='xxxl'
          onOverlayClick={ this.toggleDrawerActive }>
            <List selectable ripple>
              <ListItem caption={t('navigation.home')} to="/"/>
              <ListItem caption={t('navigation.searchdataset')} to="/search"/>
            </List>
        </NavDrawer>
        <Panel>
          <AppBar leftIcon='menu' title='NPS' onLeftIconClick={ this.toggleDrawerActive } />
          <br/>
          {this.props.children}
        </Panel>
        <Sidebar pinned={ this.state.sidebarPinned } width={ 5 }>
          <div><IconButton icon='close' onClick={ this.toggleSidebar }/></div>
          <div style={{ flex: 1 }}>
            <p>asdf</p>
          </div>
        </Sidebar>
      </Layout>
    )
  }
}

export default translate('dom')(BaseLayout)
