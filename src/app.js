import Coins from 'scripts/coins';

const data = [
  { populationPerc: 0.7, wealthTn: 112.9, wealthPerc: 45.2 },
  { populationPerc: 7.4, wealthTn: 95.8, wealthPerc: 39.4 },
  { populationPerc: 21, wealthTn: 31.3, wealthPerc: 12.5 },
  { populationPerc: 70.9, wealthTn: 7.4, wealthPerc: 2.9 }
];

const containerId = 'svg';

let c = new Coins({ data, containerId });

window.onload = c.init();
