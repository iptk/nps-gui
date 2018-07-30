import React from 'react'
import {translate} from 'react-i18next'

import Autocomplete from './Autocomplete'
import CollapsableCard from './CollapsableCard'
import ObjectTable from './ObjectTable'

class MetaDatasetCard extends CollapsableCard{
  constructor(props){
    super(props)
    this.state = {
      ...this.state,
      expanded: false,
      metaset: props.metads
    }
  }

  save(obj){
    var mds = this.state.metads
    metads.metadata = obj
    this.setState({
      metaset: mds
    })
    if(this.props.save){
      this.props.save(mds)
    }
  }

  selectID(selection){
    var mds = this.state.metaset
    mds.id = selection.value
    this.setState({
      metaset: mds
    })
  }

  render(){
    var {aliases, metads, onSave} = this.props

    var alias = aliases[metads.id]
    var title = alias || metads.id
    var subtitle = alias ?metads.id :''

    return super.render(
      title
        ? [title, subtitle]
        : <Autocomplete
            suggestions={aliases}
            label='Chooooooooose'
            sugCount='5'
            onSelect={this.selectID.bind(this)}
          />,
      <ObjectTable obj={metads.metadata} onSave={onSave}/>
    )
  }
}

export default MetaDatasetCard
export {MetaDatasetCard}
