/*調用function時参數a可忽略不傳入*/
function getPropertyNames(o, /* optional*/ a){
  if (a === undefined) a = []; //也可使用 a = a || [];
  for (var property in o) a.push(property);
  return a;
}

/*調用function時可使用arguments.length判斷傳入的參數量*/
function f(x, y, z){
  if (arguments.length != 3) {
    throw new Error("function f called with " + arguments.length +
                    "arguments, but it expects 3 arguments.");
  }
}

/*利用arguments.length判斷最大數值*/
function max(){
  var maxs = Number.NEGATIVE_INFINITY;
  for (var i = 0; i < arguments.length; i++){
    if (arguments[i] > maxs) maxs = arguments[i];
  }
  return maxs;
}

function textMax(){
  var largest = max(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6);
  alert(largest);
}

/*利用arguments將傳入的參數變更為null*/
function ArgChange(x){
  alert(x);
  arguments[0] = null;
  alert(x);
}

/*利用calee*/
function testArg(){
  var x = 3;
  //ArgChange(x);
  var factorial = function(x){
    if (x <= 1) return 1;
    return x * arguments.callee(x-1);
  };  
  alert(factorial(x));
}

/*建立較容易變識參數的順序寫法，可利用陣列及物件方式搭配，可讓程式碼叫為清楚*/
function arraycopy(/* array */ from, /* index */ from_start, 
                   /* aray */ to, /* index */ to_start,
                   /* integer */ length){
  //code gose here
}
function easycopy(args){
  arraycopy(args.from,
            args.from_start || 0,
            args.to,
            args.to_start || 0,
            args.length);
}

function TestPropertoes(){
  var a = [1,2,3,4], b = [];
  easycopy({from : a, to : b, length : 4});
}

/*判斷參數型別，並盡可能在編譯時期報錯誤，不要在執行時期報錯，較好除錯*/
function sum(a){
  if (isArrayLike(a)){
    var total = 0;
    for (var i = 0; i < a.length; i++){
      var element = a[i];
      if (element === null) continue;
      if (isFinite(element)) total += element;
      else throw new Error("sum(): elements must be finite numbers");
    }
    return total;
  }
  else throw new Error("sum(): argment must be array-like");
}

function isArrayLike(o) {
  if (o && // o is not null, undefined, etc.
    typeof o === "object" && // o is an object
    isFinite(o.length) && // o.length is a finite number
    o.length >= 0 && // o.length is non-negative
    o.length===Math.floor(o.length) && // o.length is an integer
    o.length < 4294967296) // o.length < 2^32
    return true; // Then o is array-like
  else
    return false; // Otherwise it is not
}

function TestSum(){
  var a = [1,2,3,4,5,6,7,8,9,0];
  var b = {};
  var tot = 0;
  try
  {
    tot = sum(b);
  }
  catch(ex)
  {
    alert(ex);
  }
  alert(tot);
}

/*將傳入的參數陣列全部判斷是否為數字並加總*/
function flexisum(a){
  var total = 0;
  alert(arguments.length);
  for (var i = 0; i < arguments.length; i++){
    var element = arguments[i], n;
    if (element === null) continue;
    if (isArrayLike(element))
      n = flexisum.apply(this, element);
    else if (typeof element === "function")
      n = Number(element());
    else n = Number(element);
    
    if (isNaN(n))
      throw Error("flexisum(): cant's convert" + element + "to number");
    total +=n;
  }
  return total;
}

function TestFlexisum(){
  var a = [1,2,3,4,5,6,7,8,9,0];
  var b = [10,20,30,40,50,60,70,80,90,100];
  var tot = 0; 
  try
  {
    tot = flexisum(a, sum(b));
  }
  catch(ex)
  {
    alert(ex);
  }
  alert(tot);
}
