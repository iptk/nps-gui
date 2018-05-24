import React from 'react'
import Downshift from 'downshift'

import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

class Autocomplete extends React.Component{
  constructor(props){
    super(props)
    var suggs = props.suggestions
    if(typeof props.suggestions === 'object' && !Array.isArray(props.suggestions)){
      suggs = Object.keys(suggs).map((item) => (
        {label: props.suggestions[item], value: item}
      ))
    }
    if(Array.isArray(suggs) && suggs.length > 0 && typeof suggs[0] !== 'object'){
      suggs = suggs.map((item) => (
        {label: item, value: item}
      ))
    }
    this.suggs = suggs
  }

  getSuggestions(inputValue){
    var count = 0
    var sugCount = Number.parseInt(this.props.sugCount)
    if(sugCount <= 0){
      sugCount = 5
    }

    return this.suggs.filter(sug => {
      const keep =
        (!inputValue
          || sug.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
        ) && count < sugCount
      if(keep){
        count += 1
      }
      return keep
    })
  }

  itemToString(item){
    if(!item){
      return ''
    }

    if(typeof item === 'object'){
      return item.label
    }
    return item.toString()
  }

  renderSuggestion({suggestion, index, itemProps, highlightedIndex, selectedItem}){
    const isHighlighted = highlightedIndex === index
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.value}
        selected={isHighlighted}
        component='div'
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.label}
      </MenuItem>
    )
  }

  onSelect(selection){
    console.log(selection)
    if(this.props.onSelect){
      this.props.onSelect(selection)
    }
  }

  render(){
    var {aliases, label, t} = this.props
    return(
      <Downshift
        onChange={this.onSelect.bind(this)}
        itemToString={this.itemToString.bind(this)}
      >
        {({getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex}) => (
          <div>
            <TextField fullWidth
              InputProps={getInputProps({placeholder: label})}
            />
            {isOpen
              ? <Paper square>
                {
                  this.getSuggestions(inputValue).map((suggestion, index) => (
                    this.renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({
                        item: suggestion,
                        index
                      }),
                      highlightedIndex,
                      selectedItem
                    })
                  ))
                }
              </Paper>
              : null
            }
          </div>
        )}
      </Downshift>
    )
  }
}

export default Autocomplete
export {Autocomplete}
