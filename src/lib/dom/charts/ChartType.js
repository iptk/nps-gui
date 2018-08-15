import {
  LineSeries,
  LineMarkSeries,
  MarkSeries,
  VerticalBarSeries
} from 'react-vis'

const ChartType = Object.freeze({
  LINE_CHART: {label: 'charts.ChartType.line', class: LineSeries},
  //BAR_CHART: {label: 'charts.ChartType.bar', class: VerticalBarSeries},
  MARK_CHART: {label: 'charts.ChartType.mark', class: MarkSeries},
  LINEMARK_CHART: {label: 'charts.ChartType.linemark', class: LineMarkSeries}
})

export {ChartType}
export default ChartType
