const CryptoJS = require('crypto-js'),
  elliptic = require('elliptic'),
  utils = require('./utils')

// Create and initialize EC context
// (better do it once and reuse it)
var ec = new elliptic.ec('secp256k1')

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
  constructor (uTxOutId, txOutIndex, address, amount) {
    this.uTxOutId = uTxOutId
    this.txOutIndex = txOutIndex
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

const findUTxOut = (txOutId, txOutIndex, uTxOutList) => {
  return uTxOutList.find(uTxOut => uTxOut.txOutId === txOutId && uTxOut.txOutIndex === txOutIndex)
} // find Unspend Tx Output

const signTxIn = (tx, txInIndex, privateKey, uTxout) => {
  const txIn = tx.txIns[txIndex]
  const dataToSign = tx.id
	// To do: Find Tx
  const referencedTxOut = findUTxOut(txIn.txOutId, tx.txOutIndex, uTxOuts)
  if (referencedTxOut === null) {
    return
  }
	// To do: Sign txIn
  const key = ec.keyFromPrivate(privateKey, 'hex')
  const signature = utils.toHexString(key.sign(dataToSign).toDER())
  return signature
}
