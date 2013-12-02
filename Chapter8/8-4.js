/*示範Function的幾種撰寫方式*/
function square(x){ return x*x;}
function TestFunctions_Values(){
  //利用變數對應Function
  var s = square;
  s(4);
  //利用物件寫Function
  var o = { square : function(x){ return x * x;}};
  var y = o.square(16);
  //利用陣列寫Function
  var a = [function(x){ return x * x; }, 20];
  a[0](a[1]);
}

/*Function運用*/
function add(x, y) { return x + y; }
function subtract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
function divide(x, y) { return x / y; }
function operate(operator, operand1, operand2){
  return operator(operand1, operand2);
}
function operate2(operation, operand1, operand2){
  var operators = {
    add : function(x, y) { return x + y; },
    subtract : function(x, y) { return x - y; },
    multiply : function(x, y) { return x * y; },
    divide : function(x, y) { return x / y; },
    pow : Math.pow
  };
  if (typeof operators[operation] === "function")
    return operators[operation](operand1, operand2);
  else throw "unknown operator";
}

function TestOperate(){
  //var i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));
  //var j = operate2("add", "hello", operate2("add", " ", "world"));
  var k = operate2("pow", 10, 3);
  alert(k);
}

/*幫Function產生屬性*/
function factorial(n){
  alert(n);
  if (isFinite(n) && n > 0 && n == Math.round(n)){
    if (!(n in factorial))
      factorial[n] = n * factorial(n-1);
    return factorial[n];
  }
  else return NaN;
}
function TestFactorial(){
  factorial[1] = 1;
  //alert(factorial(3));
  uniqueInteger.counter = 0;
  function uniqueInteger() {
    return uniqueInteger.counter++;
  }
  uniqueInteger();
  alert(uniqueInteger.counter);
}
