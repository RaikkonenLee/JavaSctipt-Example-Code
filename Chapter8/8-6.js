var scope = "global scope";
function checkscope(){
  var scope = "local scope";
  function f(){ return scope;}
  return f;
}

function TextScope(){
  //alert(checkscope()());
  //
  var uniqueInteger = (function() {
    var counter = 0;
    return function(){ return counter++;};
  }());
  //
  uniqueInteger();
  uniqueInteger();
  alert(uniqueInteger());
}

function counter(){
  var n = 0;
  return {
    count: function() { return n++;},
    reset: function() { n = 0;}
  };
}

function TestCounter(){
  var c = counter(), d = counter();
  c.count();
  d.count();
  c.reset();
  alert(c.count() + "_" + d.count());
}

function counter2(n){
  return {
    get count() { return n++;},
    set count(m) {
      if (m >= n) n = m;
      else throw Error("count can only be set to a larger value");
    }
  };
}
function TestCounter2(){
    var c = counter2(1000);
    c.count;
    c.count = 2000;
    c.count;
    //c.count = 2000;
    alert(c);
}
   
/**/
function addPrivateProperty(o, name, predicate){
    var value;
    o["get" + name] = function() { return value;};
    o["set" + name] = function(v) {
      if (predicate && !predicate(v))
        throw Error("set" + name + ": invalid value " + v);
      else
        value = v;
    };
}
function TestAddPrivateProperty(){
    var o = {};
    addPrivateProperty(o, "Name", function(x) { return typeof x == "string";});
    //
    o.setName("Frank");
    //alert(o.getName());
    o.setName(0);
    alert(o.getName());
}
function constfuncs() {
  var funcs = [];
  for(var i = 0; i < 10; i++)
    funcs[i] = function() { return i; };
  return funcs;
}
function TestConstfuncs(){
    var funcs = constfuncs();
    alert(funcs[5]());
}
