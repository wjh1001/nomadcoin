const CryptoJS = require("crypto-js");

class Block{
    constructor(index, hash, previousHash, timestamp, data){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
    }
}


const genesisBlock = new Block(
    0,
    '7f7499ba12168779516d2657c449a48b6da165c0c85549c8a07d3cdfdd1d2242',
    null,
    1521015998,
    "This is the genesis!!"
);


let blockchain = [genesisBlock];

const getLastBlock = () => blockchain[blockchain.length - 1];

const getTimestamp = () => new Date().getTime() / 1000;

const createHash = (index, hash, previousHash, timestamp, data) =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();


const createNewBlock = data => {
    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimestamp = getTimestamp();
    const newHash = createHash( //create new Hash
        newBlockIndex, 
        previousBlock.hash,
        newTimestamp,
        data
    );
    const newBlock = new Block(  //create new Block
        newBlockIndex,
        newHash,
        previousBlock.hash,
        newTimestamp,
        data
    );
    return newBlock;
};

console.log(blockchain);
