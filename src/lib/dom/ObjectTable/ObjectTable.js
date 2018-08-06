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
      obj: props.obj,
      keys: Object.keys(props.obj) || []
    }
  }

  addElement(){
    var keys = this.state.keys
    keys.push('')
    this.setState({
      keys: keys
    })
    if(this.props.onChange){
      this.props.onChange(obj)
    }
  }

  changeRow(keyIdx, newKey, value){
    var obj = this.state.obj
    var keys = this.state.keys
    var oldKey = keys[keyIdx]

    if(oldKey == newKey){
      obj[oldKey] = value
    }
    else{
      delete obj[oldKey]
      obj[newKey] = value
      keys[keyIdx] = newKey
    }
    this.setState({
      obj: obj,
      keys: keys
    })
    if(this.props.onChange){
      this.props.onChange(obj)
    }
  }

  deleteRow(idx){
    var keys = this.state.keys
    var key = keys[idx]
    delete keys[idx]

    var obj = this.state.obj
    delete obj[key]

    this.setState({
      obj: obj,
      keys: keys
    })
  }

  save(){
    if(this.props.onSave){
      this.props.onSave(this.state.obj)
    }
  }

  delete(){
    if(this.props.onDelete){
      this.props.onDelete(this.state.obj)
    }
  }

  render(){
    var {readonly, t} = this.props
    var rows = this.state.keys.map((key, idx) => (
      <ObjectRow elemkey={key} key={idx} elemvalue={this.state.obj[key]}
        onRemove={this.deleteRow.bind(this, idx)} readonly={readonly}
        onChange={this.changeRow.bind(this, idx)}/>
    ))
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('ObjectTable.key')}</TableCell>
            <TableCell>{t('ObjectTable.value')}</TableCell>
            <TableCell>{t('ObjectTable.type')}</TableCell>
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
                  ?<Button onClick={this.save.bind(this)}>
                      <Icon>save</Icon>
                      {t('ObjectTable.save')}
                    </Button>
                  :null
                }
                {this.props.onDelete
                  ?<Button onClick={this.delete.bind(this)}>
                      <Icon>delete_forever</Icon>
                      {t('ObjectTable.delete')}
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
