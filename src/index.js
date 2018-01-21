import React from 'react'
import {Input} from 'react-toolbox'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import debounce from 'lodash/debounce'

import FilteredDatasetTable from './lib/dom/FilteredDatasetTable'
import BaseLayout from './lib/dom/BaseLayout'
import reducer from './lib/reducers/index'

class Index extends React.Component{
  store = createStore(reducer)

  applyNewFilter = (type, value) => {
    value = value.split('\n')
    this.store.dispatch({
      type: type,
      filter: value
    })
  }

  render(){
    return(
      <Provider store={this.store}>
        <BaseLayout>
          <section>
            <Input type="text" label="Filter" multiline rows={10}
              onChange={debounce(this.applyNewFilter.bind(this, 'FILTER_SINGLE_CHANGE'), 600)}/>
            <Input type="text" label="Filter all" multiline rows={10}
              onChange={debounce(this.applyNewFilter.bind(this, 'FILTER_GLOBAL_CHANGE'), 600)}/>
            <FilteredDatasetTable/>
          </section>
        </BaseLayout>
      </Provider>
    )
  }
}

export default Index
