import React from 'react'
import {browserHistory, Router, Route, IndexRoute} from 'react-router'
import {I18nextProvider} from 'react-i18next'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

import NPS from './lib/api'

import Pages from './pages';
import {SearchDataset} from './pages/dsapi'
import {BaseLayout} from './lib/dom'
import render_dom_delayed from './lib/dom/render_dom'
import {i18n, history} from './lib/util'

import loadTheme from './lib/util/theme'
import {loadDefaults, loadCustom, loadVersion} from './lib/util/custom-nps'
import NPSContext from './lib/util/NPSContext'

Promise.all([
  // fetch backend-configuration
  NPS.fetchConfiguration(window.location.origin+'/conf/srvlist'),
  // load theme
  loadTheme(),
  // customisation
  loadDefaults(),
  loadCustom(),
  loadVersion()
]).then(results => {
  const muiTheme = createMuiTheme(results[1])
  render_dom_delayed(
    <I18nextProvider i18n={i18n}>
      <Router history={history}>
        <MuiThemeProvider theme={muiTheme}>
          <NPSContext.Provider defaults={results[2]} custom={results[3]}>
            <BaseLayout version={results[4]}>
              <Route exact path="/" component={SearchDataset}/>
              <Route path="/ds" render={() => <Pages.DsAPI urlbase="/ds"/>}/>
              <Route path="/st" render={() => <Pages.MAPI urlbase="/st"/>}/>
            </BaseLayout>
          </NPSContext.Provider>
        </MuiThemeProvider>
      </Router>
    </I18nextProvider>
  )
})
