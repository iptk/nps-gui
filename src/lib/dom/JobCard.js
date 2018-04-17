import React from 'react'
import {
  Card, CardTitle,
  Link,
  Table, TableHead, TableCell, TableRow
} from 'react-toolbox'
import {translate} from 'react-i18next'

const JobCard = ({jobs, t}) => {
  var rows = jobs.map((elem, idx) => (
    <TableRow key={idx}>
      <TableCell>
        <Link href={"/dataset/"+elem.dataset_id} label={elem.dataset_id}/>
      </TableCell>
      <TableCell>{elem.getMetadata('command').value}</TableCell>
    </TableRow>
  ))
  return (
    <Card>
      <CardTitle title={t('JobCard.jobs')}/>
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
