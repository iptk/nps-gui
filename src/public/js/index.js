import React from 'react'
import {Input} from 'react-toolbox'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import debounce from 'lodash/debounce'

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
          onChange={debounce(applyNewFilter.bind(this, 'FILTER_SINGLE_CHANGE'), 600)}/>
        <Input type="text" label="Filter all" multiline rows={10}
          onChange={debounce(applyNewFilter.bind(this, 'FILTER_GLOBAL_CHANGE'), 600)}/>
        <FilteredDatasetTable/>
      </section>
    </BaseLayout>
  </Provider>
)
