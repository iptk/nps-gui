import React from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

import ObjectTable from './ObjectTable'

const MetadataCollectionCard = ({collection}) => (
  <Card>
    <CardHeader title={collection.name} subheader={collection.identifier}/>
    <ObjectTable obj={collection} readonly={true}/>
  </Card>
)

export default MetadataCollectionCard
