const sha256= require('crypto-js/sha256');
const EC=require('elliptic').ec;
const ec =new EC('secp256k1');

class Transactions{
    constructor(fromAddress,toAddress,amount){
        this.fromAddress=fromAddress;
        this.toAddress=toAddress;
        this.amount=amount;
    }

    calculateHash(){
        return sha256(this.fromAddress+this.toAddress+this.amount).toString();
    }

    signTransaction(signingKey){
        if(signingKey.getPublic('hex')!== this.fromAddress){
            throw new Error('you cannot sign transactions fro other wallets');
        }
        const hashTx= this.calculateHash();
        const sig= signingKey.sign(hashTx,'base64');
        this.signature=sig.toDER('hex');
    }

    isValid(){
        if(this.fromAddress===null)return true;

        if(!this.signature || this.signature.length=== 0){
            throw new Error('NO signatre in this transaction');
        }

        const publicKey=ec.keyFromPublic(this.fromAddress,'hex');
        return publicKey.verify(this.calculateHash(),this.signature);
    }
}

class Block{
    constructor(transactions, previousHash=''){

        this.timestamp=Date.now();
        this.transactions=transactions;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce=0;
    }

    calculateHash(){
        return sha256( this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty)!== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash=this.calculateHash();
        }
        console.log("Block mined" + this.hash)
    }

    hasValidTransaction(){
        for(const tx of this.transaction){
            if(!tx.isValid()){
                return false;
            }
        }
        return true;
    }
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty=2;
        this.pendingTransactions=[];
        this.minigRewards=100;
    }


    createGenesisBlock(){
        return new Block("Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    minePendingTransactions(miningRewardAddress){
        let block= new Block(Data.now(),this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined');
        this.chain.push(block);

        this.pendingTransactions=[
            new Transactions(null,miningRewardAddress,this.miningReward)
        ];
    }

    addTransaction(transaction){
       
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include from and to address')
        }
        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction')
        }
        
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance=0;

        for(const block of this.chain){
            for(const trans of block.tranactions){
                if(trans.from.Address=== address){
                    balance-=trans.amount;
                }
                if(trans.toAddress=== address){
                    balance-= trans.amount;
                }
            }
        }
        return balance
    }

    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock=this.chain[i];
            const previousBlock=this.chain[i-1];
            
            if(!currentBlock.hasValidTransaction()){
                return false;
            }
            if(currentBlock.hash !==currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}
module.exports.Block=Block
module.exports.Blockchain=Blockchain
module.exports.Transactions=Transactions