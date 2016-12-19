import * as d3 from 'd3';
import Trig from './utils/trig';

const COLORS = ['hotpink', 'tomato', 'orange', 'powderblue'];

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

    for (let i = 0; i < this._data.length; i++) {
      const d = this._data[i];

      for (let j = 0; j < ~~d.wealthTn; j++) {
        this.plotCircle(j / ~~d.wealthTn, d, COLORS[i]);
      }
    }


  }

  plotCircle(t, data, color = 'hotpink') {
    const { x, y } = Trig.getPositionOnScaledCurve({
      x0: 0,
      x1: this._containerWidth * ((100 - data.populationPerc) / 100),
      w: this._containerWidth,
      h: this._containerHeight,
      t,
      tOffset: (100 - data.wealthPerc) * 0.01
    });

    this._container
      .append('circle')
      .attr('id', t)
      .attr('r', 1)
      .attr('cx', x)
      .attr('cy', y)
      .style('fill', color);
  }
}

export default Coins;
