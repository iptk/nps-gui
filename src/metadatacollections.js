import 'babel-polyfill' // for cross-fetch

import React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'

import {fetchCollections} from './lib/actions/metadatacollections'
import reducer from './lib/reducers/metadatacollections'
import {Page, MetadataCollectionCard} from './lib/dom'

import {NPS} from './lib/api'

const _subCardTitle = translate('pages')(connect(
  (state) => ({count: state.s.total})
)(
  ({count, t}) => (
    <CardHeader
      title={t('metadatacollections.title')}
      subheader={t('metadatacollections.count')+': '+count}
    />
  )
))

const _collectionCards = connect(
  (state) => ({collections: state.s.collections})
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

class MetadataCollections extends Page{
  constructor(props){
    super(props, reducer)
    const load = this.loadCollections.bind(this)
    load()
  }

  loadCollections(){
    // fetch collections
    this.store.dispatch(fetchCollections())
  }

  render(){
    const {t} = this.props
    return super.render(
      <section>
        <Card>
          <_subCardTitle/>
          <Button onClick={this.loadCollections.bind(this)}>
            <Icon>update</Icon>
            {t('metadatacollections.reload')}
          </Button>
        </Card>
        <br/>
        <_collectionCards/>
      </section>
    )
  }
}

export default translate('pages')(MetadataCollections)
