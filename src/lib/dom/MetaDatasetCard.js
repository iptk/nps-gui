import React from 'react'
import {
  Button, Card, CardActions, CardTitle, Input,
  Table, TableHead, TableRow, TableCell
} from 'react-toolbox'
import {translate} from 'react-i18next'

import {KeyValueMetadata} from '../api'

class MetaDatasetCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selected: [],
      tags: props.tags
    }
  }

  editKey = (idx, val) => {
    var meta = this.state.metaset
    meta.metadata[idx].key = val
    this.setState({
      metaset: meta
    })
  }

  editValue = (idx, val) => {
    var meta = this.state.metaset
    meta.metadata[idx].value = val
    this.setState({
      metaset: meta
    })
  }

  deleteRow = (index) => {
    var meta = this.state.metaset
    meta.metadata.splice(index, 1)
    var remSelected = this.state.selected.filter((item) => item != index)
    this.setState({
      selected: remSelected,
      metaset: meta
    })
  }
  deleteRows = () => {
    // The loop has to be used as the state somehow isn't updated
    // when remaining is created using tags.filter
    var meta = this.state.metaset
    for(var i = this.state.selected.length-1; i >= 0; i--){
      meta.metadata.splice(this.state.selected[i], 1)
    }
    this.setState({
      selected: [],
      metaset: meta
    })
  }

  addRow = () => {
    var meta = this.state.metaset
    meta.metadata.push(new KeyValueMetadata('', ''))
    this.setState({
      metaset: meta
    })
  }

  handleSelection = (selected) => {
    this.setState({
      selected: selected
    })
  }

  saveCard = () => {
    var meta = this.state.metaset
    meta.metadata = meta.metadata.filter((elem) => elem.key.length > 0)
    if(this.props.onSave){
      this.props.onSave(meta)
    }
  }

  render(){
    var {aliases, metads, t, onSave} = this.props
    this.state.metaset = metads

    var editable = onSave ?true :false

    var metadata = metads.getMetadata()
    var rows = metadata.map((md, idx) => {
      var val = md.value
      if(Array.isArray(val)){
        val = val.join('; ')
      }
      return (<TableRow key={'__row_'+idx}
          selectable={editable}
          selected={this.state.selected.includes(idx)}
        >
          <TableCell key={'__key__'+idx}>
            {onSave
              ?<Input type='text' name={'__tag_'+idx} key={'__tag_'+idx}
                  value={this.state.metaset.metadata[idx].key}
                  onChange={this.editKey.bind(this, idx)}
                />
              : md.key
            }
          </TableCell>
          <TableCell key={'__val__'+idx}>
            {onSave
              ?<Input type='text' name={'__val_'+idx} key={'__val_'+idx}
                  value={this.state.metaset.metadata[idx].value}
                  onChange={this.editValue.bind(this, idx)}
                />
              : md.value
            }
          </TableCell>
          {editable
            ?<TableCell key='__dlBtn'>
                <Button icon='delete' onMouseUp={this.deleteRow.bind(this, idx)} flat/>
              </TableCell>
            :''
          }
        </TableRow>)
    })

    var alias = aliases[metads.id]
    var title = alias || metads.id
    var subtitle = alias ?metads.id :''

    return (<Card>
        <CardTitle title={title} subtitle={subtitle}/>
        <Table selectable={editable} multiSelectable={editable}
          onRowSelect={this.handleSelection.bind(this)}
          selected={this.state.selected}
        >
          <TableHead>
            <TableCell key='__head_key'>{t('MetaDatasetCard.key')}</TableCell>
            <TableCell key='__head_value'>{t('MetaDatasetCard.value')}</TableCell>
            {editable ?<TableCell key='__head_btns'></TableCell> :''}
          </TableHead>
        {rows}
        </Table>
        {editable
          ? <CardActions>
              <Button icon='create' label={t('MetaDatasetCard.addrow')} onMouseUp={this.addRow.bind(this)}/>
              <Button icon='delete' label={t('MetaDatasetCard.deleteselected')} onMouseUp={this.deleteRows.bind(this)}/>
              <Button icon='save' label={t('MetaDatasetCard.save')} onMouseUp={this.saveCard.bind(this)}/>
            </CardActions>
          : ''
        }
      </Card>)
  }
}

export default translate('dom')(MetaDatasetCard)
