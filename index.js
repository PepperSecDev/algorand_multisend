const algosdk = require('algosdk')
const fs = require('fs')
require('dotenv').config()
const { SEED_PHRASE, TOKEN, ASERVER, APORT } = process.env

const account = algosdk.mnemonicToSecretKey(SEED_PHRASE)
console.log('Your address', account.addr)

let txn = { 
    to: null,
    fee: 1,
    amount: null,
    firstRound: null,
    lastRound: null,
    genesisID: null,
    genesisHash: null,
    // closeRemainderTo: 'IDUTJEUIEVSMXTU4LGTJWZ2UE2E6TIODUKU6UW3FU3UKIQQ77RLUBBBFLA',
    note: new Uint8Array(0) // new Uint8Array(Buffer.from('6gAVR0Nsv5Y=', 'base64'))
};

async function main() {
    let recipients = fs.readFileSync('./recipients.csv', 'utf8');
    recipients = recipients.split('\n')
    const algodclient = new algosdk.Algod(TOKEN, ASERVER, APORT);
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);

    console.log('\nAirdrop started!')
    for (let recipient of recipients) {
        recipient = recipient.split(',')
        txn.to = recipient[0]
        txn.amount = Number(recipient[1])
        txn.firstRound = params.lastRound
        txn.lastRound = endRound
        txn.genesisID = params.genesisID
        txn.genesisHash = params.genesishashb64

        const signedTxn = algosdk.signTransaction(txn, account.sk)
        let tx = (await algodclient.sendRawTransaction(signedTxn.blob));
        console.log(`Transaction id for ${recipient[0]}: ` + tx.txId);

        params = await algodclient.getTransactionParams();
        endRound = params.lastRound + parseInt(1000);
    }

    console.log('You have successfully made the Algorand airdrop!')
}

main()