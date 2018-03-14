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
    CryptoJS.SHA256(index + previousHash + timestamp + JSON.stringify(data)
).toString();


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

const getBlockHash = (block) => createHash(block.index, block.previousHash, block.timestamp, block.data);


const isNewBlockchainValid = (candidateBlock, latestBlock) => {
    if (latestBlock.index + 1 !== candidateBlock.index){
        console.log("The candidate block doesnt have  a valid index");  
    return false;
    } else if(latestBlock.hash !== candidateBlock.previousHash){
        console.log("The previousHash of the candidate block is not the hash of the lasest block");
        return false;
    } else if(getBlockHash(candidateBlock) !== candidateBlock.hash){
        console.log("The hash of this block is invalid");
        return false;
    }
    return true;
};


const isNewStructureValid = block => {
    return(
    typeof block.index === "number" && 
    typeof block.hash === "string" &&
    typeof block.previousHash === "string" &&
    typeof block.timestamp === "number"
    typeof block.data === "string"
    );
    
}
