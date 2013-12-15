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
  var c = new Complex(2, 3);
  var d = new Complex(c.i, c.r);
  alert(c.add(d).toString());
  alert(Complex.parse(c.toString()).add(c.neg()).equals(Complex.ZERO));
}

/*建立Complex的Class及建構子*/
function Complex(real, imaginary){
  if (isNaN(real) || isNaN(imaginary)){
    throw new TypeError();
  }
  this.r = real;
  this.i = imaginary;
}

/*add,mul,mag,neg,toString，equals皆為Method*/
Complex.prototype.add = function(that){
  return new Complex(this.r + that.r, this.i + that.i);
};

Complex.prototype.mul = function(that){
  return new Complex(this.r * that.r - this.i * this.i,
                     this.r * that.i + this.i * that.r);
};

Complex.prototype.mag = function(){
  return Math.sqrt(this.r * this.r + this.i * this.i);
};

Complex.prototype.neg = function(){
  return new Complex(-this.r, -this.i);
};

Complex.prototype.toString = function(){
  return "{" + this.r + "," + this.i + "}";
};

Complex.prototype.equals = function(that){
  return that != null &&
    that.constructor === Complex &&
    this.r === that.r && this.i === that.i;
};

/*利用大寫字串表示為常數，不可變更*/
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);

/*建立靜態的(static)parse建構式*/
Complex.parse = function(s){
  try {
    var m = Complex._format.exec(s);
    return new Complex(parseFloat(m[1]), parseFloat(m[2]));
  } catch(x){
    throw new TypeError("Can't parse '" + s + "' as a complex number.");
  }
};

/*利用_作開頭當程式Class裡的私有變數*/
Complex._format = /^\{([^,]+),([^}]+)\}$/;
