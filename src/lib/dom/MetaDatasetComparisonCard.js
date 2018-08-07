import React from 'react'
import {translate} from 'react-i18next'
import {withStyles} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import MenuItem from '@material-ui/core/MenuItem'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'

import {ChartType} from './charts'
import CollapsableCard from './CollapsableCard'

const styles = theme => ({
  textFieldContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '30%',
    minWidth: '200'
  }
})

class CompTable extends React.PureComponent{
  render(){
    var {datasets, metaid, t} = this.props
    var metaKeys = []
    var flat = []
    // two arrays instead of an {id: meta}-object to prevent additional
    // runtime of Object.keys(...)
    var ids = []
    var csv = 'Dataset-ID'

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

    var tableHead = metaKeys.map(mk => {
      csv += `;${mk}`
      return <TableCell key={mk}>{mk}</TableCell>
    })
    csv += '\n'

    var rows = ids.map((id, idx) => {
        var cells = [<TableCell key='__dsid_'>{id}</TableCell>]
        csv += id
        for(var mk of metaKeys){
          var val = (mk in flat[idx]) ?flat[idx][mk] :'-'
          csv += `;${val}`
          cells.push(
            <Tooltip key={mk} title={mk} enterDelay={600}>
              <TableCell>{val}</TableCell>
            </Tooltip>
          )
        }
        csv += '\n'
        return (<TableRow key={idx}>{cells}</TableRow>)
      })

    csv = btoa(csv)

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key='__dsid_'>{t('MetaDatasetComparisonCard.dataset')}</TableCell>
              {tableHead}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
        <Button href={'data:text/csv;base64,'+csv} download={metaid+'.csv'}>
          <Icon>save_alt</Icon>
          {t('MetaDatasetComparisonCard.csvexport')}
        </Button>
      </div>
    )
  }
}

class CompChartSectionFields extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      chartType: 'LINE_CHART',
      xKey: '__dsid_',
      yKey: '__dsid_'
    }
  }
  changeType(evt){
    this.setState({
      chartType: evt.target.value
    })
    if(this.props.onChangeType){
      this.props.onChangeType(evt.target.value)
    }
  }
  changeAxis = axis => evt => {
    this.setState({
      [axis+'Key']: evt.target.value
    })
    if(this.props.onChangeAxis){
      this.props.onChangeAxis(axis, evt.target.value)
    }
  }

  getUsableKeys(obj){
    // totally wrong, but placeholder
    return Object.keys(Object.flatten(obj)).map(k => ({
      label: k, type: 'string'
    }))
  }

  render(){
    var {classes, datasets, metaid, t} = this.props

    // TODO: __dsid_ => t('....dsid')
    var keys = {'__dsid_': {label: '__dsid_', type: 'dsid'}}
    for(var ds of datasets){
      if(metaid in ds.metadatasets){
        var f = this.getUsableKeys(ds.metadatasets[metaid].metadata)
        // we need to do this for every dataset as some keys might be missing
        // in some datasets. The complexity is horrible :(
        for(var mkey of f){
          if(!(mkey.label in keys)){
            keys[mkey.label] = mkey
          }
        }
      }
    }
    this.state[keys] = keys

    var keyItems = Object.keys(keys).map(k => (
      <MenuItem key={k} value={k}>{keys[k].label}</MenuItem>
    ))

    return (
      <section className={classes.textFieldContainer}>
        <TextField select
          label={t('MetaDatasetComparisonCard.chart.charttype')}
          onChange={this.changeType.bind(this)}
          margin="normal"
          value={this.state.chartType}
          className={classes.textField}
        >
          {Object.keys(ChartType).map(ct => (
            <MenuItem key={ct} value={ct}>
              {t(ChartType[ct].label)}
            </MenuItem>
          ))}
        </TextField>
        <TextField select
          label={t('MetaDatasetComparisonCard.chart.xaxis')}
          value={this.state.xKey}
          margin="normal"
          onChange={this.changeAxis('x')}
          className={classes.textField}
        >
          {keyItems}
        </TextField>
        <TextField select
          label={t('MetaDatasetComparisonCard.chart.yaxis')}
          value={this.state.yKey}
          margin="normal"
          onChange={this.changeAxis('y')}
          className={classes.textField}
        >
          {keyItems}
        </TextField>
      </section>
    )
  }
}

class CompChartSection extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      chartType: 'LINE_CHART',
      xKey: '__dsid_',
      yKey: '__dsid_'
    }
  }

  render(){
    var {classes, datasets, t} = this.props

    return (
      <section>
        <CompChartSectionFields {...this.props}/>
      </section>
    )
  }
}

class MetaDatasetComparisonCard extends CollapsableCard{
  render(){
    return super.render(
      this.props.metaid,
      <div>
        <CompTable {...this.props}/>
        <Divider/>
        <br/>
        <CompChartSection {...this.props}/>
        <br/>
      </div>
    )
  }
}

export default translate('dom')(
  withStyles(styles)(MetaDatasetComparisonCard)
)
