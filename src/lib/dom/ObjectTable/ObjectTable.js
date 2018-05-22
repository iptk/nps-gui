import React from 'react'
import {translate} from 'react-i18next'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import {ObjectRow} from './ObjectRow'

class ObjectTable extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      obj: props.obj
    }
  }

  addElement(){
    var key = 'Key'
    for(var i = 0;; i++){
      if(key in this.state.obj){
        key = 'Key '+i
        continue
      }
      break
    }
    var obj = this.state.obj
    obj[key] = ""
    this.setState({
      obj: obj
    })
    if(this.props.onChange){
      this.props.onChange(obj)
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

  deleteRow(key){
    var obj = this.state.obj
    delete obj[key]
    this.setState({
      obj: obj
    })
  }

  save(){
    if(this.props.onSave){
      this.props.onSave(this.state.obj)
    }
  }

  render(){
    var {readonly, t} = this.props
    var rows = Object.keys(this.state.obj).map((key) => (
      <ObjectRow elemkey={key} key={key} elemvalue={this.state.obj[key]}
        onRemove={this.deleteRow.bind(this)} readonly={readonly}/>
    ))
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>t('ObjectTable.key')</TableCell>
            <TableCell>t('ObjectTable.value')</TableCell>
            <TableCell>t('ObjectTable.type')</TableCell>
            {readonly ?null :<TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
        {readonly ?null
          :<TableFooter>
            <TableRow>
              <TableCell colSpan="4">
                <Button onClick={this.addElement.bind(this)}>
                  <Icon>add</Icon>
                  {t('ObjectTable.add')}
                </Button>
                {this.props.onSave
                  ?<Button onclick={this.save.bind(this)}>
                      <Icon>save</Icon>
                      {t('ObjectTable.save')}
                    </Button>
                  :null
                }
              </TableCell>
            </TableRow>
          </TableFooter>
        }
      </Table>
    )
  }
}

export default translate('dom')(ObjectTable)
