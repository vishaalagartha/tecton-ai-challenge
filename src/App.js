import React, { Component } from 'react'
import './App.css'
import * as d3 from 'd3'
import datasets from 'constants/tables.json'
import { Row, DropdownButton, Dropdown, Button } from 'react-bootstrap'
import Table from 'Components/Table'
import { RingLoader } from 'react-spinners'
import Summary from 'Components/Summary'
import Histogram from 'Components/Histogram'

export default class App extends Component { 

  constructor(props){
    super(props)
    this.state = {
      datasets,
      datasetName: '',
      data: []
    }
  }

  componentDidMount() {
    this.fetchDataset(0)
  }

  fetchDataset = i => {
    d3.csv(this.state.datasets[i].url)
      .then(data => {
          for(let i=0; i<data.length; i++){
            for(let k=0; k<Object.keys(data[0]).length; k++){
              const key = Object.keys(data[0])[k]
              const val = parseFloat(data[i][key])
              if(!isNaN(val))
                data[i][key] = data[i][key].length>3 ? parseFloat(val.toFixed(3)) : val
            }
          }
          this.setState({...this.state, datasetName: this.state.datasets[i].name, data})
        }
      )
  }
  
  render() {
    return (
        <div style={{margin: '10px 10px 10px 10px'}}>
          <DropdownButton id='dataset-dropdown' title='Select Dataset' style={{marginTop: '10px'}}>
            {
              this.state.datasets.map((el, i) => {
               return (
                <Dropdown.Item key={i} onClick={() => this.fetchDataset(i)}>{el.name}</Dropdown.Item>
               )

             })
            }
          </DropdownButton>
          <hr/>
          <div>
            <Row style={{justifyContent: 'space-around'}}>
              <h1>
                {this.state.datasetName} 
              </h1>
            </Row>
            <Summary name={this.state.datasetName} data={this.state.data} />
            <Histogram name={this.state.datasetName} data={this.state.data} />
            <Table name={this.state.datasetName} data={this.state.data}/>
         </div>
        </div>
    )
  }
}
