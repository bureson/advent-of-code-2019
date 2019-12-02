const fs = require('fs');

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const list = data.split(',').map(x => Number(x));
      const inputs = [...Array(100).keys()];
      let tempList = [];
      for (const y of inputs) {
        for (const x of inputs) {
          let index = 0;
          tempList = list.map(x => x);
          tempList[1] = y;
          tempList[2] = x;
          while (tempList[index] !== 99) {
            if (tempList[index] === 1) {
              tempList[tempList[index + 3]] = tempList[tempList[index + 1]] + tempList[tempList[index + 2]];
            } else if (tempList[index] === 2) {
              tempList[tempList[index + 3]] = tempList[tempList[index + 1]] * tempList[tempList[index + 2]];
            } else throw new Error('Something went wrong');
            index += 4;
          }
          if (tempList[0] === 19690720) console.log(`${y}${x}`);
        }
      }
    });
  });
})();
