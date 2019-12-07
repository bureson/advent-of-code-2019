const fs = require('fs');

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {
      const map = {};
      const lines = data.split('\r\n').filter(x => x);
      const orbitedList = lines.map(x => x.split(')')[0]);
      const orbitingList = lines.map(x => x.split(')')[1]);
      const com = orbitedList.find(x => !orbitingList.includes(x));

      const getStep = (o) => {
        let stepCount = 0;
        let target = o;
        while (target !== com) {
          target = map[target];
          ++stepCount;
        }
        return stepCount;
      };

      for (const line of lines) {
        const [orbited, orbiting] = line.split(')');
        map[orbiting] = orbited;
      }

      const sum = orbitingList.reduce((total, o) => {
        return total + getStep(o);
      }, 0);
      console.log(sum);
    });
  });
})();
