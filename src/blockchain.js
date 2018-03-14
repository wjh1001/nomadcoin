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


console.log(blockchain);
