import React from 'react'
import {Route, IndexRoute} from 'react-router'

import DatasetCompare from './datasetcompare'
import DatasetMeta from './datasetmeta'
import MetadataCollections from './metadatacollections'
import SearchDataset from './searchdataset'

const Routes = ({urlbase}) => (
  <React.Fragment>
    <Route exact path={urlbase} component={SearchDataset}/>
    <Route path={urlbase+"/search"} component={SearchDataset}/>
    <Route path={urlbase+"/dataset"}>
      <Route path={urlbase+"/dataset/:dsid"} component={DatasetMeta}/>
    </Route>
    <Route path={urlbase+"/datasets"}>
      <Route path={urlbase+"/datasets/compare"} component={DatasetCompare}/>
    </Route>
    <Route path={urlbase+"/metadata"}>
      <Route path={urlbase+"/metadata/collections"} component={MetadataCollections}/>
    </Route>
  </React.Fragment>
)

export default Routes
export {Routes}
