import React from 'react'
import {browserHistory, Router, Route, IndexRoute} from 'react-router'
import {createBrowserHistory} from 'history'

import Index from './index';
import BaseLayout from './lib/dom/BaseLayout'
import render_dom_delayed from './lib/dom/render_dom'

render_dom_delayed(
  <Router history={createBrowserHistory()}>
    <BaseLayout>
      <Route exact path="/" component={Index}/>
    </BaseLayout>
  </Router>
)
