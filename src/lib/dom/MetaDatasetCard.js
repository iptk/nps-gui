import React from 'react'
import {translate} from 'react-i18next'
import Card, {CardHeader, CardContent} from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'

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
          <ObjectTable obj={metads}/>
        </Collapse>
      </Card>
    )
  }
}

export default MetaDatasetCard
export {MetaDatasetCard}
