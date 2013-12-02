var square = function(x) { return x * x; };
var f = function fact(x) { if (x <=1) return 1; else return x * fact(x - 1);};
data.sort(function(a, b) { return a-b;});
var tensquared = (function(x) { return x*x;}(10));

function test1(){
  //alert(f(3));
  //
  printprops({x:1});
  var total = distance(0, 0, 2, 1) + distance(2, 1, 3, 5);
  var probability = factorial(5) / factorial(13);
  //alert(total + ',' + probability);
  //
}

function test2(){
  var caculator = {
    operand1 : 1,
    operand2 : 2,
    add : function() {
      this.result = this.operand1 + this.operand2;
    }
  };
  caculator.add();
  alert(caculator.result);
}

function printprops(o){
  for (var p in o){
    console.log(p + ": " + o[p] + "\n");
  }
}

function distance(x1, y1, x2, y2){
  var dx = x2 - x1;
  var dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function factorial(x){
  if (x <=1) return 1;
  return x * factorial(x-1);
}
