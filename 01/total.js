const fs = require('fs');

const getFuel = (num) => {
  return Math.floor(num / 3) - 2;
}

const getTotalFuel = (num) => {
  let fuel = 0;
  let state = num;
  while (state > 0) {
    state = getFuel(state);
    if (state > 0) fuel += state;
  }
  return fuel;
}

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const list = data.split('\r\n').filter(x => x);
      const sum = list.reduce((sum, num) => sum + getTotalFuel(Number(num)), 0);
      console.log(sum);
    });
  });
})();
