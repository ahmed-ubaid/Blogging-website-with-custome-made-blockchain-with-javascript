const {GENESIS_DATA}= require("./2-configAC");
const cryptoHash=require("./3-crypto-hash");

class Block{
    constructor({timestamp,prevHash, hash, data,nonce,difficulty}){
        this.timestamp=timestamp;
        this.prevHash=prevHash;
        this.hash=hash;
        this.data=data;
        this.nonce=nonce;
        this.difficulty=difficulty;
    }
    static genisis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock({prevBlockHash,difficulty,data}){
        let hash,timestamp;
        const prevHash=prevBlockHash;
        let nonce=0;
        do{
            nonce++;
            timestamp=Date.now();
            hash=cryptoHash(timestamp,prevHash,data,nonce,difficulty)
        }while(hash.substring(0,difficulty)!=='0'.repeat(difficulty));
        return new this({
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce,
            hash
        });
    }
}
module.exports= Block
