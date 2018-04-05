import React from 'react'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider, connect} from 'react-redux'
import {translate} from 'react-i18next'

import commonReducer from '../reducers/_common'

class Page extends React.Component{
  constructor(props, reducer){
    super(props)
    var mergedReducer = combineReducers({
      s: reducer,       // s: _specific_ for the page
      c: commonReducer  // c: _common_ for every page
    })
    this.store = createStore(
      mergedReducer,
      applyMiddleware(thunkMiddleware)
    )
  }

  render(children = ''){
    return (
      <Provider store={this.store}>
        <div>
          {children}
        </div>
      </Provider>
    )
  }
}

export default Page
export {Page}
