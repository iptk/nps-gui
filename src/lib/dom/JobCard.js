import React from 'react'
import {
  Card, CardTitle,
  Link,
  Table, TableHead, TableCell, TableRow
} from 'react-toolbox'
import {translate} from 'react-i18next'

const JobCard = ({jobs, t, status}) => {
  var rows = jobs.map((elem, idx) => (
    <TableRow key={idx}>
      <TableCell>
        <Link href={"/dataset/"+elem.dataset_id}
          label={elem.dataset_id} icon='exit_to_app'/>
      </TableCell>
      <TableCell>{elem.getMetadata('command').value}</TableCell>
    </TableRow>
  ))
  var title = t('JobCard.jobs')
  if(status){
    title += " ("+t('JobCard.status.'+status)+")"
  }
  return (
    <Card>
      <CardTitle title={title}/>
      <Table selectable={false} multiSelectable={false}>
        <TableHead>
          <TableCell>{t('JobCard.dataset')}</TableCell>
          <TableCell>command</TableCell>
        </TableHead>
        {rows}
      </Table>
    </Card>
  )
}

export default translate('dom')(JobCard)
