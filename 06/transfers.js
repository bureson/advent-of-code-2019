const fs = require('fs');

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {
      const map = {};
      const stepMap = {};
      const lines = data.split('\r\n').filter(x => x);
      const orbitedList = lines.map(x => x.split(')')[0]);
      const orbitingList = lines.map(x => x.split(')')[1]);
      const com = orbitedList.find(x => !orbitingList.includes(x));

      const getStepList = (o) => {
        let target = o;
        let stepList = [];
        while (target !== com) {
          target = map[target];
          stepList.push(target);
        }
        return stepList;
      };

      for (const line of lines) {
        const [orbited, orbiting] = line.split(')');
        map[orbiting] = orbited;
      }

      for (const orbiting of Object.keys(map)) {
        stepMap[orbiting] = getStepList(orbiting);
      }

      const getDiff = (a, b) => a.filter(x => !b.includes(x));
      const transferList = [...getDiff(stepMap['YOU'], stepMap['SAN']), ...getDiff(stepMap['SAN'], stepMap['YOU'])];
      console.log(transferList.length);
    });
  });
})();
