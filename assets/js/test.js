const myArr = new MyArray(10, 21);

myArr.unshift(100, 200, 300);
console.log(myArr);

myArr.reverse();
console.log(myArr);

const res = myArr.map(function(item){
  return `---> ${item} <---`;
});
console.log(res);
