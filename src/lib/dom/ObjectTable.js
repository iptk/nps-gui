import React from 'react'
import {translate} from 'react-i18next'
import Table, {TableBody, TableHead, TableRow, TableCell} from 'material-ui/Table'
import List, {ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Collapse from 'material-ui/transitions/Collapse'
import debounce from 'lodash/debounce'

//        <TableCell key={'__key__'+row.key}>{row.key}</TableCell>
//        <TableCell key={'__val__'+row.key}>{row.value}</TableCell>
//        <TableCell key='__head_key'>{t('ObjectTable.key')}</TableCell>
//        <TableCell key='__head_value'>{t('ObjectTable.value')}</TableCell>

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
      <ObjectRow key={key} value={this.state.obj[key]}/>
    ))
    return (
      <Table>
        <TableHead>
          <TableCell>t('ObjectTable.key')</TableCell>
          <TableCell>t('ObjectTable.value')</TableCell>
          <TableCell>t('ObjectTable.type')</TableCell>
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
    var valText = props.value.toString()
    var disabledVal = false
    if(typeof props.value == 'object' || typeof props.value == 'array'){
      valText = '('+(typeof props.value)+')'
      disabledVal = true
    }
    this.state = {
      key: props.key,
      prevKey: props.key,
      value: props.value,
      type: typeof props.value,
      valField: '',
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

  render(){
    var {t, key, value} = this.props
    var valField = <TextField value={this.state.valField} id='select-val'
      disabled={this.state.disabledVal}
      onChange={debounce(this.changeValue.bind(this), 600)}
    />
    var collapse = <div/>

    if(this.state.type == 'boolean'){
      valField = <TextField select id='select-val' value={this.state.valField}
        onChange={this.changeValue.bind(this)}
      >
        <MenuItem key='true' value={true}>True</MenuItem>
        <MenuItem key='false' value={false}>False</MenuItem>
      </TextField>
    }
    else if(this.state.type == 'object'){
      collapse = (
        <Collapse in={!this.state.collapsed} timeout='auto'>
          <ObjectTable obj={this.state.val}
            onChange={this.changeValue.bind(this)}/>
        </Collapse>
      )
    }
    else if(this.state.type == 'array'){
      collapse = (
        <Collapse in={!this.state.collapsed} timout='auto'>
          <ValueList values={this.state.value}/>
        </Collapse>
      )
    }
    return (
      <TableRow>
        <TableCell>{key}</TableCell>
        <TableCell>{valField}</TableCell>
        <TableCell>
          <TextField select id="select-type" value={this.state.type}
            onChange={this.changeType.bind(this)}
          >
            <MenuItem>Array</MenuItem>
            <MenuItem>Boolean</MenuItem>
            <MenuItem>Number</MenuItem>
            <MenuItem>Object</MenuItem>
            <MenuItem>Text</MenuItem>
          </TextField>
        </TableCell>
        <Collapse in={!this.state.collapsed} timeout='auto'>
        </Collapse>
      </TableRow>
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

const ObjectRow = translate('dome')(_ObjectRow)
const ValueList = translate('dom')(_ValueList)

export default translate('dom')(ObjectTable)
