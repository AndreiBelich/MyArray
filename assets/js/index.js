"use strict";

function MyArray(){
  this.length = 0;
  for(let i = 0; i < arguments.length; i++){
    this.push(arguments[i]);
  }
}

function MyArrayProto(){

  this.push = function(){
    for(let i = 0; i < arguments.length; i++){
      this[this.length++] = arguments[i];
    }
    return this.length;
  }

  this.pop = function(){
    if(this.length === 0){
      return;
    }
    const lastValue = this[this.length-1];
    delete this[--this.length];
    return lastValue;
  }

  this.unshift = function(){
    const tempArray = new MyArray();
    for(let i = 0; i < arguments.length; i++){
      tempArray.push(arguments[i]);
    }
    for(let i = 0; i < this.length; i++){
      tempArray.push(this[i]);
      delete this[i];
    }
    this.length = 0;
    for(let i = 0; i < tempArray.length; i++){
      this.push(tempArray[i]);
    }
    return this.length;
  }

  this.shift = function(){
    if(this.length === 0){
      return;
    }
    const tempArray = new MyArray();
    const firstValue = this[0];
    delete this[0];
    for(let i = 1; i < this.length; i++){
      tempArray.push(this[i]);
      delete this[i];
    }
    this.length = 0;
    for(let i = 0; i < tempArray.length; i++){
      this.push(tempArray[i]);
    }

    return firstValue;
  }

  this.concat = function(){
    const tempArray = new MyArray();
    for(let i = 0; i < this.length; i++){
      tempArray.push(this[i]);
    }
    for(let i = 0; i < arguments.length; i++){
      if(MyArray.isMyArray(arguments[i]) || Array.isArray(arguments[i])){
        for(let j = 0; j < arguments[i].length; j++){
          tempArray.push(arguments[i][j]);
        }
      }else{
        tempArray.push(arguments[i]);
      }
    }
    return tempArray;
  }

  this.reverse = function(){
    const middle = Math.floor(this.length / 2);
    console.log("middle = ", middle);
    for(let i = 0; i < middle; i++){
      const temp = this[i];
      this[i] = this[this.length - i - 1];
      this[this.length - i - 1] = temp;
    }
  }

  this.forEach = function(callback){
    for(let i = 0; i < this.length; i++){
      callback(this[i], i, this);
    }
  }

  this.map = function(callback){
    const tempArray = new MyArray();
    for(let i = 0; i < this.length; i++){
      tempArray.push(callback(this[i], i, this));
    }
    return tempArray;
  }

}

MyArray.__proto__.isMyArray = function(object){
  return object instanceof MyArray;
};

MyArray.prototype = new MyArrayProto();