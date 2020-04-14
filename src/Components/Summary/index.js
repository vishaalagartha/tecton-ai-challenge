import React, { Component } from 'react'
import { Card, Table } from 'react-bootstrap'
import { FaStar } from 'react-icons/fa'

export default class Leaderboard extends Component { 
  
  constructor(props){
    super(props)
    this.state = {
      summary: []
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.name!==this.props.name){
      let summary = []
      // Only include summary statistics for numerical data
      for(let i=0; i<Object.keys(this.props.data[0]).length; i++){
        const key = Object.keys(this.props.data[0])[i]
        const elements = this.props.data.map(el => el[key])
        if(typeof(elements[0])==='number'){
          // Add relevant statistics to summary and update state
          const min = Math.min.apply(null, elements)
          const max = Math.max.apply(null, elements)
          const mean = (elements.reduce((a, b) => a + b) / elements.length).toFixed(3)
          const stdDev = Math.sqrt(elements.map(x => Math.pow(x-mean,2)).reduce((a,b) => a+b)/elements.length).toFixed(3)
          const nullCounts = elements.filter(el => el===null).length
          summary.push({key, min, max, mean, stdDev, nullCounts})
        }
        else {
          // If non-numerical data, simply push the key without any statistics
          summary.push({key})
        }
      }
      this.setState({...this.state, summary})
    }
  }

  // Creates a row of data for relevant statistic
  renderStat = (stat) => {
   return (
     this.state.summary.map(el => el[stat]).map((el, i) => {
        if(el===undefined)
         // If non-numerical data, simply put NA in table cell
         return (<td key={i}>NA</td>)
        return (
          <td key={i}>{el}</td>
        )
      })
   )
  }

  render() {
    return (
        <Card style={{margin: '10px 0px 10px 0px'}}>
          <Card.Header>
            <FaStar style={{fontSize: '25px', marginRight: '10px'}}/>
            Summary Statistics
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Statistic</th>
                  {
                   this.state.summary.map((el, i) => {
                    return (
                      <th key={i}>{el.key}</th>
                    )
                   })
                  }
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Null Count</td>
                  {this.renderStat('nullCounts')}
                </tr>
                <tr>
                  <td>Min</td>
                  {this.renderStat('min')}
                </tr>
                <tr>
                  <td>Max</td>
                  {this.renderStat('max')}
                </tr>
                <tr>
                  <td>Mean</td>
                  {this.renderStat('mean')}
                </tr>
                <tr>
                  <td>Std Dev</td>
                  {this.renderStat('stdDev')}
                </tr>
              </tbody>
            </Table>
        </Card.Body>
      </Card>
    )
  }
}
