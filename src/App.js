import React, { Component } from 'react';
import CharsLine from './component/charts'
import D3ChartLine from './component/d3-chart'
import './App.css';


class App extends Component {

  componentDidMount () {
    this.renderChartsLine('charts', 20)
    this.renderD3ChartLine('d3Chart', 20)
  }

  getMockData = (mockNum) => ({
    labels: Array.from({ length: mockNum }, (item, i) => `label${i}`),
    datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: Array.from({ length: mockNum }, () => Math.floor(Math.random() * 90) + 10),
      },
      {
        label: "My Second dataset",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: Array.from({ length: mockNum }, () => Math.floor(Math.random() * 90) + 10),
      }
    ]
  })
  renderChartsLine (node, mockNum) {
    console.time('chartsTime')
    new CharsLine({ node, ...this.getMockData(mockNum) }).init()
    console.timeEnd('chartsTime')
  }

  renderD3ChartLine (node, mockNum) {
    const data = {
      labels: Array.from({ length: mockNum }, (item, i) => `label${i}`),
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: Array.from({ length: mockNum }, () => Math.floor(Math.random() * 90) + 10),
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: Array.from({ length: mockNum }, () => Math.floor(Math.random() * 90) + 10),
        }
      ]
    }
    console.time('waveTime')
    new D3ChartLine(data).init()
    console.timeEnd('waveTime')
  }

  render () {
    return (
      <div className="compare-area">
        <div className="box-item" id="charts"></div>
        <div className="box-item d3Chart"></div>
        <div className="box-item"></div>
      </div >
    )
  }
}

export default App;
