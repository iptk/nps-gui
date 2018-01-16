import React from 'react';
import {Input} from 'react-toolbox';
import {createStore} from 'react-redux';

import FilteredDatasetTable from './container/FilteredDatasetTable'
import BaseLayout from './dom/BaseLayout';
import render_dom_delayed from './dom/render_dom';
import reducer from './reducers/index';

let store = createStore(reducer);

const applyNewFilter = (type, value) => {
  value = value.split('\n');
  store.dispatch({
    type: type,
    filter: value
  })
}

render_dom_delayed(
  <BaseLayout>
    <section>
      <Input type="text" label="Filter" multiline rows="10"
        onChange={applyNewFilter('FILTER_SINGLE_CHANGE', this.value)}/>
      <Input type="text" label="Filter all" multiline rows="10"
        onChange={applyNewFilter('FILTER_GLOBAL_CHANGE', this.value)}/>
      <FilteredDatasetTable/>
    </section>
  </BaseLayout>
);
