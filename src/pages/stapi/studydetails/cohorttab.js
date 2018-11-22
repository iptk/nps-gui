import React from 'react'
import {connect} from 'react-redux'
import {withNamespaces} from 'react-i18next'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import ParticipantCard from '../../../lib/dom/stapi/ParticipantCard'

const _ParticipantCards = ({participants, ...props}) => (
  participants.map(p =>
    <React.Fragment>
      <br/>
      <ParticipantCard key={p.alias+(p.id||'')} participant={p} {...props}/>
    </React.Fragment>
  )
)

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
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>{t('studydetails.cohorttab.cohortid')}</TableCell>
                  <TableCell>{cohort.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('dom-stapi:CohortCard.plannedParticipantCount')}</TableCell>
                  <TableCell>{cohort.plannedParticipantCount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('dom-stapi:CohortCard.participantCount')}</TableCell>
                  <TableCell>
                    {Math.max(cohort.participantIDs.length, cohort.participants.length)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <br/>
        <_ParticipantCards participants={cohort.participants}/>
      </div>
    )
  }
}

export default withNamespaces('pages-stapi', 'dom-stapi')(CohortTab)
