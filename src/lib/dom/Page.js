import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider, connect} from 'react-redux'
import {translate} from 'react-i18next'

class Page extends React.Component{
  constructor(props, reducer){
    super(props)
    this.store = createStore(
      reducer,
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
