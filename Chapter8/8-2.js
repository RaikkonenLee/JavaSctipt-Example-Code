/*巢狀fucntion裡this的使用方式*/
function NestFunction(){
  var o = {
    m : function() {
      var self = this;
      alert(this === o);
      f();
     
      function f() {
        alert(this === o);
        alert(self === o);
      }
    }
  };
  o.m();
}
