import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider, connect} from 'react-redux'
import {translate} from 'react-i18next'
import {Button, Card, CardTitle} from 'react-toolbox'

import {fetchCollections} from './lib/actions/metadatacollections'
import reducer from './lib/reducers/metadatacollections'
import {MetadataCollectionCard} from './lib/dom'

import {NPS} from './lib/api'

const _subCardTitle = translate('pages')(connect(
  (state) => ({count: state.total})
)(
  ({count, t}) => (
    <CardTitle
      title={t('metadatacollections.title')}
      subtitle={t('metadatacollections.count')+': '+count}
    />
  )
))

const _collectionCards = connect(
  (state) => ({collections: state.collections})
)(
  ({collections}) => (
    collections.map((coll) => (
      <section>
        <MetadataCollectionCard key={coll.identifier} collection={coll}/>
        <br/>
      </section>
    ))
  )
)

class MetadataCollections extends React.Component{
  constructor(){
    super()
    this.store = createStore(
      reducer,
      applyMiddleware(thunkMiddleware)
    )
    const load = this.loadCollections.bind(this)
    load()
  }

  loadCollections(){
    // fetch collections
    this.store.dispatch(fetchCollections())
  }

  render(){
    const {t} = this.props
    return(
      <Provider store={this.store}>
        <section>
          <Card>
            <_subCardTitle/>
            <Button
              onMouseUp={this.loadCollections.bind(this)}
              label={t('metadatacollections.reload')}
              icon='update' flat
            />
          </Card>
          <br/>
          <_collectionCards/>
        </section>
      </Provider>
    )
  }
}

export default translate('pages')(MetadataCollections)