import React from 'react'
import {connect} from 'react-redux'
import {withNamespaces} from 'react-i18next'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

class CohortTab extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      cohort: false
    }
  }

  render(){
    var {cohort, t} = this.props

    return (
      <div>
        <Typography variant="display1" color="inherit" paragraph>
          {cohort.name}
        </Typography>
        <Card>
          <CardHeader title={cohort.name}/>
        </Card>
      </div>
    )
  }
}

export default withNamespaces('pages-stapi')(CohortTab)
