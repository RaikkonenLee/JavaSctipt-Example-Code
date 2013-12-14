function test(){
  var r = range(1, 3);
  r.includes(2);
  var a = r.foreach();
  alert(a);
  alert(r);
}

/*定義range物件並繼承range.methods當作Class*/
function range(from, to){
  var r = inherit(range.methods);
  r.from = from;
  r.to = to;
  return r;
}

/*定義range物件的prototype當作Class使用*/
range.methods = {
  includes: function(x){ return this.from <= x && x <= this.to;},
  foreach: function(f) {
    var returnResult = "";
    for (var x = Math.ceil(this.from); x <= this.to; x++) returnResult += x.toString();
    return returnResult;
  },
  toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};

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
