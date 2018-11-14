import React from 'react'
import {Route, IndexRoute} from 'react-router'

import StudyDetails from './studydetails'
import StudyList from './studylist'

const Routes = ({urlbase}) => (
  <React.Fragment>
    <Route exact path={urlbase} component={StudyDetails}/>
    <Route path={urlbase+'/study/:id?'} component={StudyDetails}/>
    <Route path={urlbase+'/studies'} component={StudyList}/>
  </React.Fragment>
)

export default Routes
export {Routes}
