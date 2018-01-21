import React from 'react'
import {createStore} from 'redux'

import Index from './index';
import render_dom_delayed from './lib/dom/render_dom'
import reducer from './lib/reducers/global'

// two stores is a bad approach and only temporary
// they will be combined to a single store soon
let global_store = createStore(reducer)

render_dom_delayed(
  <Index global_store={global_store}/>
)
