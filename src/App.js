import React, { Component } from 'react'
import './App.css'
import * as d3 from 'd3'
import datasets from 'constants/tables.json'
import { Row, Button } from 'react-bootstrap'
import Table from 'Components/Table'
import { RingLoader } from 'react-spinners'
import Summary from 'Components/Summary'

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
        <div style={{marginLeft: '10px', marginRight: '10px'}}>
          <Row style={{margin: '10px 10px 10px 10px'}}>
            <h1>
              Available Datasets
            </h1>
          </Row>
          <Row style={{justifyContent: 'space-between', margin: '10px 10px 10px 10px'}}>
            {
              this.state.datasets.map((el, i) => {
                return (
                  <Button key={i} disabled={this.state.datasetName===el.name} onClick = {() => this.fetchDataset(i)}>
                    {el.name}
                  </Button>
                )
              })
            }
          </Row>
          <hr/>
          <div>
            <Row style={{margin: '10px 10px 10px 10px'}}>
              <h1>
                Name: {this.state.datasetName} 
              </h1>
            </Row>
            <h3>
              Summary Statistics
            </h3>
            <Summary name={this.state.datasetName} data={this.state.data} />
            <h3>
              All Data
            </h3>
            <Table name={this.state.datasetName} data={this.state.data}/>
         </div>
        </div>
    )
  }
}
