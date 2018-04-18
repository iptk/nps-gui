import React from 'react'
import {browserHistory, Router, Route, IndexRoute} from 'react-router'
import {createBrowserHistory} from 'history'
import {I18nextProvider} from 'react-i18next'

import {
  DatasetMeta,
  JobsOverview,
  MetadataCollections,
  SearchDataset
} from './index';
import {BaseLayout} from './lib/dom'
import render_dom_delayed from './lib/dom/render_dom'
import i18n from './lib/util/i18n'

render_dom_delayed(
  <I18nextProvider i18n={i18n}>
    <Router history={createBrowserHistory()}>
      <BaseLayout>
        <Route exact path="/" component={SearchDataset}/>
        <Route path="/search" component={SearchDataset}/>
        <Route path="/dataset">
          <Route path="/dataset/:dsid" component={DatasetMeta}/>
        </Route>
        <Route path="/jobs">
          <Route exact path="/jobs" component={JobsOverview}/>
        </Route>
        <Route path="/metadata">
          <Route path="/metadata/collections" component={MetadataCollections}/>
        </Route>
      </BaseLayout>
    </Router>
  </I18nextProvider>
)
