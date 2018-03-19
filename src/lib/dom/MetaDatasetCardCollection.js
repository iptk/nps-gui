import React from 'react'

import MetaDatasetCard from './MetaDatasetCard'

const MetaDatasetCardCollection = ({metadatasets, aliases, onSave}) => {
  var cards = metadatasets.map((mds, _) => (
    <section key={mds.id}>
      <MetaDatasetCard metads={mds} aliases={aliases}
        onSave={onSave}/>
      <br/>
    </section>
  ))
  return (<div>{cards}</div>)
}

export default MetaDatasetCardCollection
