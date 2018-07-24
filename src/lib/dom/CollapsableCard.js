import React from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'

const _expandBtn = ({expanded, onClick}) => (
  <IconButton onClick={onClick.bind(this)}>
    <Icon>{expanded ?'expand_less' :'expand_more'}</Icon>
  </IconButton>
)

class CollapsableCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      _expanded: false
    }
  }

  _expand(){
    this.setState({
      _expanded: !this.state._expanded
    })
  }
  render(header = '', content = ''){
    var cardHeader = ''
    if((typeof header) === 'string'){
      header = [header, '']
    }
    if(Array.isArray(header)){
      if(header.length < 2){
        header.push('')
      }
      cardHeader = (
        <CardHeader title={header[0]} subtitle={header[1]}
          action={
            <_expandBtn onClick={this._expand.bind(this)}
              expanded={this.state._expanded}
            />
          }
        />
      )
    }
    else{
      cardHeader = (
        <CardContent>
          {header}
          <_expandBtn onClick={this._expand.bind(this)}
            expanded={this.state._expanded}
          />
        </CardContent>
      )
    }

    return (
      <Card>
        {cardHeader}
        <Collapse in={this.state._expanded} timeout='auto' style={{width: '100%', overflowX: 'auto'}}>
          {content}
        </Collapse>
      </Card>)
  }
}

export default CollapsableCard
