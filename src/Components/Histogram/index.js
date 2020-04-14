import React, {Component} from 'react'
import { Card, DropdownButton, Dropdown } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { GiHistogram } from 'react-icons/gi'

export default class Histogram extends Component {

  constructor(props){
    super(props)
    // Resize histogram based on screen size (smaller for mobile screens)
    let width = 1300
    let height = 500
    if(window.innerWidth<=760){
      width = 350
    }
    this.state = {
      data: {},
      histogramTitle: '',
      histogramData: [],
      width,
      height
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.name!==this.props.name){
      // Ensure that data is numerical since categorical data should not be
      // added to the histogram
      let data = {}
      for(let i=0; i<Object.keys(this.props.data[0]).length; i++){
        const key = Object.keys(this.props.data[0])[i]
        const elements = this.props.data.map(el => el[key])
        const distinct = [...new Set(elements)]
        if(typeof(elements[0])==='number' && distinct.length>2){
          data[key] = elements
        }
      }
      const key = Object.keys(data)[0]
      this.setState({...this.state, data, histogramTitle: key, histogramData: data[key]})
    }
  }

  // Resets the histogram's data
  setHistogramData = el => {
    this.setState({...this.state, histogramTitle: el, histogramData: this.state.data[el]})
  }

  render() {
    return (
      <Card style={{height: '650px', margin: '10px 0px 10px 0px'}}>
        <Card.Header>
          <GiHistogram style={{fontSize: '25px', marginRight: '10px'}}/>
          Attribute Distribution
        </Card.Header>
        <Card.Body>
          {/* Allow user to select attribute to show histogram for via dropdown */ }
          <DropdownButton title='Select Attribute'>
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
            {type: 'histogram', x: this.state.histogramData,
             marker: {
                color: 'rgba(100, 200, 102, 0.7)',
                line: {
                  color:  'rgba(100, 200, 102, 1)', 
                  width: 1
                } 

             }
            },
          ]}
          layout={ 
            {width: this.state.width, height: this.state.height, title: this.state.histogramTitle, xaxis: {title: 'Value'},  yaxis: {title: 'Count'}
            } 
          }
          />
        </Card.Body>
      </Card>
    )
  }
}
