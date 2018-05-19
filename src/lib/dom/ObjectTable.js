import React from 'react'
import {translate} from 'react-i18next'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import debounce from 'lodash/debounce'

class ObjectTable extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      obj: props.obj
    }
  }

  changeRow(oldKey, newKey, value){
    var obj = this.state.obj
    if(oldKey == newKey){
      obj[oldKey] = value
    }
    else{
      delete obj[oldKey]
      obj[newKey] = value
    }
    if(this.props.onChange){
      this.props.onChange(obj)
    }
  }

  render(){
    var rows = Object.keys(this.state.obj).map((key) => (
      <ObjectRow elemkey={key} key={key} elemvalue={this.state.obj[key]}/>
    ))
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>t('ObjectTable.key')</TableCell>
            <TableCell>t('ObjectTable.value')</TableCell>
            <TableCell>t('ObjectTable.type')</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    )
  }
}

class _ObjectRow extends React.Component{
  constructor(props){
    super(props)
    var valText = props.elemvalue.toString()
    var valType = Array.isArray(props.elemvalue)
      ?'array' :typeof props.elemvalue
    var disabledVal = false

    if(valType == 'object' || valType == 'array'){
      valText = `(${valType})`
      disabledVal = true
    }
    this.state = {
      key: props.elemkey,
      prevKey: props.elemkey,
      value: props.elemvalue,
      type: Array.isArray(props.elemvalue) ?'array' :typeof props.elemvalue,
      valField: valText,
      disabledVal: disabledVal,
      collapsed: true
    }
  }

  changeKey(newKey){
    this.setState({
      key: newKey
    })
  }

  changeType(newType){
    //
  }

  changeValue(newVal){
    this.setState({
      value: newVal
    })
  }

  generateValueField(){
    if(this.state.type == 'boolean'){
      return (
        <TextField select id='select-val' value={this.state.value}
          onChange={this.changeValue.bind(this)}
        >
          <MenuItem key='true' value={true}>True</MenuItem>
          <MenuItem key='false' value={false}>False</MenuItem>
        </TextField>
      )
    }
    else if(this.state.type == 'object' || this.state.type == 'array'){
      /*return (
        <React.Fragment>
          {this.state.valField}
          {this.state.expanded ?<ExpandLess/> :<ExpandMore/>}
        </React.Fragment>
      )*/
    }
    return (
      <React.Fragment>
        <TextField value={this.state.valField} id='select-val'
          disabled={this.state.disabledVal}
          onChange={debounce(this.changeValue.bind(this), 600)}
        />
        {this.state.type == 'object' || this.state.type == 'array'
          ?(this.state.expanded ?<ExpandLess/> :<ExpandMore/>) :''
        }
      </React.Fragment>
    )
  }

  generateTypeField(){
    return (
      <TextField select id="select-type" value={this.state.type}
        onChange={this.changeType.bind(this)}
      >
        <MenuItem key="array" value="array">Array</MenuItem>
        <MenuItem key="boolean" value="boolean">Boolean</MenuItem>
        <MenuItem key="number" value="number">Number</MenuItem>
        <MenuItem key="object" value="object">Object</MenuItem>
        <MenuItem key="string" value="string">Text</MenuItem>
      </TextField>
    )
  }

  render(){
    return (
      <TableRow>
        <TableCell>{this.state.key}</TableCell>
        <TableCell>{this.generateValueField()}</TableCell>
        <TableCell>{this.generateTypeField()}</TableCell>
      </TableRow>
    )
  }
}

class _DetailRow extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expanded: false
    }
  }

  render(){
    return (
      <Collapse component='tr' in={this.state.expanded} timeout='auto'>
        <td colspan="3">
        </td>
      </Collapse>
    )
  }
}

class _ValueList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      values: props.values
    }
  }

  changeValue(idx, val){
    var vals = this.state.values
    vals[idx] = val
    this.setState({
      values: vals
    })
    this.props.onChange(vals)
  }

  render(){
    var rows = this.state.values.map((val, idx) => (
      <ListItem key={idx}>
        <TextField key={idx} value={this.state.values[idx]}
          onChange={this.changeValue.bind(this, idx)}/>
      </ListItem>
    ))
    return (
      <List>
        {rows}
      </List>
    )
  }
}

const DetailRow = translate('dom')(_DetailRow)
const ObjectRow = translate('dom')(_ObjectRow)
const ValueList = translate('dom')(_ValueList)

export default translate('dom')(ObjectTable)
