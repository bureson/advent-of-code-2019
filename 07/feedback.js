const fs = require('fs');

const permutation = array => {
  const permute = (array, temp) => {
    let x;
    if (!array.length) {
      result.push(temp);
    }
    for (let i = 0; i < array.length; i++) {
      x = array.splice(i, 1)[0];
      permute(array, temp.concat(x));
      array.splice(i, 0, x);
    }
  }

  var result = [];
  permute(array, []);
  return result;
}

const getCode = num => Number(num.toString().slice(-2));

const getParam = (list, index, pos) => {
  const intCode = list[index];
  const instruction = Number(intCode.toString().slice(-2 - pos, -2 - pos + 1));
  const isImmediate = !!instruction;
  const nextIndex = index + pos;
  return isImmediate ? list[nextIndex] : list[list[nextIndex]];
}

const execute = (list, input, output) => {
  let index = 0;
  let thisInput = input;
  while (list[index] !== 99) {
    const code = getCode(list[index]);
    if (code === 1) {
      list[list[index + 3]] = getParam(list, index, 1) + getParam(list, index, 2);
      index += 4;
    } else if (code === 2) {
      list[list[index + 3]] = getParam(list, index, 1) * getParam(list, index, 2);
      index += 4;
    } else if (code === 3) {
      list[list[index + 1]] = thisInput;
      thisInput = output;
      index += 2;
    } else if (code === 4) {
      return getParam(list, index, 1);
      index += 2;
    } else if (code === 5) {
      if (getParam(list, index, 1) !== 0) {
        index = getParam(list, index, 2);
      } else index += 3;
    } else if (code === 6) {
      if (getParam(list, index, 1) === 0) {
        index = getParam(list, index, 2);
      } else index += 3;
    } else if (code === 7) {
      const isLess = getParam(list, index, 1) < getParam(list, index, 2);
      const pos = list[index + 3]; // getParam(list, index, 3, true);
      list[pos] = isLess ? 1 : 0;
      index += 4;
    } else if (code === 8) {
      const equals = getParam(list, index, 1) === getParam(list, index, 2);
      const pos = list[index + 3]; // getParam(list, index, 3);
      list[pos] = equals ? 1 : 0;
      index += 4;
    } else {
      console.log(code);
      throw new Error('Something went wrong');
    }
  }
}

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {

      let maxSignal = 0;
      const phases = permutation([5, 6, 7, 8, 9]);
      const list = data.split(',').map(x => Number(x));

      for (const phase of phases) {
        const signal = phase.reduce((output, input) => {
          return execute(list, input, output);
        }, 0);
        if (signal > maxSignal) maxSignal = signal;
      }
      console.log('maxSignal: ', maxSignal); // Note: not working properly yet
    });
  });
})();
