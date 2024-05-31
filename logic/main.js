const {Block,Blockchain,Transactions}=require('./blockchain')
const EC=require('elliptic').ec;
const ec =new EC('secp256k1');

let jamiaCoin= new Blockchain();
console.log("block1")
jamiaCoin.addTransaction(new Transactions("ubaid","abeed",12));
console.log("block2")
jamiaCoin.addTransaction(new Transactions("ubaid","abeed",12));
console.log(jamiaCoin); 
//module.exports.jamiaCoin=jamiaCoin