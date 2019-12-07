const fs = require('fs');

const getCode = num => Number(num.toString().slice(-2));

const getParam = (list, index, pos) => {
  const intCode = list[index];
  const instruction = Number(intCode.toString().slice(-2 - pos, -2 - pos + 1));
  const isImmediate = !!instruction;
  const nextIndex = index + pos;
  return isImmediate ? list[nextIndex] : list[list[nextIndex]];
}

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const list = data.split(',').map(x => Number(x));
      const input = 1;
      let index = 0;
      while (list[index] !== 99) {
        const code = getCode(list[index]);
        if (code === 1) {
          list[list[index + 3]] = getParam(list, index, 1) + getParam(list, index, 2);
          index += 4;
        } else if (code === 2) {
          list[list[index + 3]] = getParam(list, index, 1) * getParam(list, index, 2);
          index += 4;
        } else if (code === 3) {
          list[list[index + 1]] = input;
          index += 2;
        } else if (code === 4) {
          console.log('mode 4: ', getParam(list, index, 1));
          index += 2;
        } else {
          console.log(code);
          throw new Error('Something went wrong');
        }
      }
    });
  });
})();
