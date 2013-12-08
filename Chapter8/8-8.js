function test(){
  var sum = function(x, y) { return x + y;};
  var square = function(x) { return x * x;};
  var data = [1,1,3,5,5];
  //計算平均值，reduce是ECMA5的方法
  //var mean = data.reduce(sum)/data.length;
  //利用自定義的reduce，判斷是否是ECMA5或ECMA3
  //var mean = reduce(data, sum)/data.length;
  
  //取出元素計算過的值
  //var deviations = data.map(function(x) { return x - mean;});
  //利用自定義的map，判斷是否是ECMA5或ECMA3
  //var deviations = map(data, function(x) { return x - mean;});
  
  //計算標準差，map是ECMA5的方法
  //var stddev = Math.sqrt(deviations.map(square).reduce(sum)/(data.length-1));
  //利用自定義的，判斷是否是ECMA5或ECMA3
  //var stddev = Math.sqrt(reduce(map(deviations, square), sum)/(data.length-1));
  
  //alert(stddev);
  
  //高階Function  
  //var even = function(x){
  //  return x % 2 === 0;
  //};
  //var odd = not(even);
  //alert([1,1,3,5,5].every(odd));
  
  //partial function 實做1
  var f = function(x, y, z) { return x * (y - z); };
  partialLeft(f, 2)(3, 4);
  partialRight(f, 2)(3, 4);
  partial(f, undefined, 2)(3, 4);
  //partial function 實做2
  var increment = partialLeft(sum, 1);
  var cubberoot = partialRight(Math.pow, 1/3);
  alert(increment(3) + "_" + cubberoot(4));
  String.prototype.first = partial(String.prototype.charAt, 0);
  String.prototype.last = partial(String.prototype.substr, -1, 1);
  var str1 = "abcd";
  alert(str1.first() + "_" + str1.last());
  //partial function 實做3
  var not2 = partialLeft(compose, function(x) { return !x; });
  var even = function(x) { return x % 2 ===0;};
  var odd = not(even);
  var isNumber = not(isNaN);
  //利用partial function 在實做一次前面的平均值及標準差計算
  var product = function(x, y) { return x * y; };
  var neg = partial(product, -1);
  var square2 = partial(Math.pow, undefined, 2);
  var sqrt = partial(Math.pow, undefined, 0.5);
  var reciprocal = partial(Math.pow, undefined, -1);
  var mean2 = product(reduce(data, sum), reciprocal(data.length));
  var stddev2 = sqrt(product(reduce(map(data, 
                                        compose(square, 
                                                partial(sum, neg(mean)))),
                                    sum),
                             reciprocal(sum(data.length, -1))));
  //memoize function 實做
  var gcdmemo = memoize(gcd);
  gcdmemo(85, 187);
  var factorial = memoize(function(n){
    return (n <= 1) ? 1 : n * factorial(n - 1);
  });
  factorial(5);
}

/*在ECMA3自訂map的方法*/
var map = Array.prototype.map
  ? function(a, f) { return a.map(f); }
  : function(a, f) {
    var results = [];
    for (var i = 0, len = a.length; i < len; i++){
      if (i in a) results[i] = f.call(null, a[i], i, a);
    }
    return results;
};

/*在ECMA3自訂reduce的方法*/
var reduce = Array.prototype.reduce
? function(a, f, initial) {
  if (arguments.length > 2)
    return a.reduce(f, initial);
  else return a.reduce(f);
}
: function(a, f, initial){
  var i = 0, len = a.length, accumulator;
  //
  if (arguments.length > 2) accumulator = initial;
  else {
    if (len === 0) throw TypeError();
    while(i < len){
      if (i in a){
        accumulator = a[i++];
        break;
      }
      else i++;
    }
    if (i == len) throw TypeError();
  }
  while(i < len) {
    if (i in a)
      accumulator = f.call(undefined, accumulator, a[i], i, a);
    i++;
  }
  return accumulator
};

/*高階Function*/
function not(f){
  return function() {
    var result = f.apply(this, arguments);
    return !result;
  };
}

/*製作partial的function，插在左邊、右邊、中間，這部份再測試實際運作方式*/
function array(a, n){
  return Array.prototype.slice.call(a, n || 0);
}

function partialLeft(f /*,...*/){
  var args = arguments;
  return function(){
    var a = array(args, 1);
    a = a.concat(array(arguments));
    return f.apply(this, a);
  };
}

function partialRight(f /*,...*/){
  var args = arguments;
  return function(){
    var a = array(arguments);
    a = a.concat(array(args, 1));
    return f.apply(this, a);
  };
}

function partial(f /*,...*/){
  var args = arguments;
  return function(){
    var a = array(args, 1);
    var i = 0, j = 0;
    for (; i < a.length; i++){
      if (a[i] === undefined) a[i] = arguments[j++];
    }
    a = a.concat(array(arguments, j));
    return f.apply(this, a);
  };
}

/*製作memoization的function，做回傳值的記憶*/
function memoize(f){
  var cache = {};
    return function(){
      var key = arguments.length + Array.prototype.join.call(arguments, ",");
      if (key in cache) return cache[key];
      else return cache[key] = f.apply(this, arguments);
    };
}

function gcd(a, b){
  var t;
  if (a < b) t = b, b = a, a = t;
  while(b !== 0) t = b, b = a % b, a = t;
  return a;
}
