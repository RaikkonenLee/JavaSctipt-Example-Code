//模組函數中的Set類別
var Set = (function invocation() {
  function Set() {
    this.values = {};
    this.n = 0;
    this.add.apply(this, arguments);
  }

  Set.prototype.contains = function(value) {
    return this.values.hasOwnProperty(v2s(value));
  };

  Set.prototype.size = function() { return this;};
  Set.prototype.add = function() { /*...*/ };
  Set.prototype.remove = function() { /*...*/};
  Set.prototype.foreach = function(f, context) { /*...*/};
  function v2s(val) { /*...*/};
  function objectId(o) { /*...*/};
  var nextId = 1;
  return Set;
}());

//建立一個全域變數用來存放相關的模組
var collections;
if (!collections) collections = {};
collections.sets = (function namespace() {
  return {
    AbstractSet : AbstractSet,
    NotSet : NotSet;
    AbstractEnumerableSet : AbstractEnumerableSet,
    SingletonSet : SingletonSet,
    AbstractWritableSet : AbstractWritableSet,
    ArraySet : ArraySet
  };
}());

//建立一個全域變數用來存放模組函數當作建構式，利用new來建立
var collections;
if (!collections) collections = {};
collections.sets = (new function namespace() {
  this.AbstractSet = AbstractSet;
  this.NotSet = NotSet;
}());

//另一種替代方案，如已定義全域變數，這個模組可以直接設定在對象的屬性
var collections;
if (!collections) collections = {};
collections.sets = {};
(function namespace() {
  collections.sets.AbstractSet = AbstractSet;
  collections.sets.NotSet = NotSet;
}();)




