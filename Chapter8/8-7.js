function test(){
  //檢查傳入的參數數量及實際應傳入的數量是否一致
  //alert(f(1, 2));
  
  //利用call及apply間接調用function，在f()方法裡可以用this調用o物件裡的成員
  var o = {a:1, b:f};
  //f.call(o,1,2);
  //f.apply(o, [1,2,3]);
  //var biggest = Math.max.apply(Math, [1,5,10]);
  //alert(biggest);
  
  //g是f2方法繫結s的物件
  //var s = {x : 1};
  //var g = f2.bind(s);
  //alert(g(2));
  
  //使用apply實現替換Method的方法
  //trace(o, "b");
  //alert(o.b(1,2,3));
  
  //使用bind綁定時可給所謂的固定參數，succ的bind第一個參數是物件，1就是sum方法裡的x
  var sum = function(x, y, z) { return x + y + z;};
  var succ = sum.bind(null, 1);
  alert(succ(5,10));
  //var d = f3.bind({x:1},2);
  //alert(d(3));
  
}

/*檢查傳入的參數數量及實際應傳入的數量是否一致，利用length property及callee.length判斷*/
function check(args){
  var actual = args.length;
  var expected = args.callee.length;
  if (actual !== expected){
    throw Error("Expected " + expected + "args; got " + actual);
  }
}

function f(x, y, z){
  try
  {
    alert(this.a);
    check(arguments);
    return x + y + z;
  }
  catch(ex)
  {
    alert(ex);
  }
}

/*使用bind()方法將f2的方法繫結s的物件，這只有在ECMA5有的方法*/
function f2(y) {return this.x + y;}

/*使用bind()方法*/
function f3(y, z){ return this.x + y + z;}

/*使用apply實現替換Method的方法*/
function trace(o, m){
  var original = o[m];
  o[m] = function(){
    alert(this.a);
    var result = original.apply(this, arguments);
    alert("Exiting:");
    return result;
  };
  return original;
}

/*Function bind() for ECMA5*/
if (!Function.prototype.bind){
  Function.prototype.bind = function(o /*, args */){
    var self = this, boundArgs = arguments;
    return function(){
      var args = [], i;
      for (i = 1; i < boundArgs.length; i++){
        args.push(boundArgs[i]);
      }
      for (i = 1; i < argumrnts.length; i++){
        args.push(arguments[i]);
      }
      return self.apply(o, args);
    };
  };
}
