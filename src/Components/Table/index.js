import React, { Component } from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import BootstrapTable from 'react-bootstrap-table-next'

export default class Leaderboard extends Component { 
  
  constructor(props){
    super(props)
    this.state = {
      fetched: false,
      keyField: '',
      columns: [],
      data: []
    }
  }

  renderTable = () => {
    let columns = Object.keys(this.props.data[0]).map(el => {
      return {
        dataField: el,
        text: el,
        sort: true,
      }
    })
    this.setState({...this.state, fetched: true, data: this.props.data, keyField: columns[0].text, columns}) 


  }


  componentDidUpdate(prevProps) {
    console.log(prevProps, this.props)
    if(prevProps.name!==this.props.name){
      this.renderTable()
    }
  }

  render() {
    return (
        <div style={{marginTop: '10px'}}>
          {this.state.fetched ?
          <BootstrapTable bootstrap4 keyField={this.state.keyField} data={ this.state.data } columns={ this.state.columns } />
          :
          null
          }
        </div>
    )
  }
}
