import React from 'react'
import {translate} from 'react-i18next'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import CollapsableCard from './CollapsableCard'

class MetaDatasetComparisonCard extends CollapsableCard{
  dlCSV = (dss) => {
    // TODO
  }

  render(){
    var {datasets, metaid, t} = this.props
    var metaKeys = []
    var flat = []
    // two arrays instead of an {id: meta}-object to prevent additional
    // runtime of Object.keys(...)
    var ids = []
    for(var ds of datasets){
      if(metaid in ds.metadatasets){
        var f = Object.flatten(ds.metadatasets[metaid].metadata)
        // we need to do this for every dataset as some keys might be missing
        // in some datasets. The complexity is horrible :(
        for(var mkey in f){
          if(!metaKeys.includes(mkey)){
            metaKeys.push(mkey)
          }
        }
        flat.push(f)
        ids.push(ds.id)
      }
    }

    var rows = ids.map((id, idx) => {
        var cells = [<TableCell key='__dsid_'>{id}</TableCell>]
        for(var mk of metaKeys){
          cells.push(
            <TableCell key={mk}>{
              (mk in flat[idx])
                ? flat[idx][mk]
                : '-'
            }</TableCell>
          )
        }
        return (<TableRow key={idx}>{cells}</TableRow>)
      })
      
    return super.render(
      metaid,
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key='__dsid_'>{t('MetaDatasetComparisonCard.dataset')}</TableCell>
              {
                metaKeys.map(mk => <TableCell key={mk}>{mk}</TableCell>)
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
        <Button>
          <Icon>save_alt</Icon>
          {t('MetaDatasetComparisonCard.csvexport')}
        </Button>
      </div>
    )
  }
}

export default translate('dom')(MetaDatasetComparisonCard)
