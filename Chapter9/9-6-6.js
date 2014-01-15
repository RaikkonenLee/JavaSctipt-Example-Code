function test() {
  var r = new Range(1,5);
  //雖然是使用私有方式建立Property但還是可以更改，且較耗資源
  r.from = function() { return 0;};
  console.log(r.from() + "_" + r.to());
}

function Range(from, to) {
  this.from = function() { return from;};
  this.to = function() { return to; };
}

Range.prototype = {
  constructor : Range,
  includes : function(x) { return this.from() <= x && x <= this.to();},
  foreach : function(f) {
    for(var x = Math.ceil(this.from()), max = this.to(); x <= max; x++){
      f(x);
    }
  },
  toString : function() { return "(" + this.from() + "..." + this.to() + ")";}
};
