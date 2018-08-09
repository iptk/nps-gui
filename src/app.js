import React from 'react'
import {browserHistory, Router, Route, IndexRoute} from 'react-router'
import {I18nextProvider} from 'react-i18next'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

import NPS from './lib/api'

import {
  DatasetCompare,
  DatasetMeta,
  MetadataCollections,
  SearchDataset
} from './index';
import {BaseLayout} from './lib/dom'
import render_dom_delayed from './lib/dom/render_dom'
import {i18n, history} from './lib/util'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4a148c'
    },
    secondary: {
      main: '#d81b60'
    }
  }
})
NPS.fetchConfiguration(window.location.origin+'/conf/srvlist')
  .then(() => render_dom_delayed(
      <I18nextProvider i18n={i18n}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
            <BaseLayout>
              <Route exact path="/" component={SearchDataset}/>
              <Route path="/search" component={SearchDataset}/>
              <Route path="/dataset">
                <Route path="/dataset/:dsid" component={DatasetMeta}/>
              </Route>
              <Route path="/datasets">
                <Route path="/datasets/compare" component={DatasetCompare}/>
              </Route>
              <Route path="/metadata">
                <Route path="/metadata/collections" component={MetadataCollections}/>
              </Route>
            </BaseLayout>
          </MuiThemeProvider>
        </Router>
      </I18nextProvider>
    )
  )
