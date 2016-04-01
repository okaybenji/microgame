/**
 * Creates a deep copy of an array (for non-destructive manipulation).
 */
var copyArray = function(array) {
  if (!Array.isArray(array)) {
    return array;
  }

  var copy = array.slice(0);
  for (var i=0, ii=copy.length; i<ii; i++) {
    copy[i] = copyArray(copy[i]);
  }

  return copy;
};

/**
 * Applies passed function to passed number or all numbers in passed array or object's properties.
 * Non-destructive. Returns new value.
 * @param {Mixed} x object, array, or number e.g. allPays
 * @param {Function} ftn
 * @return {Mixed} processed object, array, or number
 */
var applyMath = function(x, ftn) {
  var a; // this will hold copy of x prevent side effects

  if (typeof x === 'number') {
    a = x;
    a = ftn(a);
  } else if (Array.isArray(x)) { // since arrays are objects, too
    a = copyArray(x);
    a = a.map(function(y) {
      return applyMath(y, ftn);
    });
  } else if (typeof x === 'object') {
    a = Object.assign({}, x);
    for (var key in a) {
      if (a.hasOwnProperty(key)) {
        a[key] = applyMath(a[key], ftn);
      }
    }
  } else {
    return x;
  }

  return a;
};

var stages = [{
  name: 'Alpha C',
  backgroundColor: '#4DD8FF',
  platforms: {
    positions: [[48, 64], [224, 64], [136, 104], [48, 154], [224, 154]],
    color: 'clear'
  },
  backgrounds: [{
    image: 'suns'
  },{
    image: 'clouds',
    scrolling: true,
  },{
    image: 'ground'
  }],
  foreground: 'foreground',
  spawnPoints: [{x: 72, y: 44}, {x: 242, y: 44}, {x: 72, y: 136}, {x: 242, y: 136}],
  uiColor: '#D66122'
}, {
  name: 'Atari A',
  backgroundColor: '#000',
  platforms: {
    positions: [[136, 32], [48, 64], [224, 64], [20, 112], [252, 112], [88,154], [136, 154], [184,154]],
    color: 'blue'
  },
  backgrounds: [],
  foreground: 'clear',
  spawnPoints: [{x: 72, y: 44}, {x: 242, y: 44}, {x: 44, y: 88}, {x: 272, y: 88}],
  uiColor: '#28D6F1'
}, {
  name: 'Atari B',
  backgroundColor: '#000',
  platforms: {
    positions: [[12, 172], [60, 172], [108, 172], [156, 172], [204, 172], [252, 172], [260, 172]], // TODO: had a little hole here... better check the math on the platform widths/locations
    color: 'green'
  },
  backgrounds: [],
  foreground: 'clear',
  spawnPoints: [{x: 48, y: 144}, {x: 96, y: 144}, {x: 204, y: 144}, {x: 252, y: 144}],
  uiColor: '#28F129'
}];

stages = applyMath(stages, function(x) {
  return Math.round(x / 5);
});

//var fs = require('fs');
//fs.writeFile('./stages.json', JSON.stringify(stages, null, 2), function (err) {});

module.exports = stages;
