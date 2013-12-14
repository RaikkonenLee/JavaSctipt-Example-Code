/*Range物件要使用New的方式調用prototype才會正確的執行*/
function test(){
  var r = new Range(1, 3);
  alert(r.includes(2));
  var a = r.foreach();
  alert(a);
  //一般的function皆有constructor
  var F = function(){};
  var c = F.prototype.constructor;
  alert(c === F); //true(皆為Function)

  //一般New出來的物件也會有
  var o = new F();
  alert(o.constructor === F);

  //額外定義prototype時要自行增加constructor
  alert(r.constructor === Range);
}

/*定義建構式的Function*/
function Range(from, to){
  this.from = from;
  this.to = to;
}

/*定義Range的prototype當作建構式*/
Range.prototype = {
  constructor: Range, //讓建構子可反向使用
  includes: function(x){ return this.from <= x && x <= this.to;},
  foreach: function(f) {
    var returnResult = "";
    for (var x = Math.ceil(this.from); x <= this.to; x++) returnResult += x.toString();
    return returnResult;
  },
  toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};
