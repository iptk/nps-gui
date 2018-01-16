import {connect} from 'react-redux'

import DatasetTable from '../dom/DatasetTable'

const mapStateToProps = state => {
  return {
    source: state.datasets
  }
}

const FilteredDatasetTable = connect(
  mapStateToProps
)(DatasetTable)

export default FilteredDatasetTable
