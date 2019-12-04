const fs = require('fs');

const isIncreasing = num => {
  const numString = num.toString();
  for (let i = 0; i < numString.length; i++) {
    if (Number(numString[i]) > Number(numString[i + 1])) return false;
  }
  return true;
}

const sameAdjacent = num => {
  const numString = num.toString();
  for (let i = 0; i < numString.length; i++) {
    if (Number(numString[i]) === Number(numString[i + 1])) return true;
  }
  return false;
}

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {
      const [low, top] = data.split('-').map(x => Number(x));
      let total = 0;
      for (let i = low; i <= top; i++) {
        if (isIncreasing(i) && sameAdjacent(i)) total++;
      }
      console.log(total);
    });
  });
})();
