function extend(o, p){
  for(var prop in p)
  {
    o[prop] = p[prop];
  }
  return o;
}

function union(o, p){
  return extend(extend({},o),p);
}

function test(){
  //var objects = [{x:1}, {y:2}, {z:3}];
  var merged = objects.reduce(union);
  var objects = [{x:1,a:1}, {y:2,a:2}, {z:3,a:3}];
  var leftunion = objects.reduce(union); // {x:1, y:2, z:3, a:1}
  var rightunion = objects.reduceRight(union); // {x:1, y:2, z:3, a:3}
  alert(merged.x);
}

function test2(){
  var objects = [{x:1,a:1}, {y:2,a:2}, {z:3,a:3}];
  
  alert(isArray(objects));
}

function test3(){
  var a = {"0":"a", "1":"b", "2":"c", length:3};
  alert(Array.join(a, "+"));
}

var isArray = Function.isArray || function(o){     
  return typeof o ==="object" &&    
    Object.prototype.toString.call(o) === "[Object.Array]";
};

Array.join = Array.join || function(a,sep) {
return Array.prototype.join.call(a,sep);
};
