function test(){
  var o = { x : 1,
              y : {
                z : [false, null, ""]
              }
          };
  var s = JSON.stringify(o);
  var p = JSON.parse(s);
  alert(p);
}
