const fs = require('fs');

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
      const list = data.match(/.{1,150}/g);
      let index = 0;
      let count = 150;
      for (let i = 0; i < list.length; i++) {
        const layer = list[i];
        const thisCount = layer.match(/0/g).length;
        if (thisCount < count) {
          index = i;
          count = thisCount;
        }
      }
      const bestLayer = list[index];
      console.log(bestLayer.match(/1/g).length * bestLayer.match(/2/g).length);
    });
  });
})();
