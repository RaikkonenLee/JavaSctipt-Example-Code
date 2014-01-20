function test() {
	//NowNullSet是繼承Set的子類別，並在add方法裡多增加一個過濾功能
	//
	var aa = new NonNullSet(1,2,3);
	console.log(aa.values);
}

//利用一般自類別的繼承方式
// function NonNullSet() {
// 	Set.apply(this, arguments);
// }

// NonNullSet.prototype = inherit(Set.prototype);
// NonNullSet.prototype.constructor = NonNullSet;

// NonNullSet.prototype.add = function() {
// 	for (var i = 0; i < arguments.length; i++) {
// 		if (arguments[i] == null) {
// 			throw new Error("Can't add null or undefined to a NonNullSet");
// 		}
// 	}
// 	return Set.prototype.add.apply(this, arguments);
// };

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

//利用工廠類別方式改寫NonNullSet，將動作打包起來
var NonNullSet = (function() { // Define and invoke function
	var superclass = Set; // Only specify the superclass once.
	return superclass.extend(
		function() { superclass.apply(this, arguments); }, // the constructor
		{ // the methods
			add: function() {
			// Check for null or undefined arguments
			for(var i = 0; i < arguments.length; i++)
				if (arguments[i] == null)
					throw new Error("Can't add null or undefined");
			// Chain to the superclass to perform the actual insertion
			return superclass.prototype.add.apply(this, arguments);
		}
	});
}());

//利用工廠類別的方式將動作打包起來
var StringSet = filteredSetSubclass(Set, 
									function(x) { return typeof x === "string";});
// var MySet = filteredSetSubclass(NonNullSet, 
// 								function(x) { return typeof x !== "function";});

function filteredSetSubclass(superclass, filter) {
	var constructor = function() {
		superclass.apply(this, arguments);
	};
	var proto = constructor.prototype = inherit(superclass.prototype);
	proto.constructor = constructor;
	proto.add = function() {
		for (var i = 0; i < arguments.length; i++) {
			var v = arguments[i];
			if (!filter(v)) { throw("value " + v + " rejected by filter");}
		}
		superclass.prototype.add.apply(this, arguments);
	};
	return constructor;
}

//
//建立Set類別
function Set(){
  this.values = {};
  this.n = 0;
  this.add.apply(this, arguments);
}

extend(Set.prototype, {
  add : function() {
    for(var i = 0; i < arguments.length; i++){
      var val = arguments[i];
      var str = Set._v2s(val);
      if (!this.values.hasOwnProperty(str)){
        this.values[str] = val;
        this.n++;
      }
    }
    return this;
  },
  remove : function() {
    for (var i = 0; i < arguments.length; i++){
      var str = Set._v2s(arguments[i]);
      if (this.values.hasOwnProperty(str)){
        delete this.values[str];
        this.n--;
      }
    }
    return this;
  },
  contains : function(value){
    return this.values.hasOwnProperty(Set._v2s(value));
  },
  size : function(){
    return this.n;
  },
  foreach : function(f, context){
    for(var s in this.values){
      if (this.values.hasOwnProperty(s)){
        f.call(context, this.values[s]);
      }
    }
  },
  toString : function() {
    var s = "{", i = 0;
    this.foreach(function(v) { s += ((i++ > 0) ? "," : "") + v;});
    return s + "}";
  },
  toArray : function() {
    var a = [];
    this.foreach(function(v) {a.push(v); });
    return a;
  },
  equals : function(that) {
    if (this === that) return true;
    if (!(that instanceof Set)) return false;
    try{
      this.foreach(function(v) {
        if (!that.contains(v)) throw false;
      });
      return true;
    } catch (x) {
      if (x === false) return false;
      throw x;
    }
}});

Set._v2s = function(val){
  switch(val){
    case undefined:
      return 'u';
    case null:
      return 'n';
    case true:
      return 't';
    case false:
      return 'f';
    default:
      switch(typeof val){
        case 'number':
          return '#' + val;
        case 'string':
          return '"' + val;
        default:
          return '@' + objectId(val);
      }
  }
  function objectId(o){
    var prop = "|**objectid**|";
    if (!o.hasOwnProperty(prop)){
      o[prop] = Set._v2s.next++;
    }
    return o[prop];
  }
};

Set._v2s.next = 100;

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

