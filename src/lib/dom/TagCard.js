import React from 'react'
import {
  Button, Card, CardTitle, CardActions, Input,
  Table, TableRow, TableCell
} from 'react-toolbox'
import {translate} from 'react-i18next'
import debounce from 'lodash/debounce'

/**
 * onDelete: receives an array with deleted index and with the remaining tags, triggered on deletion
 * onSave: receives an array with the current tags, triggered on save-button
 * onEdit: receives an array with the old and the new tag
 */
class TagCard extends React.Component{
  static defaultProps = {
    cardID: "",
    tags: []
  }

  constructor(props){
    super(props)
    this.state = {
      selected: [],
      tags: props.tags
    }
  }

  deleteRow = (index) => {
    var remaining = this.state.tags
    remaining.splice(index, 1)
    var remSelected = this.state.selected.filter((item) => item != index)
    this.setState({
      selected: remSelected,
      tags: remaining
    })
    if(this.props.onDelete){
      this.props.onDelete([index], remaining)
    }
  }
  deleteRows = () => {
    // The loop has to be used as the state somehow isn't updated
    // when remaining is created using tags.filter
    var remaining = this.state.tags
    for(var i = this.state.selected.length-1; i >= 0; i--){
      remaining.splice(this.state.selected[i], 1)
    }

    this.setState({
      selected: [],
      tags: remaining
    })

    if(this.props.onDelete){
      this.props.onDelete(this.state.selected, remaining)
    }
  }

  saveCard = () => {
    if(this.props.onSave){
      this.props.onSave(this.state.tags.filter((elem) => elem.length > 0))
    }
  }

  editTag = (idx, val) => {
    var prev = this.state.tags[idx]
    var tags = this.state.tags
    tags[idx] = val
    this.setState({
      tags: tags
    })

    if(this.props.onEdit){
      this.props.onEdit(prev, val, tags)
    }
  }

  handleSelection = (selected) => {
    this.setState({
      selected: selected
    })
  }

  addTag = () => {
    var tags = this.state.tags
    tags.push('')
    this.setState({
      tags: tags
    })
    if(this.props.onAddTag){
      this.props.onAddTag()
    }
  }

  render(){
    var {cardID,
      onDelete,
      onEdit,
      onSave,
      onAddTag,
      t,
      tags} = {...this.defaultProps, ...this.props}

    // don't use setState to prevent a rerender-loop
    this.state.tags = tags

    var rows = this.state.tags.map((tag, idx) => (
      <TableRow key={'__tagrow_'+idx}
        selectable={true}
        selected={this.state.selected.includes(idx)}
      >
        <TableCell key='__tag'>
          <Input type='text' name={'__tag_'+idx} key={'__tag_'+idx}
            value={this.state.tags[idx]}
            onChange={this.editTag.bind(this, idx)}
            />
        </TableCell>
        <TableCell key='__dlBtn'>
          <Button icon='delete' onMouseUp={this.deleteRow.bind(this, idx)} flat/>
        </TableCell>
      </TableRow>
    ))
    return (<Card>
        <CardTitle title={t('TagCard.tags')}/>
        <Table selectable multiSelectable
          onRowSelect={this.handleSelection.bind(this)}
          selected={this.state.selected}
        >
          {rows}
        </Table>
        <CardActions>
          <Button icon='create' label={t('TagCard.createtag')} onMouseUp={this.addTag.bind(this)}/>
          <Button icon='delete' label={t('TagCard.deleteselected')} onMouseUp={this.deleteRows.bind(this)}/>
          {onSave ?<Button icon='save' label={t('TagCard.save')} onMouseUp={this.saveCard.bind(this)}/> :''}
        </CardActions>
      </Card>)
  }
}

export default translate('dom')(TagCard)
