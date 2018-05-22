import React from 'react'
import {translate} from 'react-i18next'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import {castValue} from './util'
import DetailRow from './DetailRow'
import {TypeInput, ValueInput} from './inputs'

class _ValueArrayRow extends React.Component{
  constructor(props){
    super(props)

    var type = typeof props.value
    if(Array.isArray(props.value)){
      type = 'array'
    }

    this.state = {
      type: type,
      value: props.value,
      expanded: false
    }
  }

  changeValue(evt){
    this.setState({
      value: evt.target.value
    })
    if(this.props.onChange){
      this.props.onChange(evt.target.value)
    }
  }

  changeType(evt){
    var val = castValue(this.state.value, evt.target.value)
    this.setState({
      value: val,
      type: evt.target.value
    })
    if(this.props.onChange){
      this.props.onchange(val)
    }
  }

  changeDetailValue(value){
    this.setState({
      value: value
    })
  }

  changeExpansion(expanded=null){
    if(expanded == null){
      expanded = !this.state.expanded
    }
    this.setState({
      expanded: expanded
    })
  }

  remove(){
    if(this.props.onRemove){
      this.props.onRemove()
    }
  }

  render(){
    var {readonly} = this.props
    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            <ValueInput
              type={this.state.type}
              onChange={this.changeValue.bind(this)}
              value={this.state.value}
              disabled={this.state.type == 'object' || this.state.type == 'array'}
              expanded={this.state.expanded}
              onExpand={this.changeExpansion.bind(this)}
              readonly={readonly}
            />
          </TableCell>
          <TableCell>
            <TypeInput type={this.state.type}
              onChange={this.changeType.bind(this)}
              readonly={readonly}
            />
          </TableCell>
          {readonly ?null
            :<TableCell>
              <IconButton onClick={this.remove.bind(this)}>
                <Icon>delete</Icon>
              </IconButton>
            </TableCell>
          }
        </TableRow>
        {this.state.type == 'object' || this.state.type == 'array'
          ?<DetailRow type={this.state.type} value={this.state.value}
            expanded={this.state.expanded}
            onChange={this.changeDetailValue.bind(this)}
            readonly={readonly}/>
          :null
        }
      </React.Fragment>
    )
  }
}

const ValueArrayRow = translate('dom')(_ValueArrayRow)

export {ValueArrayRow}
export default ValueArrayRow
