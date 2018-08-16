import React from 'react'
import {translate} from 'react-i18next'
import {withStyles} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import amber from '@material-ui/core/colors/amber'
import white from '@material-ui/core/colors/amber'

import 'react-vis/dist/style.css'
import {
  FlexibleXYPlot,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis
} from 'react-vis'

import {ChartType} from './charts'
import CollapsableCard from './CollapsableCard'

const styles = theme => ({
  tableContainer: {
    width: '100%',
    overflowX: 'scroll'
  },
  textFieldContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '30%',
    minWidth: '200'
  },
  chartWarning: {
    backgroundColor: amber[700],
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit
  },
  chartContainer: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    height: '100%',
    width: '100%',
    maxHeight: '100vh',
    maxWidth: '100vw',
    boxSizing: 'border-box'
  }
})

@withStyles(styles)
class CompTable extends React.PureComponent{
  render(){
    var {classes, datasets, metaid, t} = this.props
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
      <div className={classes.tableContainer}>
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

@withStyles(styles)
class CompChartSectionFields extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      chartType: 'LINE_CHART',
      xKey: '',
      yKey: '',
      keys: []
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
      this.props.onChangeAxis(axis, this.state.keys[evt.target.value])
    }
  }

  getUsableKeys(obj, parentKey = ''){
    if(parentKey.length > 0){
      parentKey += '.'
    }

    var keys = []
    for(var key in obj){
      if(Array.isArray(obj[key])){
        keys.push({label: parentKey+key, type: 'array'})
      }
      else if(typeof obj[key] === 'object'){
        keys = keys.concat(
          getRecursKeys(obj[key], parentKey+key)
        )
      }
      else{
        keys.push({label: parentKey+key, type: typeof obj[key]})
      }
    }
    return keys
  }

  render(){
    var {classes, datasets, metaid, t} = this.props

    var keys = {'__dsid_': {label: t('MetaDatasetComparisonCard.dataset'), type: 'dsid'}}
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
    this.state.keys = keys

    var seqAdd = ` (${t('MetaDatasetComparisonCard.chart.sequence')})`
    var keyItems = Object.keys(keys).map(k => (
      <MenuItem key={k} value={k}>
        {keys[k].label+(keys[k].type === 'array' ?seqAdd :'')}
      </MenuItem>
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

@withStyles(styles)
class CompChartChart extends React.PureComponent{
  getNestedData(keys, obj, defaultVal=0){
    var cur = obj
    for(var k of keys){
      if(!(k in cur)){
        return defaultVal
      }
      cur = cur[k]
    }
    return cur
  }

  sortData(data){
    data.sort((a,b) => a.x-b.x)
    return data
  }

  transformData(xAxis, yAxis, datasets, metaid){
    var data = []
    var xKeys = xAxis.label.split('.')
    var yKeys = yAxis.label.split('.')

    // if xAxis is an array, yAxis also is one
    if(xAxis.type === 'array'){
      for(var ds of datasets){
        if(!(metaid in ds.metadatasets)){
          continue
        }
        var x = this.getNestedData(xKeys, ds.metadatasets[metaid].metadata)
        var y = this.getNestedData(yKeys, ds.metadatasets[metaid].metadata)
        var dat = []
        var length = x.length > y.length ?x.length :y.length
        for(var i = 0; i < length; i++){
          dat.push({
            x: i < x.length ?x[i] :0,
            y: i < y.length ?y[i] :0
          })
        }
        data.push(this.sortData(dat))
      }
    }
    else{
      for(var ds of datasets){
        if(!(metaid in ds.metadatasets)){
          continue
        }
        data.push({
          x: xAxis.type === 'dsid'
            ?ds.id
            :(this.getNestedData(xKeys, ds.metadatasets[metaid].metadata) || ''),
          y: yAxis.type === 'dsid'
            ?ds.id
            :(this.getNestedData(yKeys, ds.metadatasets[metaid].metadata) || '')
        })
      }
      data = [this.sortData(data)]
    }
    return data
  }

  getAxisTypes(xAxis, yAxis, data){
    const determineType = (dat) => {
      // number
      if(typeof dat === 'number'){
        return 'linear'
      }
      // date
      var date = new Date(dat)
      if(date instanceof Date && !isNaN(date)){
        return 'time'
      }
      // strings
      return 'ordinal'
    }
    const transformType = (axis, data, idx) => {
      // numbers are always linear
      if(axis.type === 'number'){
        return 'linear'
      }
      // strings and array need extra checks
      return determineType(data[0][0][idx])
    }
    return {
      x: transformType(xAxis, data, 'x'),
      y: transformType(yAxis, data, 'y')
    }
  }

  render(){
    var {classes, xAxis, yAxis, datasets, chartType, t, metaid} = this.props

    // Do not display anything if axis are not chosen
    if(xAxis === null || yAxis === null){
      return ''
    }

    // An array and a single value
    var yArr = yAxis.type === 'array'
    if(xAxis.type === 'array' ?!yArr :yArr){
      return <section>
          <Paper elevation={1} className={classes.chartWarning}>
            <Typography variant='body2'>
              {t('MetaDatasetComparisonCard.chart.arraywarning')}
            </Typography>
          </Paper>
        </section>
    }

    var data = this.transformData(xAxis, yAxis, datasets, metaid)
    var axisTypes = this.getAxisTypes(xAxis, yAxis, data)
    console.log(axisTypes, data)
    // display the graph!
    return (
      <div className={classes.chartContainer}>
        {/*TODO: margin exactly content-fitting*/}
        <FlexibleXYPlot
          xType={axisTypes.x}
          yType={axisTypes.y}
          margin={{left: '80', bottom: '80'}}
        >
          <VerticalGridLines/>
          <HorizontalGridLines/>
          <XAxis title={xAxis.label}
            tickLabelAngle={axisTypes.x === 'linear' ?0 :-90}/>
          <YAxis title={yAxis.label}/>
          {data.map((d, idx) => {
            console.log(d, idx)
            var Component = ChartType[chartType].class
            return <Component data={d} key={idx}/>
          })}
        </FlexibleXYPlot>
      </div>
    )
  }
}

class CompChartSection extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      chartType: 'LINE_CHART',
      xAxis: null,
      yAxis: null
    }
  }

  handleChangeType(type){
    this.setState({
      chartType: type
    })
  }
  handleChangeAxis(axis, key){
    this.setState({
      [axis+'Axis']: key
    })
  }

  render(){
    var {classes, datasets, t} = this.props

    return (
      <section>
        <CompChartSectionFields {...this.props}
          onChangeType={this.handleChangeType.bind(this)}
          onChangeAxis={this.handleChangeAxis.bind(this)}
        />
        <CompChartChart {...this.props}
          chartType={this.state.chartType}
          xAxis={this.state.xAxis}
          yAxis={this.state.yAxis}
        />
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

export default translate('dom')(MetaDatasetComparisonCard)
