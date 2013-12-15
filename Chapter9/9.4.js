/*在Number的prototype增加times的method*/
Number.prototype.times = function(f, context){
  var n = Number(this);
  for(var i = 0; i < n; i++){
    f.call(context, i);
  }
};

String.prototype.trim = String.prototype.trim || function(){
  if (!this) return this;
  return this.replace(/^\s+|\s+$/g, "");
}

Function.prototype.getName = function(){
  return this.name || this.toString().match(/function\s*([^(]*)\(/)[1];
};

function test(){
  var n = 3;
  n.times(function(n){ console.log(n + " hello");});
  var t = "    abcde     ";
  console.log(t.trim());
}
