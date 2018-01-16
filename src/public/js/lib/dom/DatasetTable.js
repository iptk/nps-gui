import React from 'react'
import {Table} from 'react-toolbox'

import Dataset from '../model/Dataset.js'

class DatasetTable extends React.Component{
  state = {
    datasets: []
  }

  render(){
    return <Table
      heading="true"
      model={Dataset}
      source={this.state.datasets}
    />
  }
}

export default DatasetTable
