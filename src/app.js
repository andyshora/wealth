import Coins from 'scripts/coins';

const data = [
  { populationPerc: 70.9, wealthTn: 7.4, wealthPerc: 2.9 },
  { populationPerc: 21, wealthTn: 31.3, wealthPerc: 12.5 },
  { populationPerc: 7.4, wealthTn: 95.8, wealthPerc: 39.4 },
  { populationPerc: 0.7, wealthTn: 112.9, wealthPerc: 45.2 }
];

const containerId = 'svg';

let c = new Coins({ data, containerId, width: 1000, height: 300 });

window.onload = c.init();
