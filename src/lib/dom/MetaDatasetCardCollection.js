import React from 'react'

import MetaDatasetCard from './MetaDatasetCard'

const MetaDatasetCardCollection = ({metadatasets, aliases, onSave, onDelete}) => {
  var cards = metadatasets.map((mds, _) => (
    <section key={mds.id}>
      <MetaDatasetCard metads={mds} aliases={aliases}
        onSave={onSave} onDelete={onDelete}/>
      <br/>
    </section>
  ))
  return (<div>{cards}</div>)
}

export default MetaDatasetCardCollection
