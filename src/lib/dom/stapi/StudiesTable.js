import React from 'react'
import {withNamespaces} from 'react-i18next'

import Divider from '@material-ui/core/Divider'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

class StudiesTable extends React.PureComponent{
  onChangeRowsPerPage(evt){
    console.log(evt.target)
    var num = evt.target.value
    if(this.props.onChangeRowsPerPage){
      this.props.onChangeRowsPerPage(num)
    }
  }

  onChangePage(evt, page){
    if(this.props.onChangePage){
      this.props.onChangePage(page)
    }
  }

  render(){
    var {range, rowsPerPage, studies, t} = this.props
    var rowsPerPageOptions = [10, 25, 50, 75, 100]
    if(range.max > 100){
      rowsPerPageOptions.push(range.max)
    }
    return (
      <div>
        <Table fullWidth>
          <TableHead>
            <TableRow>
              <TableCell>{t('StudiesTable.id')}</TableCell>
              <TableCell>{t('StudiesTable.name')}</TableCell>
              <TableCell>{t('StudiesTable.cohortcount')}</TableCell>
              <TableCell>{t('StudiesTable.date')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studies.map(s => (
              <TableRow>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.cohortIDs.length}</TableCell>
                <TableCell>unknown</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          count={range.max}
          rowsPerPage={rowsPerPage}
          page={Math.floor((range.start+1)/rowsPerPage)}
          labelRowsPerPage={t('StudiesTable.rowsperpage')}
          onChangeRowsPerPage={this.onChangeRowsPerPage.bind(this)}
          onChangePage={this.onChangePage.bind(this)}
          fullWidth
          component='div'
        />
        <Divider/>
      </div>
    )
  }
}

export default withNamespaces('dom-stapi')(StudiesTable)
