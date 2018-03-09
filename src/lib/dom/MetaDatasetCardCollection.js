import React from 'react'

import MetaDatasetCard from './MetaDatasetCard'

const MetaDatasetCardCollection = ({metadatasets}) => {
  var cards = metadatasets.map((mds, _) => (
    <section key={mds.id}>
      <MetaDatasetCard metads={mds}/>
      <br/>
    </section>
  ))
  return (<div>{cards}</div>)
}

export default MetaDatasetCardCollection
