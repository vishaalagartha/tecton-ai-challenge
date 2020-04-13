import React, { Component } from 'react'
import './App.css'
import * as d3 from 'd3'
import datasets from 'constants/tables.json'
import { Container, Row, Button } from 'react-bootstrap'

export default class App extends Component { 

  constructor(props){
    super(props)
    this.state = {
      datasets,
      datasetName: ''
    }
  }

  componentDidMount() {
    this.fetchDataset(0)
  }

  fetchDataset = i => {
    this.setState({...this.state, datasetName: this.state.datasets[i].name})
    d3.csv(this.state.datasets[i].url)
      .then(data => {
          console.log(data)
        }
      )
  }
  
  render() {
    return (
      <Container>
        <Row style={{marginTop: '10px'}}>
          <h1>
            Tecton AI Datasets
          </h1>
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {
            this.state.datasets.map((el, i) => {
              console.log(el)
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
    )
  }
}
