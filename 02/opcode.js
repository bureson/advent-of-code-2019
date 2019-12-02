const fs = require('fs');

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const list = data.split(',').map(x => Number(x));
      let index = 0;
      list[1] = 12;
      list[2] = 2;
      while (list[index] !== 99) {
        if (list[index] === 1) {
          list[list[index + 3]] = list[list[index + 1]] + list[list[index + 2]];
        } else if (list[index] === 2) {
          list[list[index + 3]] = list[list[index + 1]] * list[list[index + 2]];
        } else throw new Error('Something went wrong');
        index += 4;
      }
      console.log(list[0]);
    });
  });
})();
