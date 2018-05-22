import React from 'react'
import {translate} from 'react-i18next'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

const KeyInput = ({onChange, readonly, value}) => (
  <TextField value={value} id='select-key' onChange={onChange}
    readonly={readonly}/>
)

const _TypeInput = ({type, onChange, readonly, t}) => (
  <TextField select id="select-type" value={type}
    onChange={onChange} disabled={readonly}
  >
    <MenuItem key="array" value="array">{t('ObjectTable.types.array')}</MenuItem>
    <MenuItem key="boolean" value="boolean">{t('ObjectTable.types.boolean')}</MenuItem>
    <MenuItem key="number" value="number">{t('ObjectTable.types.number')}</MenuItem>
    <MenuItem key="object" value="object">{t('ObjectTable.types.object')}</MenuItem>
    <MenuItem key="string" value="string">{t('ObjectTable.types.string')}</MenuItem>
  </TextField>
)

const _ValueInput = ({type, onChange, value, expanded, onExpand, readonly}) => {
  if(type == 'boolean'){
    return (
      <TextField select id='select-val' value={value}
        onChange={onChange} disabled={readonly}
      >
        <MenuItem key='true' value={true}>True</MenuItem>
        <MenuItem key='false' value={false}>False</MenuItem>
      </TextField>
    )
  }
  else if(type == 'object' || type == 'array'){
    return (
      <React.Fragment>
        <TextField value={'('+type+')'} id='select-val'
          disabled={true}
        />
        <IconButton onClick={()=>{onExpand(!expanded)}}>
          <Icon>{expanded ?'expand_less': 'expand_more'}</Icon>
        </IconButton>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <TextField value={value} id='select-val'
        onChange={onChange} multiline={type == 'string'}
        disabled={readonly}
      />
    </React.Fragment>
  )
}

const TypeInput = translate('dom')(_TypeInput)
const ValueInput = translate('dom')(_ValueInput)

export {KeyInput, TypeInput, ValueInput}
