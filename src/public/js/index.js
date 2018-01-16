import React from 'react'
import {Input} from 'react-toolbox'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import FilteredDatasetTable from './lib/dom/FilteredDatasetTable'
import BaseLayout from './lib/dom/BaseLayout'
import render_dom_delayed from './lib/dom/render_dom'
import reducer from './lib/reducers/index'

let store = createStore(reducer)

const applyNewFilter = (type, value) => {
  value = value.split('\n')
  store.dispatch({
    type: type,
    filter: value
  })
}

render_dom_delayed(
  <Provider store={store}>
    <BaseLayout>
      <section>
        <Input type="text" label="Filter" multiline rows={10}
          onChange={applyNewFilter.bind(this, 'FILTER_SINGLE_CHANGE')}/>
        <Input type="text" label="Filter all" multiline rows={10}
          onChange={applyNewFilter.bind(this, 'FILTER_GLOBAL_CHANGE')}/>
        <FilteredDatasetTable/>
      </section>
    </BaseLayout>
  </Provider>
)
