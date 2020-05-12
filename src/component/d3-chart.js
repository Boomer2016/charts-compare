import * as d3 from 'd3'

const defaultOption = {
  width: 600,
  height: 400,
  hasArea: true,
  lineWidth: 2,
  areaOpacity: 0.1,
  hasDot: true,
  dotRadius: 4,
  dotColor: "rgba(151,187,205,1)",
  labelSize: 12,
  labelOpacity: 0.6,
  labelColor: "#000",
}

class D3ChartLine {

  constructor(option) {
    this._option = { ...defaultOption, ...option }
  }

  init () {
    const { datasets, labels, width, height, hasArea, hasDot } = this._option
    this._scaleX = d3.scalePoint().range([32, width]).domain(labels)
    const yDatas = datasets.reduce((total, item, i, arr) => total.concat(item.data), [])
    this._scaleY = d3.scaleLinear().range([height + 20 , 100]).domain([0, d3.max(yDatas)])
    this.root = d3.select('.d3Chart')
      .append("svg")
      .attr('width', width)
      .attr('height', height + 40)

    this._lineContainer = this.root.append('g')
      .attr('class', 'wave-line-lines')

    this._areaContainer = this.root.append('g')
      .attr('class', 'wave-line-areas')

    this._line = d3.line()
      .curve(d3.curveMonotoneX)
      .x((d, i) => this._scaleX(labels[i]))
      .y(d => this._scaleY(d))

    this._area = d3.area()
      .curve(d3.curveMonotoneX)
      .x((d, i) => this._scaleX(labels[i]))
      .y0(height)
      .y1(d => this._scaleY(d));

    datasets.forEach(item => {
      this.drawLine(item.data, item.strokeColor, item.strokeDasharray)
      if (hasArea) {
        this.drawArea(item.data, item.areaColor)
      }
      if (hasDot) {
        this.drawDot(item.data)
      }
    })
    this.drawXaxis(this._scaleX)

    return this
  }

  // 绘制直线
  drawLine (data, strokeColor, strokeDasharray) {
    const { lineWidth } = this._option
    this._lineContainer
      .append('path')
      .data([data])
      .attr('d', d => this._line(d))
      .attr('fill', 'none')
      .attr('stroke', strokeColor)
      .attr('stroke-width', lineWidth)
    // .attr('stroke-dasharray', strokeDasharray)
  }

  // 绘制区域
  drawArea (data, areaColor) {
    const { areaOpacity } = this._option
    this._areaContainer
      .append('path')
      .data([data])
      .attr('d', this._area)
      .attr('fill-opacity', areaOpacity)
      .attr('fill', areaColor)
  }

  // 绘制圆点
  drawDot (data) {
    const { dotRadius, dotColor, labels } = this._option
    const dotsSvg = this.root.append('g')
      .attr('class', 'wave-line-dots')
      .selectAll('.dot')
      .data(data)
      .enter()
    dotsSvg
      .append('circle')
      .attr('class', 'wave-line-dot')
      .attr('r', dotRadius)
      .attr('cx', (d, i) => this._scaleX(labels[i]))
      .attr('cy', d => this._scaleY(d))
      .attr('fill', dotColor)
  }

  // 绘制x轴
  drawXaxis (scale, textAngle = -30, textGap = 1) {
    const { xTickOpacity, height, labelSize, labelColor, labelOpacity, width } = this._option
    this._xaxisContainer = this.root.append('g')
      // .attr('class', 'wave-xaxis')
      .attr('transform', `translate(0, ${height})`)
      .attr('text-anchor', textAngle ? 'end' : 'middle')
      .attr('fill', 'none')

    this._xaxisContainer.append('path')
      .attr('stroke', 'transparent')
      .attr('d', `M${scale.range()[0]},6V0.5H${scale.range()[1]}V6`)

    const xKeys = this._xaxisContainer.selectAll('g')
      .data(scale.domain())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${scale(d)}, 0)`)

    xKeys.append('line')
      .attr('stroke', '#000000')
      .attr('stroke-opacity', xTickOpacity ? +xTickOpacity : 0.2)
      .attr('y2', 6)

    xKeys.append('text')
      .attr('class', 'wave-xaxis-item ')
      .attr('fill', labelColor)
      .attr('y', 30)
      .attr('font-size', labelSize)
      .attr('opacity', labelOpacity)
      .text((d, i) => (i % textGap === 0 ? d : ''))
      .attr('dominant-baseline', 'text-after-edge')
      .attr('transform', `rotate(${textAngle})`)
  }

  update () {

  }
}

export default D3ChartLine
