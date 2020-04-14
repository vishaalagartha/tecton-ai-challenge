import React, { Component } from 'react'
import './App.css'
import * as d3 from 'd3'
import datasets from 'constants/tables.json'
import { Row, DropdownButton, Dropdown } from 'react-bootstrap'
import Table from 'Components/Table'
import Summary from 'Components/Summary'
import Histogram from 'Components/Histogram'

export default class App extends Component { 

  constructor(props){
    super(props)
    this.state = {
      datasets,
      datasetName: '',
      nRows: 0,
      data: []
    }
  }

  // Fetch default dataset 0 (content)
  componentDidMount() {
    this.fetchDataset(0)
  }

  // Fetch certain dataset and format values
  fetchDataset = i => {
    d3.csv('https://cors-anywhere.herokuapp.com/'+this.state.datasets[i].url)
      .then(data => {
          for(let i=0; i<data.length; i++){
            for(let k=0; k<Object.keys(data[0]).length; k++){
              const key = Object.keys(data[0])[k]
              
              // Check if value is a float or an int and parse appropriately
              const val = parseFloat(data[i][key])
              if(!isNaN(val))
                data[i][key] = data[i][key].length>3 ? parseFloat(val.toFixed(3)) : val
            }
          }

          // Update state to reflect chosen dataset
          this.setState({...this.state, datasetName: this.state.datasets[i].name, data, nRows: this.state.datasets[i].row_count})
        }
      )
  }
  
  render() {
    return (
        <div style={{margin: '10px 10px 100px 10px'}}>
          <DropdownButton id='dataset-dropdown' title='Select Dataset' style={{marginTop: '10px'}}>
            {
              this.state.datasets.map((el, i) => {
               return (
                <Dropdown.Item key={i} onClick={() => this.fetchDataset(i)}>{el.name} ({el.row_count} rows)</Dropdown.Item>
               )

             })
            }
          </DropdownButton>
          <hr/>
          <div>
            <Row style={{justifyContent: 'space-around'}}>
              <h1>
                Dataset: {this.state.datasetName} 
              </h1>
            </Row>
            <h3>
              Number of rows: {this.state.nRows}
            </h3>
            <Summary name={this.state.datasetName} data={this.state.data} />
            <Histogram name={this.state.datasetName} data={this.state.data} />
            <Table name={this.state.datasetName} data={this.state.data}/>
         </div>
        </div>
    )
  }
}
