import React from 'react'

import MetaDatasetCard from './MetaDatasetCard'

const MetaDatasetCardCollection = ({metadatasets, aliases, onSave, onDelete}) => {
  var freeIDs = Object.keys(aliases).filter((elem) => !(elem in metadatasets))
  var cards = Object.keys(metadatasets).map((mdsKey, _) => (
    <section key={mdsKey}>
      <MetaDatasetCard metads={metadatasets[mdsKey]} aliases={aliases}
        onSave={onSave} onDelete={onDelete} freeIDs={freeIDs}/>
      <br/>
    </section>
  ))
  return (<div>{cards}</div>)
}

export default MetaDatasetCardCollection
