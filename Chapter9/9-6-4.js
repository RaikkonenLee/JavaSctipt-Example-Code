/*定義建構式的Function*/
function Range(from, to){
  this.from = from;
  this.to = to;
}

Range.prototype.constructor = Range;

//比較兩個Class裡的值
Range.prototype.equals = function(that) {
  if (that == null) return false;
  if (that.constructor !== Range) return false;
  return this.from == that.from && this.to == that.to;
};

Range.prototype.compareTo = function(that) {
  if (!(that instanceof Range)){
    throw new error("Can't compare a Range with " + that);
  }
  var diff = this.from - that.from;
  if (diff == 0) { diff = this.to - that.to;}
  return diff;
};

function Set(){
  this.values = {};
  this.n = 0;
  this.add.apply(this, arguments);
}

Set.prototype.equals = function(that){
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
};

Set.prototype.add = function() {
  for(var i = 0; i < arguments.length; i++){
    var val = arguments[i];
    var str = Set._v2s(val);
    if (!this.values.hasOwnProperty(str)){
      this.values[str] = val;
      this.n++;
    }
  }
  return this;
};

Set.prototype.remove = function() {
  for (var i = 0; i < arguments.length; i++){
    var str = Set._v2s(arguments[i]);
    if (this.values.hasOwnProperty(str)){
      delete this.values[str];
      this.n--;
    }
  }
  return this;
};


Set.prototype.contains = function(value){
  return this.values.hasOwnProperty(Set._v2s(value));
};

Set.prototype.size = function(){
  return this.n;
};

Set.prototype.foreach = function(f, context){
  for(var s in this.values){
    if (this.values.hasOwnProperty(s)){
      f.call(context, this.values[s]);
    }
  }
};

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
