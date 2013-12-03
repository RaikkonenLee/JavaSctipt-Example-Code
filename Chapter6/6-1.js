var a = {}, var b = {x:1,y:2,z:3};
var b = { "a1" : "Java", "a2" : "C#", author : { firstname : "David", lastname : "Flang"}}
var o = new Object();
var a = new Date();
var c = Object.create({ x : 1 , y : 2}); //ECMAscript5

//Object.create-可設參數為prototype
var b = Object.create(Object.seal({x:1}),{
    y:{
      value : 2
    }
});
