import React from 'react'
import {
  Button, Card, CardTitle, CardActions, Input,
  Table, TableRow, TableCell
} from 'react-toolbox'
import {translate} from 'react-i18next'
import debounce from 'lodash/debounce'

/**
 * onDelete: receives an array with deleted tags and with the remaining tags, triggered on deletion
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

  componentDidMount(){
    this.setState({
      tags: this.props.tags
    })
  }

  deleteRow = (tag) => {
    var remaining = this.props.tags.filter(item => item != tag)
    if(this.props.onDelete){
      this.props.onDelete([tag], remaining)
    }
  }
  deleteRows = () => {
    // wrong! selected does only include indices, not the items
    var remaining = this.props.tags.filter(
      item => !this.state.selected.includes(item)
    )
    if(this.props.onDelete){
      this.props.onDelete(this.state.selected, remaining)
    }
  }

  saveCard = () => {
    if(this.props.onSave){
      this.props.onSave(this.state.tags)
    }
  }

  editTag = (idx, val) => {
    var prev = this.props.tags[idx]
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
      ...this.state,
      selected: selected
    })
  }

  addTag = () => {
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

    var rows = this.state.tags.map((tag, idx) => {
      var dlCell = ''
      if(this.props.onDelete){
        dlCell = <TableCell key='__dlBtn'>
            <Button icon='delete' onMouseUp={this.deleteRow.bind(this, tag)} flat/>
          </TableCell>
      }

      return <TableRow key={'__tagrow_'+idx}>
        <TableCell key='__tag'>
          <Input type='text' name={'__tag_'+idx} key={'__tag_'+idx}
            value={this.state.tags[idx]}
            onChange={this.editTag.bind(this, idx)}
            />
        </TableCell>
        {dlCell}
      </TableRow>
    })
    return (<Card>
        <CardTitle title={t('TagCard.tags')}/>
        <Table multiselectable="true" onRowSelect={this.handleSelection.bind(this)}>
          {rows}
        </Table>
        <CardActions>
          {onAddTag ?<Button icon='create' label={t('TagCard.createtag')} onMouseUp={this.addTag.bind(this)}/> :''}
          {onDelete ?<Button icon='delete' label={t('TagCard.deleteselected')} onMouseUp={this.deleteRows.bind(this)}/> :''}
          {onSave ?<Button icon='save' label={t('TagCard.save')} onMouseUp={this.saveCard.bind(this)}/> :''}
        </CardActions>
      </Card>)
  }
}

export default translate('dom')(TagCard)
