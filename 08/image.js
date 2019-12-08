const fs = require('fs');

const assign = (map, x, y, value) => {
  if (!map[x]) map[x] = {};
  if (value !== 2) map[x][y] = value;
}

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const rowCount = 6;
      const columnCount = 25;
      const instructionLength = rowCount * columnCount;
      const list = data.match(new RegExp('.{1,' + instructionLength + '}', 'g')).reverse();
      const map = {};

      for (const layer of list) {
        const rows = layer.match(new RegExp('.{1,' + columnCount + '}', 'g'));
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          for (let j = 0; j < row.length; j++) {
            const value = Number(row[j]);
            assign(map, j, i, value);
          }
        }
      }

      for (let i = 0; i < rowCount; i++) {
        let string = '';
        for (let j = 0; j < columnCount; j++) {
          string += map[j][i] === 1 ? '□' : ' ';
        }
        console.log(string);
      }
    });
  });
})();
