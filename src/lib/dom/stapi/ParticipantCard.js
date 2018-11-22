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

class ParticipantCard extends CollapsableCard{
  render(){
    var {participant, t} = this.props

    var datasetTable = null
    if(participant.datasets.length > 0){
      datasetTable = (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('ParticipantCard.dataset.id')}</TableCell>
              <TableCell>{t('ParticipantCard.dataset.datasetID')}</TableCell>
              <TableCell>{t('ParticipantCard.dataset.date')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participant.datasets.map(d => (
              <TableRow key={d.id || d.datasetID}>
                <TableCell>{d.id}</TableCell>
                <TableCell>{d.datasetID}</TableCell>
                <TableCell>
                  {d.date ?d.date.date :'-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }

    var dateTable = null
    if(participant.dates.length > 0){
      dateTable = (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('ParticipantCard.date.id')}</TableCell>
              <TableCell>{t('ParticipantCard.date.date')}</TableCell>
              <TableCell>{t('ParticipantCard.date.datasetCount')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.dates.map(d => (
              <TableRow key={d.id || d.date}>
                <TableCell>{d.id}</TableCell>
                <TableCell>{d.date}</TableCell>
                <TableCell>
                  {Math.max(d.datasetIDs.length, d.datasets.length)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }

    return super.render(
      participant.alias,
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{t('ParticipantCard.alias')}</TableCell>
              <TableCell>{participant.alias}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('ParticipantCard.id')}</TableCell>
              <TableCell>{participant.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('ParticipantCard.datasetCount')}</TableCell>
              <TableCell>
                {Math.max(participant.datasetIDs.length, participant.datasets.length)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('ParticipantCard.dateCount')}</TableCell>
              <TableCell>
                {Math.max(participant.dateIDs.length, participant.dates.length)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {datasetTable
          ?<React.Fragment>
              <br/>
              <Typography variant='subheading'>
                {t('ParticipantCard.datasetTableHeadline')}
              </Typography>
              {datasetTable}
            </React.Fragment>
          :null
        }
        {dateTable
          ?<React.Fragment>
              <br/>
              <Typography variant='subheading'>
                {t('ParticipantCard.dateTableHeadline')}
              </Typography>
              {dateTable}
            </React.Fragment>
          :null
        }
      </CardContent>,
      <CardActions>
      </CardActions>
    )
  }
}

export default withNamespaces('dom-stapi')(ParticipantCard)
