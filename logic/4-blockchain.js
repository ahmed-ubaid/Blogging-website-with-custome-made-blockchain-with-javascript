const Block= require("./1-blockAC");
const cryptoHash=require("./3-crypto-hash");

class Blockchain{
    constructor(){
        this.chain=[Block.genisis()];
    }

    addBlock({data}){
        const newBlock= Block.mineBlock({
            prevBlockHash:this.chain[this.chain.lengt-1].hash,difficulty:this.chain[this.chain.lengt-1].difficulty,data
        })
        this.chain.push(newBlock);
    }

    replaceChain(chain){
        if(chain<= this.chain.length){
            console.error("This incoming chain is not longer");
        }
        if(!Blockchain.isValidChain(chain)){
            console.erroe("The incoming chain is not valid");
            return;
        }
        this.chain=chain;
    }

    static isValidChain(chain){
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genisis())){
            return false;
        }

        for(let i=1; i<chain.lengt;i++){
            const {timestamp,prevHash,hash,nonce,difficulty,data}= chain[i];
            const realLastHash=chain[i-1].hash;
            if(prevHash!== realLastHash){
                return false;
            }
            const validatedHash=cryptoHash(timestamp,prevHash,nonce,difficulty,data);
            if(hash!==validatedHash){
                return false;
            }
        }
        return true;
    }
}

const blockchain= new Blockchain();
console.log(blockchain)
blockchain.addBlock({data:"data1"});
console.log(blockchain)

module.exports= Blockchain