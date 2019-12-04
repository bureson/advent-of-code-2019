const fs = require('fs');

const isIncreasing = num => {
  const numString = num.toString();
  for (let i = 0; i < numString.length; i++) {
    if (Number(numString[i]) > Number(numString[i + 1])) return false;
  }
  return true;
}

const countChars = (string, char) => {

}

const sameAdjacent = num => {
  const ignore = [];
  const numString = num.toString();
  for (let i = 0; i < numString.length; i++) {
    const thisNum = Number(numString[i]);
    if (!ignore.includes(thisNum) && thisNum === Number(numString[i + 1])) {
      if (numString[i + 2]) {
        if (thisNum === Number(numString[i + 2])) {
          ignore.push(thisNum);
          continue;
        }
      }
      return true;
    }
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
