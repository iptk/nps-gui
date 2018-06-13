import React from 'react'
import {translate} from 'react-i18next'

import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit/2
  }
})

const QueryList = ({classes, queryVals, t}) => {
  var items = queryVals.map((chips, i) => {
    chips = chips.map((chip, j) => (
      <Chip key={chip+j} label={chip} className={classes.chip}/>
    ))
    return (
      <ListItem key={chips.join()+i}>
        <div>{chips}</div>
      </ListItem>
    )
  })
  return (
    <List subheader={<ListSubheader>{t('QueryList.queries')}</ListSubheader>} fullWidth>
      {items}
    </List>
  )
}

export default translate('dom')(withStyles(styles)(QueryList))
