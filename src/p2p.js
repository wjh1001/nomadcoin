const WebSockets = require("ws"),
  Blockchain = require("./blockchain");

const { getLastBlock } = Blockchain;


const sockets = [];


// Messages Types

const GET_LATEST = "GET_LATEST";
const GET_ALL = "GET_ALL";
const BLOCKCHAIN_RESPONSE = "BLOCKCHAIN_RESPONSE";


// Message Creators

const getLatest = () => {
  return{
    type: GET_LATEST,
    data: null
  };
};

const getAllBlock = () => {
  return{
    type: GET_ALL,
    data: null
  };
};

const blockchainResponse = data =>{
  return{
    type: BLOCKCHAIN_RESPONSE,
    data
  };
};

const getSockets = () => sockets;

const startP2PServer = server => {
  const wsServer = new WebSockets.Server({ server });
  wsServer.on("connection", ws => {
      initSocketConnection(ws);
    console.log(`Hello Socket!`);
  });
  console.log("Nomadcoin P2P Server running");
};

const initSocketConnection = ws => {
  sockets.push(ws);
  handleSocketMessages(ws);
  handleSocketError(ws);
};


const handleSocketMessages = ws => {
  ws.on("message", data =>{});
}



const handleSocketError = ws => {
  const closeSocketconnection = ws => {
    ws.close();
    sockets.splice(sockets.indexOf(ws), 1);
  };
  ws.on("close", () => closeSocketconnection(ws));
  ws.on("error", () => closeSocketconnection(ws));

}

const connectToPeers = newPeer => {
  const ws = new WebSockets(newPeer);
  ws.on("open", () => {
    initSocketConnection(ws);
  });
};


module.exports = {
  startP2PServer,
  connectToPeers
};