import React from 'react';
import ReactDOM from 'react-dom';
import {AppBar, IconButton, Layout, List, ListItem, NavDrawer, Panel, Sidebar} from 'react-toolbox';

class BaseLayout extends React.Component {
  state = {
    drawerActive: false,
    drawerPinned: false,
    sidebarPinned: false
  };

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  };

  toggleDrawerPinned = () => {
    this.setState({ drawerPinned: !this.state.drawerPinned });
  }

  toggleSidebar = () => {
    this.setState({ sidebarPinned: !this.state.sidebarPinned });
  };

  render() {
    return (
      <Layout>
        <NavDrawer active={this.state.drawerActive}
          pinned={this.state.drawerPinned} permanentAt='xxxl'
          onOverlayClick={ this.toggleDrawerActive }>
            <List selectable ripple>
              <ListItem caption="Home" to="#"/>
            </List>
        </NavDrawer>
        <Panel>
          <AppBar leftIcon='menu' title='NPS' onLeftIconClick={ this.toggleDrawerActive } />
          {this.props.children}
        </Panel>
        <Sidebar pinned={ this.state.sidebarPinned } width={ 5 }>
          <div><IconButton icon='close' onClick={ this.toggleSidebar }/></div>
          <div style={{ flex: 1 }}>
            <p>asdf</p>
          </div>
        </Sidebar>
      </Layout>
    );
  }
}

export default BaseLayout;
