/*建立Function的命名空間，在js檔被調用時就會註冊到當下環境*/
var extend = (function() {
  for(var p in {toString:null}){
    return function extend(o){
      for(var i = 1; i < arguments.length; i++){
        var source = argments[i];
        for(var prop in source) o[prop] = source[prop];
      }
      return o;
    };
  }
  return function patched_extend(o){
    for(var i = 1; i < arguments.length; i++){
      var source = arguments[i];
      for(var prop in source) o[prop] = source[prop];
      //
      for(var j = 0; j < protoprops.length; j++){
        prop = protoprops[j];
        if (source.hasOwnProperty(prop)) o[prop] = source[prop];
      }
    }
    return o;
  };
  var protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty",
                    "isPrototypeOf", "propertyIsEnumerable", "toLocaleString"];
}());

function TestExtend(){
  //var a = extend();
  alert(extend);
}
