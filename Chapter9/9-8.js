//定義不可列舉的屬性
(function() {
  Object.defineProperty(Object.prototype, "objectId", {
                        get : idGetter,
                        enumerable : false,
                        configurable : false
                        }
  );
  function idGetter() {
    if (!(idprop in this)) {
      if (!Object.isExtensible(this)) {
        throw Error("Can't define id for nonextensible objects");
      }
      Object.defineProperty(this, idprop, {
                            value : nextid++,
                            writable : false,
                            enumerable : false,
                            configurable : false
                            }
      );
    }
    return this[idprop];
  };
  var idprop = "|**objectId**|";
  var nextid = 1;
}());

//建立一個不可更改的類別，它的屬性只有和方法都只能讀取
function Range(from, to) {
  var props = {
    from : { value : from, enumerable : true, writable : false, configurable : false},
    to : { value : to, enumerable : true, writable : false, configurable : false}
  };
  if (this instanceof Range) {
    Object.defineProperties(this, props);
  } else {
    return Object.create(Range.prototype, props);
  }
}

Object.defineProperties(Range.prototype, {
  includes : {
    value : function(x) { return this.from <= x && x <= this.to;}
  },
  foreach : {
    value : function(f) {
      for(var x = Math.ceil(this.from); x <= this.to; x++) {
        f(x);
      }
    }
  },
  toString : {
    value : function() {
      return "(" + this.from + "..." + this.to + ")";
    }
  }
})

//將o的指定名字的屬性設置為不可寫和不可配置的
function freezeProps(o) {
  var props = (arguments.length == 1) ?
              Object.getOwnPropertyNames(o) :
              Array.prototype.splice.call(arguments, 1);
  props.forEach(function(n) {
    if (!Object.getOwnPropertyDescriptor(o, n).configurable) { return;}
    Object.defineProperty(o, n, { writable : false, configurable : false});
  });
  return o;
}

//將o的指定名字的屬性設置為不可列舉
function hideProps(o) {
  var props = (arguments.length == 1) ?
              Object.getOwnPropertyNames(o) :
              Array.prototype.splice.call(arguments, 1);
  props.forEach(function(n) {
    if (!Object.getOwnPropertyDescriptor(o, n).configurable) { return;}
    Object.defineProperty(o, n, { enumerable : false});
  });
}

//利用freezeProps及hideProps製作不可變更的類別
function Range(from, to) {
  this.from = from;
  this.to = to;
  freezeProps(this);
}

Range.prototype = hideProps({
  constructor : Range,
  includes : function(x) { return this.from <= x && x <= this.to;},
  foreach : function(f) { for(var x = Math.ceil(this.from); x <= this.to; x++) {f(x);}},
  toString : function() { return "(" + this.from + "..." + this.to + ")"; }
});

//製作私有變數
function Range2(from, to) {
  if (from > to) throw new Error("Range2 : from must be <= to");
  function getFrom() { return from; }
  function getTo() { return to; }
  function setFrom(f) {
    if (f <= to) from = f;
    else throw new Error("Range2 : from must be <= to");
  }
  function setTo(t) {
    if (t >= from) to = t;
    else throw new Error("Range2 : to must be >= from");
  }
  Object.defineProperties(this, {
    from : { get : getFrom, set : setFrom, enumerable : true, configurable : false},
    to : { get : getTo, set : setTo, enumerable : true, configurable : false}
  });
}

Range2.prototype = hideProps({
  constructor : Range2,
  includes : function(x) { return this.from <= x && x <= this.to;},
  foreach : function(f) { for(var x = Math.ceil(this.from); x <= this.to; x++) {f(x);}},
  toString : function() { return "(" + this.from + "..." + this.to + ")"; }
});

function test() {
  //測試不可列舉及不可更改的Class
  var aa = new Range(1, 5);
  console.log(aa.to);
  console.log(aa.properties().toString());
  aa.to = 10;
  console.log(aa.to);
  var bb = new Range2(1, 5);
  console.log(bb.to);
  bb.to = 10;
  console.log(bb.to);
}

//ECMA5的子類別
function StringSet() {
  this.set = Object.create(null);
  this.n = 0;
  this.add.apply(this, arguments);
}
function AbstractWritableSet(){}
StringSet.prototype = Object.create(AbstractWritableSet.prototype, {
  constructor : { value : StringSet },
  contains : { value : function(x) { return x in this.set; }},
  size : { value : function(x) { return this.n;}},
  foreach : { value : function(f, c) { Object.keys(this.set).forEach(f,c);}},
  add : {
    value : function() {
      for (var i = 0; i < arguments.length; i++) {
        if (!(arguments[i] in this.set)) {
          this.set[arguments[i]] = true;
          this.n++;
        }
      }
      return this;
    }
  },
  remove : {
    value : function() {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] in this.set) {
          delete this.set[arguments[i]];
          this.n--;
        }
      }
    }
  }
});

//將Object.prototype加上properties，此為設定及讀取屬性的各設定值
(function namespace() {
  function properties() {
    var names;
    if (arguments.length == 0) {
      names = Object.getOwnPropertyNames(this);
    } else if (arguments.length == 1 && Array.isArray(arguments[0])) {
      names = arguments[0];
    } else {
      names = Array.prototype.splice.call(arguments, 0);
    }
    return new Properties(this, names);
  }
  
  Object.defineProperty(Object.prototype, "properties", {
    value : properties,
    enumerable : false, writable : true, configurable : true
  });

  function Properties(o, names) {
    this.o = o;
    this.names = names;
  }

  Properties.prototype.hide = function() {
    var o = this.o, hidden = { enumerable : false};
    this.names.forEach(function(n) {
      if (o.hasOwnProperty(n)) {
        Object.defineProperty(o, n, hidden);
      }
    });
    return this;
  };

  Properties.prototype.freeze = function() {
    var o = this.o, frozen = { writable : false, configurable : false};
    this.names.forEach(function(n) {
      if (o.hasOwnProperty(n)) {
        Object.defineProperty(o, n, frozen);
      }
    });
    return this;
  };

  Properties.prototype.descriptors = function() {
    var o = this.o, desc = {};
    this.names.forEach(function(n) {
      if (!o.hasOwnProperty(n)) {
        return;
      }
      desc[n] = Object.getOwnPropertyDescriptor(o, n);
    });
    return desc;
  };

  Properties.prototype.toString = function() {
    var o = this.o;
    var lines = this.names.map(nameToString);
    return "{\n  " + lines.join(",\n  ") + "\n}";

    function nameToString(n) {
      var s = "", desc = Object.getOwnPropertyDescriptor(o, n);
      if (!desc) { return "nonexistent " + n + ": undefined"; }
      if (!desc.configurable) { s += "permanent "; }
      if ((desc.get && !desc.set) || !desc.writable) { s += "readonly"; }
      if (!desc.enumerable) { s += "hidden "; }
      if (desc.get || desc.set) { 
        s+= "accessor " + n; 
      } else {
        s += n + ": " + ((typeof desc.value === "function") ? "function" : desc.value);
      }
      return s;
    }
  };

  Properties.prototype.properties().hide();
}());














