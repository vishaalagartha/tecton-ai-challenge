import React, { Component } from 'react'
import './App.css'
import * as d3 from 'd3'
import datasets from 'constants/tables.json'
import { Container, Row, Button } from 'react-bootstrap'
import Table from 'Components/Table'

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
              if(!isNaN(val)){
                if(data[i][key].length>3)
                  data[i][key] = val.toFixed(3)
                else
                  data[i][key] = val
              }
            }
          }
          this.setState({...this.state, datasetName: this.state.datasets[i].name, data})
        }
      )
  }
  
  render() {
    return (
      <div>
        <Container>
          <Row style={{marginTop: '10px'}}>
            <h1>
              Tecton AI Datasets
            </h1>
          </Row>
          <Row style={{justifyContent: 'space-between'}}>
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
          <Row>
            <h3>
              Showing dataset: {this.state.datasetName} 
            </h3>
          </Row>
        </Container>
        <div style={{marginLeft: '10px', marginRight: '10px'}}>
          <Table style={{marginLeft: '10px', marginRight: '10px'}} name={this.state.datasetName} data={this.state.data}/>
        </div>
      </div>
    )
  }
}
