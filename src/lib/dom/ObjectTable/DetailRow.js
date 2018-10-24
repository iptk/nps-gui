import React from 'react'
import {withNamespaces} from 'react-i18next'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Icon from '@material-ui/core/Icon'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'

import ObjectTable from './ObjectTable'
import ValueArrayRow from './ValueArrayRow'

class _DetailRow extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value: props.value,
      type: props.type
    }
  }

  addRow(){
    if(!this.state.type == 'array'){
      return
    }
    var val = this.state.value
    val.push('')
    this.setState({
      value: val
    })
    if(this.props.onChange){
      this.props.onChange(val)
    }
  }

  changeType(evt){
    this.setState({
      value: castValue(this.state.value, evt.target.value),
      type: evt.target.value
    })
  }

  changeValue(evt){
    this.setState({
      value: evt.target.value
    })
    if(this.props.onChange){
      this.props.onChange(evt.target.value)
    }
  }

  changeObjValue(value){
    this.setState({
      value: value
    })
    if(this.props.onChange){
      this.props.onChange(value)
    }
  }

  changeArrValue(idx, value){
    var val = this.state.value
    val[idx] = value
    this.setState({
      value: val
    })
    if(this.props.onChange){
      this.props.onChange(val)
    }
  }

  removeArrElement(idx){
    var val = this.state.value
    delete val[idx]
    this.setState({
      value: val
    })
    if(this.props.onChange){
      this.props.onChange(val)
    }
  }

  render(){
    var {expanded, readonly, t} = this.props
    var content = null
    if(this.state.type == 'array'){
      content = (
        <Table>
          <TableBody>
            {this.state.value.map((elem, idx) => (
              <ValueArrayRow key={idx} value={elem}
                onChange={this.changeArrValue.bind(this, idx)}
                onRemove={this.removeArrElement.bind(this, idx)}
                readonly={readonly}/>
            ))}
          </TableBody>
          {readonly ?null
            :<TableFooter>
              <TableRow>
                <TableCell colSpan="4">
                  <Button onClick={this.addRow.bind(this)}>
                    <Icon>add</Icon>
                    {t('ObjectTable.add')}
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          }
        </Table>
      )
    }
    else if(this.state.type == 'object'){
      content = <ObjectTable obj={this.state.value}
        onChange={this.changeObjValue.bind(this)}
        readonly={readonly}/>
    }
    return (
      <tr style={{borderLeft: "5px solid #303f9f"}}>
        <td colSpan={readonly ?"3" :"4"}>
          <Collapse in={expanded} timeout='auto'>
            {content}
          </Collapse>
        </td>
      </tr>
    )
  }
}

const DetailRow = withNamespaces('dom')(_DetailRow)

export {DetailRow}
export default DetailRow
