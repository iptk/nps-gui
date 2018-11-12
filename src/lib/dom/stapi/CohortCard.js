import React from 'react'
import {withNamespaces} from 'react-i18next'

import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import CollapsableCard from '../CollapsableCard'

class CohortCard extends CollapsableCard{

  openDetail(){
    if(this.props.onCohortDetail){
      this.props.onCohortDetail(
        null, `${this.props.cohort.name}.${this.props.cohort.id||''}`
      )
    }
  }

  render(){
    var {cohort, t} = this.props

    var participantTable = null
    if(cohort.participants.length > 0){
      participantTable = (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('CohortCard.participant.name')}</TableCell>
              <TableCell>{t('CohortCard.participant.datasetCount')}</TableCell>
              <TableCell>{t('CohortCard.participant.dateCount')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cohort.participants.map(p => (
              <TableRow key={p.id || p.alias}>
                <TableCell>{p.alias}</TableCell>
                <TableCell>
                  {Math.max(p.datasetIDs.length, p.datasets.length)}
                </TableCell>
                <TableCell>
                  {Math.max(p.dateIDs.length, p.dateIDs.length)}
                  {p.dates.length > 0
                    ?` (${t('CohortCard.last')}: ${p.dates[p.dates.length-1].date})`
                    :''
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }
    return super.render(
      cohort.name,
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{t('CohortCard.name')}</TableCell>
              <TableCell>{cohort.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('CohortCard.id')}</TableCell>
              <TableCell>{cohort.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('CohortCard.plannedParticipantCount')}</TableCell>
              <TableCell>{cohort.plannedParticipantCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('CohortCard.participantCount')}</TableCell>
              <TableCell>
                {Math.max(cohort.participantIDs.length, cohort.participants.length)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {participantTable
          ?<React.Fragment>
              <br/>
              <Typography variant='subheading'>
                {t('CohortCard.participantTableHeadline')}
              </Typography>
            </React.Fragment>
          :null
        }
        {participantTable}
      </CardContent>,
      <CardActions>
        <Button onClick={this.openDetail.bind(this)}>
          {t('CohortCard.opendetail')}
        </Button>
      </CardActions>
    )
  }
}

export default withNamespaces('dom-stapi')(CohortCard)
