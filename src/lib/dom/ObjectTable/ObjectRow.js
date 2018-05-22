import React from 'react'
import {translate} from 'react-i18next'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import {castValue} from './util'
import DetailRow from './DetailRow'
import {KeyInput, TypeInput, ValueInput} from './inputs'

class _ObjectRow extends React.Component{
  constructor(props){
    super(props)
    var valType = Array.isArray(props.elemvalue)
      ?'array' :typeof props.elemvalue

    this.state = {
      key: props.elemkey,
      prevKey: props.elemkey,
      value: props.elemvalue,
      type: Array.isArray(props.elemvalue) ?'array' :typeof props.elemvalue,
      expanded: false
    }
  }

  changeExpansion(expanded=null){
    if(expanded == null){
      expanded = !this.state.expanded
    }
    this.setState({
      expanded: expanded
    })
  }

  changeKey(evt){
    var prevKey = this.state.prevKey
    this.setState({
      prevKey: this.state.key,
      key: evt.target.value
    })
    if(this.props.onChange){
      this.props.onChange(prevKey, evt.target.value, this.state.value)
    }
  }

  changeType(evt){
    this.setState({
      value: castValue(this.state.value, evt.target.value),
      type: evt.target.value
    })
  }

  changeValue(evt){
    evt.persist()
    this.setState({
      value: evt.target.value
    })
    if(this.props.onChange){
      this.props.onChange(this.state.prevKey, this.state.key, evt.target.value)
    }
  }

  delete(){
    if(this.props.onRemove){
      this.props.onRemove(this.state.key)
    }
  }

  render(){
    var {readonly} = this.props
    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            <KeyInput value={this.state.key}
              onChange={this.changeKey.bind(this)}
              readonly={readonly}/>
          </TableCell>
          <TableCell>
            <ValueInput type={this.state.type}
              onChange={this.changeValue.bind(this)}
              value={this.state.value}
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
              <IconButton onClick={this.delete.bind(this)}>
                <Icon>delete</Icon>
              </IconButton>
            </TableCell>
          }
        </TableRow>
        {this.state.type == 'object' || this.state.type == 'array'
          ? <DetailRow expanded={this.state.expanded} type={this.state.type}
            value={this.state.value} readonly={readonly}/>
          : null
        }
      </React.Fragment>
    )
  }
}

const ObjectRow = translate('dom')(_ObjectRow)

export {ObjectRow}
export default ObjectRow
