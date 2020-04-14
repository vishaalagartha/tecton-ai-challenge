import React, { Component } from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Card } from 'react-bootstrap'
import { FaList } from 'react-icons/fa'

const rowStyle = (row, rowIndex) => {
  console.log(rowIndex)
    const style = {}
    if (rowIndex%2===0)
        style.backgroundColor = 'rgba(0,0,0,.05)'

    return style
}

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
    if(prevProps.name!==this.props.name){
      this.renderTable()
    }
  }

  render() {
    return (
      <Card style={{margin: '10px 0px 10px 0px'}}>
        <Card.Header>
          <FaList style={{fontSize: '25px', marginRight: '10px'}}/>
          All Data
        </Card.Header>
        <Card.Body>
          {this.state.fetched ?
          <BootstrapTable bootstrap4 keyField={this.state.keyField} data={ this.state.data } columns={ this.state.columns } pagination={ paginationFactory()} rowStyle={rowStyle}/>
          :
          null
          }
        </Card.Body>
      </Card>
    )
  }
}
