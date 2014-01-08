function test()
{
  // var Coin = enumeration({Penny: 1, Nickel: 5, Dime: 10, Quarter: 25});
  // var c = Coin.Dime;
  // console.log(c instanceof Coin);
  // console.log(c.constructor == Coin);
  // console.log(Coin.Quarter + 3 * Coin.Nickel);
  // console.log(Coin.Dime == 10);
  // console.log(Coin.Dime > Coin.Nickel);
  // console.log(String(Coin.Dime) + ":" + Coin.Dime);
  //
  var deck = (new Deck()).shuffle();
  var hand = deck.deal(13).sort(Card.orderBySuit);
  console.log(hand);
}

function inherit(p) {
  if (p == null) throw TypeError();
  if (Object.create) 
    return Object.create(p); 
  var t = typeof p; 
  if (t !== "object" && t !== "function") throw TypeError();
  function f() {}; 
  f.prototype = p; 
  return new f(); 
}

function enumeration(namesToValues){
  var enumeration = function() {throw "Can't Instantiate Enumeration";};
  var proto = enumeration.prototype = {
    constructor: enumeration,
    toString: function() { return this.name;},
    valueOf: function() { return this.value;},
    toJSON: function() { return this.name;}
  };
  enumeration.values = [];

  for (var name in namesToValues){
    var e = inherit(proto);
    e.name = name;
    e.value = namesToValues[name];
    enumeration[name] = e;
    enumeration.values.push(e);
  }

  enumeration.foreach = function(f, c){
    for (var i = 0; i < this.values.length; i++){
      f.call(c, this.values[i]);
    }
  };

  return enumeration;
}

//撲克牌類別
function Card(suit, rank){
  //建構子
  this.suit = suit;
  this.rank = rank;
}
//Class裡的Method
Card.Suit = enumeration({ Clubs : 1, Diamonds : 2, Hearts : 3, Spades : 4});
Card.Rank = enumeration({ Two : 2, Three : 3, Four : 4, Five : 5, Six : 6, 
                          Seven : 7, Eight : 8, Nine : 9, Ten : 10,
                          Jack : 11, Queen : 12, King : 13, Ace : 14});
//Class裡繼承的物件方法
Card.prototype.toString = function() {
  return this.rank.toString() + " of " + this.suit.toString();
};
//Class裡繼承的物件方法
Card.prototype.compareTo = function(that){
  if (this.rank < that.rank) return -1;
  if (this.rank > that.rank) return  1;
  return 0;
};
//Class裡的Method
Card.orderByRank = function(a, b) { return a.compareTo(b)};
//Class裡的Method
Card.orderBySuit = function(a, b) {
  if (a.suit < b.suit) return -1;
  if (a.suit > b.suit) return  1;
  if (a.rank < b.rank) return -1;
  if (a.rank > b.rank) return  1;
  return 0;
};
//準備一副52張的牌
function Deck(){
  var cards = this.cards = [];
  Card.Suit.foreach(function(s){
    Card.Rank.foreach(function(r){
      cards.push(new Card(s, r));
    });
  });
}
//洗牌
Deck.prototype.shuffle = function(){
  var deck = this.cards, len = deck.length;
  for (var i = len - 1; i > 0; i--){
    var r = Math.floor(Math.random() * (i + 1)), temp;
    temp = deck[i], deck[i] = deck[r], deck[r] = temp;
  }
  return this;
};
//發牌
Deck.prototype.deal = function(n){
  if (this.cards.length < n) throw "Out of cards";
  return this.cards.splice(this.cards.length - n, n);
};




