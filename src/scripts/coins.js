import * as d3 from 'd3';
import Trig from './utils/trig';

const COLORS = ['hotpink', 'white', 'hotpink', 'white'];

class Coins {
  constructor(options) {

    this._container = null;

    this._data = options.data;
    this._containerId = options.containerId;
    this._containerWidth = options.width;
    this._containerHeight = options.height;
  }

  init() {
    this._container = d3.select(`#${ this._containerId }`);

    this._container.style('background', 'black');

    this.plotGuidelines(this._container.append('g').attr('id', 'guidelines'));
    this.plotXAxis(this._container.append('g').attr('id', 'xAxis'));

    this.plotActiveCircles(this._container.append('g').attr('id', 'active'));

  }

  plotXAxis(group) {

    let offsetX = 0;
    for (let i = 0; i < this._data.length; i++) {
      const d = this._data[i];
      const lineWidth = this._containerWidth * (d.populationPerc / 100);
      const startX = offsetX;
      const startY = this._containerHeight;
      group
        .append('g')
        .attr('id', `axis-${ i }`)
        .append('path')
        .classed('axis-path', true)
        .attr('d', `M ${ startX } ${ startY } h ${ lineWidth }`)
        .style('stroke', COLORS[i]);

      offsetX += lineWidth;

    }
  }

  plotGuidelines(group) {

    let offsetX = 0;
    for (let i = 0; i < this._data.length; i++) {
      const d = this._data[i];
      const xPos = this._containerWidth * (d.populationPerc / 100);

      for (let j = 0; j < 100; j++) {
        this.plotCircle({
          t: j / 100,
          data: d,
          className: 'guide',
          startOffset: 0.3,
          endOffset: 1 - (100 - d.wealthPerc) * 0.01,
          radius: 1,
          group,
          x: offsetX + (xPos / 2)
        });
      }

      offsetX += xPos;
    }
  }

  plotActiveCircles(group) {
    let offsetX = 0;

    for (let i = 0; i < this._data.length; i++) {
      const d = this._data[i];
      const xPos = this._containerWidth * (d.populationPerc / 100);

      for (let j = 0; j < ~~d.wealthTn; j++) {
        this.plotCircle({
          t: j / ~~d.wealthTn,
          data: d,
          color: COLORS[i],
          startOffset: (100 - d.wealthPerc) * 0.01,
          group,
          x: offsetX + (xPos / 2)
        });
      }

      offsetX += xPos;
    }
  }

  plotCircle({ t, x, color, startOffset = 0, endOffset = 0, className = 'dot', radius = 2, group }) {
    const pos = Trig.getPositionOnScaledCurve({
      x0: 0,
      x1: x,
      w: this._containerWidth,
      h: this._containerHeight,
      t,
      startOffset,
      endOffset
    });

    const c = group
      .append('circle')
      .attr('id', t)
      .classed(className, true)
      .attr('r', radius)
      .attr('cx', pos.x)
      .attr('cy', pos.y);

    if (color) {
      c.style('fill', color);
    }
  }
}

export default Coins;
