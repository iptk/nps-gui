import React from 'react'
import {translate} from 'react-i18next'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'

import ObjectTable from './ObjectTable'

class MetaDatasetCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expanded: true
    }
  }

  render(){
    var {metads} = this.props
    return (
      <Card>
        <CardHeader/>
        <Collapse in={this.state.expanded} timeout='auto'>
          <ObjectTable obj={metads.metadata}/>
        </Collapse>
      </Card>
    )
  }
}

export default MetaDatasetCard
export {MetaDatasetCard}
