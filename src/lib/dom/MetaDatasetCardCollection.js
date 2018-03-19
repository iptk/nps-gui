import React from 'react'

import MetaDatasetCard from './MetaDatasetCard'

const MetaDatasetCardCollection = ({metadatasets, aliases}) => {
  var cards = metadatasets.map((mds, _) => (
    <section key={mds.id}>
      <MetaDatasetCard metads={mds} alias={aliases[mds.id]}/>
      <br/>
    </section>
  ))
  return (<div>{cards}</div>)
}

export default MetaDatasetCardCollection
