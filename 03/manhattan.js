const fs = require('fs');

const assign = (map, x, y, cable) => {
  if (!map[x]) map[x] = {};
  if (!map[x][y]) map[x][y] = '';
  if (!map[x][y].includes(cable)) map[x][y] = map[x][y] + cable;
}

const num = item => Number(item.slice(1));

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const cables = data.split('\r\n');
      const map = { 0: { 0: 'AB' } };
      let type = 'A';
      for (const cable of cables) {
        let currentVertical = 0;
        let currentHorizontal = 0;
        for (const item of cable.split(',')) {
          if (item[0] === 'R') {
            for (let i = currentHorizontal; i <= currentHorizontal + num(item); i++) {
              assign(map, i, currentVertical, type);
            }
            currentHorizontal += num(item);
          }
          if (item[0] === 'L') {
            for (let i = currentHorizontal; i >= currentHorizontal - num(item); i--) {
              assign(map, i, currentVertical, type);
            }
            currentHorizontal -= num(item);
          }
          if (item[0] === 'U') {
            for (let i = currentVertical; i <= currentVertical + num(item); i++) {
              assign(map, currentHorizontal, i, type);
            }
            currentVertical += num(item);
          }
          if (item[0] === 'D') {
            for (let i = currentVertical; i >= currentVertical - num(item); i--) {
              assign(map, currentHorizontal, i, type);
            }
            currentVertical -= num(item);
          }
        }
        type = 'B';
      }
      let o = null;
      for (const keyX of Object.keys(map)) {
        for (const keyY of Object.keys(map[keyX])) {
          if (map[keyX][keyY] === 'AB') {
            const distance = Math.abs(Number(keyX)) + Math.abs(Number(keyY));
            if (!o || distance < o) o = distance;
          }
        }
      }
      console.log(o);
    });
  });
})();
