// The Secret Life of Objects
// 1. A Vector Type:
class Vec {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    plus(vector) {
      return new Vec(this.x + vector.x, this.y + vector.y);
    }
    minus(vector) {
      return new Vec(this.x - vector.x, this.y - vector.y);
    }
    get length() {
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}
console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

// 2. Groups:

// My initial solution:
// Main error was in constructor, which didnt include empty array,
// and only allowed creation by passing an array or using from.
// Also forgot I could use class methods within other methods
class InitialGroup {
    constructor(group) {
        this.group = group;
    }
    add(value) {
        if (this.group.indexOf(value) == -1) this.group.push(value);
    }
    delete(value) {
        let index = this.group.indexOf(value);
        if (index != -1) this.group.splice(index, 1);
    }
    has(value) {
        if (this.group.indexOf(value) != -1) return true;
        else return false;
    }
    static from(array) {
        let group = [];
        for (let item of array) {
            if (group.indexOf(item) == -1) group.push(item);
        }
        return new InitialGroup(group);
    }
}
// After looking at book solution:
class GroupNI {
    constructor() {
        this.group = [];
    }
    add(value) {
        if (!this.has(value)) this.group.push(value);
    }
    delete(value) {
        // .filter returns all numbers that do not equal value
        // This is bound to this.group, thus erasing the value
        this.group = this.group.filter(v => v !== value);
    }
    has(value) {
        // .includes returns t/f depending on if value exists
        return this.group.includes(value);
    }
    static from(array) {
        let group = new GroupNI;
        for (let item of array) {
            group.add(item);
        }
        return group;
    }
}
let group = GroupNI.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

// 3. Iterable Groups:
class Group {
    constructor() {
        this.group = [];
    }
    add(value) {
        if (!this.has(value)) this.group.push(value);
    }
    delete(value) {
        let index = this.group.indexOf(value);
        if (index != -1) this.group.splice(index, 1);
    }
    has(value) {
        if (this.group.indexOf(value) != -1) return true;
        else return false;
    }
    static from(array) {
        let group = new Group;
        for (let item of array) {
            group.add(item);
        }
        return group;
    }
    [Symbol.iterator]() {
        return new GroupIterator(this.group);
    }
}
class GroupIterator {
  constructor(group) {
	this.track = 0;
    this.group = group;
  }
  next() {
    if (this.track >= this.group.length) return {done: true}
    let value = this.group[this.track];
    this.track++;
    return {value, done: false};
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c

// 4. Borrowing a method:
let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
// console.log(map.hasOwnProperty("one"));
// Fixed
console.log(hasOwnProperty.call(map, "one"));
// → true

// If you want to use an "ancestor's" property that is covered by a child object, on the child
// A solution is to call it explicitly, and pass the object in as a parameter