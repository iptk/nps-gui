import Dataset from '../lib/model/Dataset.js';

class DatasetTable{
  state = {
    datasets: []
  }

  render(){
    return <Table
      heading={true}
      model={Dataset}
      source={this.state.datasets}
    />;
  }
}
