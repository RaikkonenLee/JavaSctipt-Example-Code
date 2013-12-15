/*利用constructor的屬性作為型態的判斷*/
function typeAndValue(x){
  if (x === null) return "";  //null and undefined沒有constructor
  switch(x.constructor)
  {
    case Number: return "Number: " + x;
    case String: return "String: '" + x + "'";
    case Date: return "Date: " + x;
    case RegExp: return "Regxp: " + x;
    case Complex: return "Complex: " + x;
  }
}

/*利用constructor的名稱作為型態的判斷*/
function type(o){
  var t, c, n;
  if (o === null) return "null";
  if (o !== o) return "nan";
  if ((t = typeof o) !== "object") return t;
  if ((c = classof(o)) !== "Object") return c;
  if (o.constructor && 
      typeof o.constructor === "function" &&
      (n = o.constructor.getName())) return n;
  return "Object";
}

/*判斷Function的型態*/
function classof(o){
  return Object.prototype.toString.call(o).slice(8, -1);
}

/*增加Function的名稱讀取*/
Function.prototype.getName = function(){
  if ("name" in this) return this.name;
  return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
};

/*利用duck-typing辨識型別*/
function quacks(o){
  for(var i = 1; i < arguments.length; i++){
    var arg = arguments[i];
    switch(typeof arg)
    {
      case 'string':
        if (typeof o[arg] !== "function") return false;
        continue;
      case 'function':
        arg = arg.prototype;
      case 'object':
        for(var m in arg){
          if(typeof arg[m] !== "function") continue;
          if(typeof o[m] !== "function") return false;
        }
    }
  }
  return true;
}

function test(){
  var n = 3;
  //console.log(typeAndValue(n));
  //
  var Complex = function(x, y){ this.r = x, this.i = y}
  var Range = function Range(f, t){ this.from = f; this.to = t;}
  var c = new Complex(1, 3);
  var r = new Range(1, 3);
  // console.log(type(Complex));
  // console.log(type(Range));
  // console.log(type(c));
  // console.log(type(r));
  //
  console.log(quacks(Complex, Object));
}
