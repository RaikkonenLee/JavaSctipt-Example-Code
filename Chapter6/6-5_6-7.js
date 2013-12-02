function extend(o, p){
  for(var prop in p)
  {
    o[prop] = p[prop];
  }
  return o;
}

function merge(o, p){
  for (var prop in p)
  {
    if (o.hasOwnProperty[prop]) continue;
    o[prop] = p[prop];
  }
  return o;
}

function restrict(o, p){
  for (var prop in o)
  {
    if (!(prop in p)) delete o[prop];
  }
  return o;
}

function substract(o, p){
  for (var prop in p)
  {
    delete o[prop];
  }
  return o;
}

function union(o, p){
  return extend(extend({},o),p);
}

function intersection(o, p){
  return restrict(extend({},o),p);
}

function keys(o){
  if (typeof o !== "object") throw TypeErroe();
  var result = [];
  for (var prop in o)
  {
    if (o.hasOwnProperty(prop))
    {
      result.push(prop);
    }
  }
  return result;
}

function test(){
  var p = {a:4, b:5,c:6};
  var o = inherit(p);
  o = {x:1, y:2, z:3};
  //alert(keys(o));
  //alert(extend({},o).x);
  //alert(merge({},o).a); 
  var w = test2();
  var q = inherit(w);
  w.x=2,w.y=2;
  w.r=1;
  //alert(w.x);
  //alert(w.r);
  //alert(w.theta);
  var e = test3();
  e.next = 0;
  alert(e.next);
}

function test2(){
  var p = {
    x: 1.0,
    y: 1.0,
    get r() { return  Math.sqrt(this.x*this.x + this.y*this.y); },
    set r(newvalue) {
    var oldvalue = Math.sqrt(this.x*this.x + this.y*this.y);
    var ratio = newvalue/oldvalue;
    this.x *= ratio;
    this.y *= ratio;
  },
  get theta() { return Math.atan2(this.y, this.x); }
  };
    return p;
}
    
function test3(){
  var serialnum = {
    $n:1,
    get next() { return this.$n++;},
    set next(n) {
      if (n >= this.$n) this.$n = n;
      else $n = 0;
    }
  };
  return serialnum;
}

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
    
function test4(){
  var mess = "";
  var random = {
    get octet() { return Math.floor(Math.random()*256); },
    get uint16() { return Math.floor(Math.random()*65536); },
    get int16() { return Math.floor(Math.random()*65536)-32768; }
  };
  var a1 = Object.getOwnPropertyDescriptor({x:1},"x");
  var a2 = Object.getOwnPropertyDescriptor(random, "octet");
  var a3 = Object.getPrototypeOf({},"x");
  var a4 = Object.getPrototypeOf({}, "toString");
  for (var p in a3)
  {
    if (mess !== "") mess += ",";
    mess += p;
  }
  alert(mess);
}
