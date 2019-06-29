const algosdk = require('algosdk')
require('dotenv').config()
const { SEED_PHRASE, TOKEN, ASERVER, APOST } = process.env

const account = algosdk.mnemonicToSecretKey(SEED_PHRASE)
console.log('Your address', account.addr)


async function main() {

    const algodclient = new algosdk.Algod(TOKEN, ASERVER, APOST);

    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);

    const txn = { 
        "to": "7ZUECA7HFLZTXENRV24SHLU4AVPUTMTTDUFUBNBD64C73F3UHRTHAIOF6Q",
        "fee": 10,
        "amount": 847,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        // "closeRemainderTo": "IDUTJEUIEVSMXTU4LGTJWZ2UE2E6TIODUKU6UW3FU3UKIQQ77RLUBBBFLA",
        "note": new Uint8Array(0) // new Uint8Array(Buffer.from("6gAVR0Nsv5Y=", "base64"))
    };

    const signedTxn = algosdk.signTransaction(txn, account.sk)
    let tx = (await algodclient.sendRawTransaction(signedTxn.blob));
    console.log("Transaction : " + tx.txId);
}

main()