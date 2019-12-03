const fs = require('fs');

const assign = (map, x, y, cable, steps) => {
  if (!map[x]) map[x] = {};
  if (!map[x][y]) map[x][y] = { cable: '', steps: 0 };
  if (!map[x][y].cable.includes(cable)) {
    map[x][y].cable = map[x][y].cable + cable;
    map[x][y].steps = map[x][y].steps + steps;
  }
}

const num = item => Number(item.slice(1));

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const cables = data.split('\r\n');
      const map = { 0: { 0: { cable: 'AB', steps: 0 } } };
      let type = 'A';
      for (const cable of cables) {
        let steps = 0;
        let currentVertical = 0;
        let currentHorizontal = 0;
        for (const item of cable.split(',')) {
          if (item[0] === 'R') {
            for (let i = 0; i <= num(item); i++) {
              const x = currentHorizontal + i;
              assign(map, x, currentVertical, type, steps + i);
            }
            currentHorizontal += num(item);
          }
          if (item[0] === 'L') {
            for (let i = num(item); i >= 0; i--) {
              const x = currentHorizontal - i;
              assign(map, x, currentVertical, type, steps + i);
            }
            currentHorizontal -= num(item);
          }
          if (item[0] === 'U') {
            for (let i = 0; i <= num(item); i++) {
              const y = currentVertical + i;
              assign(map, currentHorizontal, y, type, steps + i);
            }
            currentVertical += num(item);
          }
          if (item[0] === 'D') {
            for (let i = num(item); i >= 0; i--) {
              const y = currentVertical - i;
              assign(map, currentHorizontal, y, type, steps + i);
            }
            currentVertical -= num(item);
          }
          steps += num(item);
        }
        type = 'B';
      }
      let o = null;
      for (const keyX of Object.keys(map)) {
        for (const keyY of Object.keys(map[keyX])) {
          if (map[keyX][keyY].cable === 'AB') {
            const steps = map[keyX][keyY].steps;
            if (steps && (!o || steps < o)) o = steps;
          }
        }
      }
      console.log(o);
    });
  });
})();
