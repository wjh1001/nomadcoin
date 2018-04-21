const CryptoJS = require('crypto-js'),
  elliptic = require('elliptic')

// Create and initialize EC context
// (better do it once and reuse it)
var ec = new EC('secp256k1')

class TxOut {
  constructor (address, amount) {
    this.address = address
    this.amount = amount
  }
}

class TxIn {
	// uTxOutId
	// uTxOutIndex
	// Signature
}

class Transaction {
	// ID
	// txIns[]
	// txOuts[]
}

class UTxOut {
  constructor (uTxOutId, uTxOutIndex, address, amount) {
    this.uTxOutId = uTxOutId
    this.uTxOutIndex = uTxOutIndex
    this.address = address
    this.amount = amount
  }
}

let uTxOuts = []

const getTxId = tx => {
  const txInContent = tx.txIns.map(txIn => txIn.uTxOutId + txIn.txOutIndex).reduce((a, b) => a + b, '')

  const txOutContent = tx.txOuts.map(txOut => txOut.address + txOut.amount).reduce((a, b) => a + b, '')
  return CryptoJS.SHA256(txInContent + txOutContent).toString()
}

const signTxIn = (tx, txInIndex, privateKey, uTxout) => {
  const txIn = tx.txIns[txIndex]
  const dataToSign = tx.id
	// To do: Find Tx
  const referencedTxOut = null
  if (referencedTxOut === null) {

  }
}
