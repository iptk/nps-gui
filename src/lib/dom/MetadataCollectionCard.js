import React from 'react'
import {Card, CardTitle} from 'react-toolbox'

import ObjectTable from './ObjectTable'

const MetadataCollectionCard = ({collection}) => (
  <Card>
    <CardTitle title={collection.name} subtitle={collection.identifier}/>
    <ObjectTable object={collection}/>
  </Card>
)

export default MetadataCollectionCard
