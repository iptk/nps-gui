import React from 'react'
import {translate} from 'react-i18next'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import CollapsableCard from './CollapsableCard'

class MetaDatasetComparisonCard extends CollapsableCard{
  dlCSV = (dss) => {
    // TODO
  }

  render(){
    var {datasets, metaid} = this.props
    var metaKeys = []
    for(var ds of datasets){
      if(metaid in ds.metadatasets){
        // we need to do this for every dataset as some keys might be missing
        // in some datasets. The complexity is horrible :(
        for(var mkey in ds.metadatasets[metaid]){
          if(!metakeys.includes(mkey)){
            metakeys.push(mkey)
          }
        }
      }
    }

    var rows = datasets
      .filter(ds => metaid in ds.metadatasets)
      .map((ds) => {
        var cells = [<TableCell>ds.id</TableCell>]
        for(var mk in metakeys){
          cells.push(
            <TableCell>{
              mk in ds.metadatasets[metaid]
                ? ds.metadatasets[metaid][mk]
                : '-'
            }</TableCell>
          )
        }
        return (<TableRow>{cells}</TableRow>)
      })
    return super.render(
      t('DatasetFilesCard.files'),
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('MetaDatasetComparisonCard.dataset')}</TableCell>
              {
                metaKeys.map(mk => <TableCell>mk</TableCell>)
              }
            </TableRow>
          </TableHead>
          {rows}
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
