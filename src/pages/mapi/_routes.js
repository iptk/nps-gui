import React from 'react'
import {Route, IndexRoute} from 'react-router'

import NewStudy from './newstudy'

const Routes = ({urlbase}) => (
  <React.Fragment>
    <Route exact path={urlbase} component={NewStudy}/>
  </React.Fragment>
)

export default Routes
export {Routes}
