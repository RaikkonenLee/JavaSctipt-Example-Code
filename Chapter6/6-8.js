function test(){
  var p = {x:1};
  var o = Object.create(p);
  p.isPrototypeOf(o);
  Object.prototype.isPrototypeOf(o);
  //
  //alert(classof(null));
  //alert(classof(1));
  //alert(classof(""));
  //alert(classof(/./));
  //
  var a = Object.seal(Object.create(
    Object.freeze({x:1}),
    {
      y: { 
        value : 2, 
        writable : true}
    }
  ));
  var b = Object.create(Object.seal({x:1}),{
    y:{
      value : 2
    }
  });
  alert(Object.getOwnPropertyNames(b));
}

function classof(o){
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";
  return Object.prototype.toString.call(o).slice(8,-1);
}
