import React from 'react'
import {withNamespaces} from 'react-i18next'

import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'

import CollapsableCard from '../CollapsableCard'

class CohortCard extends CollapsableCard{
  render(){
    var {cohort, t} = this.props
    return super.render(
      cohort.name,
      <div/>,
      <CardActions>
        <Button>{t('CohortCard.opendetail')}</Button>
      </CardActions>
    )
  }
}

export default withNamespaces('dom-mapi')(CohortCard)
