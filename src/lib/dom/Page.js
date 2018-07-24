import React from 'react'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider, connect} from 'react-redux'
import {translate} from 'react-i18next'

import {G_RESTORE_STATE_FROM_COOKIES} from '../actions/_common'
import commonReducer from '../reducers/_common'

import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme) => ({
  tableProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
})

const _loadingIcon = connect(
  (state) => ({loading: state.g.loading})
)(
  withStyles(styles)(({classes, loading}) => {
    if(loading > 0){
      return <CircularProgress size={24} className={classes.tableProgress}/>
    }
    return null
  })
)

class Page extends React.Component{
  constructor(props, reducer){
    super(props)
    var mergedReducer = combineReducers({
      l: reducer,       // l: _local_ for the page
      g: commonReducer  // g: _global_ for every page
    })
    this.store = createStore(
      mergedReducer,
      applyMiddleware(thunkMiddleware)
    )
    this.store.dispatch({type: G_RESTORE_STATE_FROM_COOKIES})
  }

  render(children = ''){
    return (
      <Provider store={this.store}>
        <div>
          {children}
          <_loadingIcon/>
        </div>
      </Provider>
    )
  }
}

export default Page
export {Page}
