Function.prototype.extend = function(constructor, methods, statics) {
  return defineSubclass(this, constructor, methods, statics);
};

function defineSubclass(superclass, // Constructor of the superclass
            constructor, // The constructor for the new subclass
            methods, // Instance methods: copied to prototype
            statics) // Class properties: copied to constructor
{
  // Set up the prototype object of the subclass
  constructor.prototype = inherit(superclass.prototype);
  constructor.prototype.constructor = constructor;
  // Copy the methods and statics as we would for a regular class
  if (methods) extend(constructor.prototype, methods);
  if (statics) extend(constructor, statics);
  // Return the class
  return constructor;
}

function inherit(p){
  if (p === null) throw TypeError();
  if (Object.create)
  {
    return Object.create(p);
  }
  var t = typeof p;
  if (t !== "object" && t != "function") throw TypeError();
  function f() {}
  f.prototype = p;
  return new f();
}

function extend(o, p) {
  for(var prop in p) { // For all props in p.
    o[prop] = p[prop]; // Add the property to o.
  }
  return o;
}

//抽象類別的方法
function abstractmethod() { throw new Error("abstract method"); }
//AbstractSet定義抽象類別方法
function AbstractSet() { throw new Error("Can't instantiate abstract classes"); }
AbstractSet.prototype.contains = abstractmethod;
//NotSet是AbstractSet的一個非抽象的子類別
var NotSet = AbstractSet.extend(
  function NotSet(set) { this.set = set; },
  {
    contains : function(x) { return !this.set.contains(x);},
    toString : function(x) { return "~" + this.set.toString();},
    equals : function(that) {
      return that instanceof NotSet && this.set.equals(that.set);
    }
  }
);
//AbstractEnumerableSet是AbstractSet的抽象子類別，
//裡面的size及foreach是抽象方法，其他皆為非抽象方法
//實作了contains()、size()、foreach()
var AbstractEnumerableSet = AbstractSet.extend(
  function() { throw new Error("Can't instantiate abstract classes"); },
  {
    size : abstractmethod,
    foreach : abstractmethod,
    isEmpty : function() { return this.size() == 0;},
    toString : function() {
      var s = "{", i = 0;
      this.foreach(function(v){
        if (i++ > 0) { s += ", "; }
        s += v;
      });
      return s + "}";
    },
    toLocalString : function() {
      var s = "{", i = 0;
      this.foreach(function(v){
        if (i++ > 0) { s += ", "; }
        if (v == null) { s += v; }
        else {s += v.toLocalString(); }
      });
    },
    toArray : function() {
      var a = [];
      this.foreach(function(v) { a.push(v); });
      return a;
    },
    equals : function(that) {
      if (!(that instanceof AbstractEnumerableSet)) { return false;}
      if (this.size() != that.size()) { return false; }
      try {
        this.foreach(function(v) { 
          if (!that.contains(v)) { throw false; }
        });
        return true;
      } catch(x) {
        if (x === false) return false;
        throw x;
      }
    }
  }
);

//SingletonSet是AbstractEnumerableSet的非抽象子類別
//他是唯讀的只包含一個member成員
var SingletonSet = AbstractEnumerableSet.extend(
  function Singleton(member) { this.member = member; },
  {
    contains : function(x) { return x === this.member; },
    size : function() { return 1;},
    foreach : function(f, ctx) { f.call(ctx, this.member); }
  }
);

//AbstractWritableSet是AbstractEnumerableSet的抽像子類別
//他有兩個抽象方法add()和remove()
//有三個非抽象方法union()、intersection()、difference
var AbstractWritableSet = AbstractEnumerableSet.extend(
  function() { throw new Error("Can't instantiate abstract classes"); },
  {
    add : abstractmethod,
    remove : abstractmethod,
    union : function(that) {
      var self = this;
      that.foreach(function(v) { self.add(v); });
      return this;
    },
    intersection : function(that) {
      var self = this;
      this.foreach(function(v) { if (!that.contains(v)) { self.remove(v); }});
      return this;
    },
    difference : function(that) {
      var self = this;
      that.foreach(function(v) { self.remove(v); });
      return this;
    }
  } 
);

//ArraySet是AbstractWritableSet的非抽象子類別
//
var ArraySet = AbstractWritableSet.extend(
  function ArraySet() {
    this.values = [];
    this.add.apply(this, arguments);
  },
  {
    contains : function(v) { return this.values.indexOf(v) != -1; },
    size : function() { return this.values.length; },
    foreach : function(f, c) { this.values.forEach(f, c); },
    add : function() {
      for (var i = 0; i < arguments.length; i++)
      {
        var arg = arguments[i];
        if (!this.contains(arg)) { this.values.push(arg); }
      }
      return this;
    },
    remove : function() {
      for (var i = 0; i < arguments.length; i++) {
        var p = this.values.indexOf(arguments[i]);
        if (p == -1) { continue; }
        this.values.splice(p, 1); 
      }
      return this;
    }
  }
);


function test() {
  var arr = new ArraySet([1,2,3,4,5]);
  arr.add(6,7,8);
  console.log(arr.toString());
}





















