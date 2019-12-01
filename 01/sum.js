const fs = require('fs');

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const list = data.split('\r\n').filter(x => x);
      const sum = list.reduce((sum, num) => sum + (Math.floor(Number(num) / 3) - 2), 0);
      console.log(sum);
    });
  });
})();
