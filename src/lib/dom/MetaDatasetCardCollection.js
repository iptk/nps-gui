import React from 'react'

import {MetaDatasetCard} from './MetaDatasetCard'

const MetaDatasetCardCollection = ({metadatasets}) => {
  var cards = metadatasets.forEach((mds) => (
    <section>
      <MetaDatasetCard metads={mds}/>
      <br/>
    </section>
  ))
  return (<div>{cards}</div>)
}

export default MetaDatasetCardCollection
