import React, {Component} from 'react'
import { Card, DropdownButton, Dropdown } from 'react-bootstrap'
import Plot from 'react-plotly.js';

export default class Histogram extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: {},
      histogramTitle: '',
      histogramData: []
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.name!==this.props.name){
      let data = {}
      for(let i=0; i<Object.keys(this.props.data[0]).length; i++){
        const key = Object.keys(this.props.data[0])[i]
        const elements = this.props.data.map(el => el[key])
        if(typeof(elements[0])==='number'){
          data[key] = elements
        }
      }
      const key = Object.keys(data)[0]
      this.setState({...this.state, data, histogramTitle: key, histogramData: data[key]})
    }
  }

  setHistogramData = el => {
    this.setState({...this.state, histogramTitle: el, histogramData: this.state.data[el]})
  }

  render() {
    return (
      <Card style={{height: '650px', margin: '10px 0px 10px 0px'}}>
        <Card.Header>
          Data Distribution
        </Card.Header>
        <Card.Body>
          <DropdownButton title='Choose Data'>
            {
              Object.keys(this.state.data).map((el, i) => {
                return (
                  <Dropdown.Item key={i} onClick={() => this.setHistogramData(el)}>{el}</Dropdown.Item>
                )
              })
             }
          </DropdownButton>
          <Plot
          data={[
            {type: 'histogram', x: this.state.histogramData},
          ]}
          layout={ {width: 1300, height: 500, title: this.state.histogramTitle} }
          />
        </Card.Body>
      </Card>
    )
  }
}
