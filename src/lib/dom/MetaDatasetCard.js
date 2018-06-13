import React from 'react'
import {translate} from 'react-i18next'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'

import Autocomplete from './Autocomplete'
import ObjectTable from './ObjectTable'

class MetaDatasetCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expanded: false,
      metaset: props.metads
    }
  }

  expand(){
    this.setState({
      expanded: !this.state.expanded
    })
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

  deleteMds(){
    if(this.props.onDelete){
      this.props.onDelete(this.props.metads.id)
    }
  }

  render(){
    var {aliases, metads, onSave, onDelete} = this.props

    var alias = aliases[metads.id]
    var title = alias || metads.id
    var subtitle = alias ?metads.id :''

    return (
      <Card>
        {title
          ?<CardHeader title={title} subtitle={subtitle}
            action={
              <IconButton onClick={this.expand.bind(this)}>
                <Icon>{this.state.expanded ?'expand_less' :'expand_more'}</Icon>
              </IconButton>
            }
          />
          :<CardContent>
            <Autocomplete
              suggestions={aliases}
              label='Chooooooooose'
              sugCount='5'
              onSelect={this.selectID.bind(this)}
            />
            <IconButton onClick={this.expand.bind(this)}>
              <Icon>{this.state.expanded ?'expand_less' :'expand_more'}</Icon>
            </IconButton>
          </CardContent>
        }
        <Collapse in={this.state.expanded} timeout='auto'>
          <ObjectTable obj={metads.metadata} onSave={this.save.bind(this)}
            onDelete={this.props.onDelete ?this.deleteMds.bind(this) :null}
          />
        </Collapse>
      </Card>
    )
  }
}

export default MetaDatasetCard
export {MetaDatasetCard}
