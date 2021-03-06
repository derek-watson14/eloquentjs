// 1. Flattening:

let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce((aX, aY) => aX.concat(aY)));
// → [1, 2, 3, 4, 5, 6]

// 2. Your Own Loop:

function loop(val, test, update, body) {
  for (val; test(val); val = update(val)) {
    body(val);
  }
}
loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

// 3. Everything
// Initial solution:
function everyLoop(array, test) {
  for (let element of array) {
    if (!test(element)) return false;
  }
  return true;
}
function every(array, test) {
  // n represents each array element, if any one element returns false from test,
  // the if statement evaluates to true, and the function returns false
  // if NO element tests false (ie all are under 10), the else code is executed,
  // and the function returns true
  if (array.some(n => !test(n))) return false;
  else return true;
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true


// 4. Dominant writing direction:
// Initial solution:
function dominantDirection(text) {
    let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({name}) => name != "none");
  let dom = scripts.reduce((a, b) => a.count < b.count ? b : a);
  return SCRIPTS.filter(s => s.name == dom.name)[0].direction;
}
// Book solution:
function dominantDirection4(text) {
    let counted = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    // Make name category immeditately equal to direction, thus removing second search of scripts
    return script ? script.direction : "none";
  }).filter(({name}) => name != "none");
  // Extra error testing:
  if (counted.length == 0) return "ltr";
  // .name property is now a direction
  return counted.reduce((a, b) => a.count > b.count ? a : b).name;
}


console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
