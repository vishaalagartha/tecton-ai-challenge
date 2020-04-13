import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import datasets from 'constants/tables.json';

export default class App extends Component { 

  constructor(props){
    super(props)
    this.state = {
      datasets,
      chosenDataset: datasets[0]
    }
  }

  componentDidMount() {
    d3.csv(this.state.chosenDataset.url)
      .then(data => {
          console.log(data)
        }
      )
  }

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
