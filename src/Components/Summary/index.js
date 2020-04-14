import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

export default class Leaderboard extends Component { 
  
  constructor(props){
    super(props)
    this.state = {
      fetched: false,
      summary: null
    }
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    if(prevProps.name!==this.props.name){
      let summary = []
      for(let i=0; i<Object.keys(this.props.data[0]).length; i++){
        const key = Object.keys(this.props.data[0])[i]
        const elements = this.props.data.map(el => el[key])
        if(typeof(elements[0])==='number'){
          const min = Math.min.apply(null, elements)
          const max = Math.max.apply(null, elements)
          const mean = elements.reduce((a, b) => a + b) / elements.length
          const stdDev = Math.sqrt(elements.map(x => Math.pow(x-mean,2)).reduce((a,b) => a+b)/elements.length)
          const nullCounts = elements.filter(el => el===null).length
          summary.push({key, min, max, mean, stdDev, nullCounts})
        }
        else {
          summary.push({key})
        }
      }
      this.setState({...this.state, fetched: true, summary})
    }
  }

  renderStat = (stat) => {
   return (
     this.state.summary.map(el => el[stat]).map((el, i) => {
        if(el===undefined)
         return (<td key={i}>NA</td>)
        return (
          <td key={i}>{el}</td>
        )
      })
   )
  }

  render() {
    return (
        <div style={{marginTop: '10px'}}>
          {this.state.fetched ?
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
          :
          null
          }
        </div>
    )
  }
}
