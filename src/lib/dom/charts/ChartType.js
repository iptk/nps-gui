import {
  HorizontalBarSeries,
  LineSeries,
  LineMarkSeries,
  MarkSeries,
  VerticalBarSeries
} from 'react-vis'

const ChartType = Object.freeze({
  LINE_CHART: {label: 'charts.ChartType.line', class: LineSeries},
  MARK_CHART: {label: 'charts.ChartType.mark', class: MarkSeries},
  LINEMARK_CHART: {label: 'charts.ChartType.linemark', class: LineMarkSeries},
  BAR_VERT_CHART: {label: 'charts.ChartType.barvert', class: VerticalBarSeries},
  BAR_HORZ_CHART: {label: 'charts.ChartType.barhorz', class: HorizontalBarSeries}
})

export {ChartType}
export default ChartType
