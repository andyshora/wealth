import * as d3 from 'd3';
import Trig from './utils/trig';

class Coins {
  constructor(options) {

    this._container = null;

    this._data = options.data;
    this._containerId = options.containerId;

  }

  init() {
    this._container = d3.select(`#${ this._containerId }`);

    this._container.style('background', 'lightgrey');

    for (var i = 0; i < 100; i++) {
      this.plotCircle(i / 100);
    }
  }

  plotCircle(t) {
    const { x, y } = Trig.getPositionOnScaledCurve({ x0: 0, x1: 800, w: 1000, h: 200, t });
    console.log(t, x, y);

    this._container
      .append('circle')
      .attr('id', t)
      .attr('r', 2)
      .attr('cx', x)
      .attr('cy', y)
      .style('fill', 'hotpink');
  }
}

export default Coins;
