//Create SubClass
//B.prototype = inherit(A.prototype);
//B.prototype.constructor = B
//
//用一個簡單的函數建立簡單的子類
function defineSubclass(superclass,
                        constructor,
                        methods,
                        statics) {
  //子類別繼承父類別的物件
  constructor.prototype = inherit(superclass.prototype);
  //子類別的prototype的建構子
  constructor.prototype.constructor = constructor;
  //
  if (methods) { extend(constructor.prototype, methods); }
  if (statics) { extend(constructor, statics); }
  return constructor;
}
//
//利用父類別的函數做
Function.prototype.extend = function(constructor, methods, statics) {
  return defineSubclass(this, constructor, methods, statics);
}

function SingletonSet(member) {
  this.member = member;
}

SingletonSet.prototype = inherit(Set.prototype);

extend(SingletonSet.prototype, {
  constructor : SingletonSet,
  add : function() { throw "read-only set"; },
  remove : function() { throw "read-only set"; },
  size : function() { return 1; },
  foreach : function(f, context) { f.call(context, this.member); },
  contains : function(x) { return x === this.member; }
});

//SingletonSet繼承了Set的Class，也繼承了equals，如果要提身效能可在自定equals
SingletonSet.prototype.equals = function(that) {
  return that instanceof Set && that.size() == 1 && that.contains(this.member);
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
  equals : function(that){
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
});

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
