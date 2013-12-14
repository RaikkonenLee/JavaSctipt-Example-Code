/*建立Class，第一個參數為建構子，第二個參數為Method，第三個參數為建構式*/
function defineClass(constructor, methods, statics){
  if (methods) extend(constructor.prototype, methods);
  if (statics) extend(constructor, statics);
  return constructor;
}

/*建立SimpleRange為Object Class*/
var SimpleRange = defineClass(function(f,t){ this.f = f; this.t = t;},
                              {
                                includes : function(x) {return this.f <= x && x <= this.t;},
                                toString : function() { return this.f + "....." + this.t;}
                              },
                              { upto : function(t) { return new SimpleRange(0, t);}});

function extend(o, p) {
  for(var prop in p) { // For all props in p.
    o[prop] = p[prop]; // Add the property to o.
  }
  return o;
}

function test(){
  var r = new SimpleRange(1, 3)
  alert(r.includes(2));
  alert(r.toString());
  alert(r.constructor.upto(5).includes(3));
}
