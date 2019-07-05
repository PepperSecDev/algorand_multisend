const algosdk = require('algosdk')
const fs = require('fs')
require('dotenv').config()
const { SEED_PHRASE, TOKEN, ASERVER, APORT } = process.env

const account = algosdk.mnemonicToSecretKey(SEED_PHRASE)
console.log('Your address', account.addr)

async function main() {
    let recipients = fs.readFileSync('./recipients.csv', 'utf8').trim()
    recipients = recipients.split('\n')
    const algodclient = new algosdk.Algod(TOKEN, ASERVER, APORT)
    let params = await algodclient.getTransactionParams()
    let endRound = params.lastRound + 1000

    console.log('\nAirdrop started!')
    for (let recipient of recipients) {
        recipient = recipient.split(',')
        if (!algosdk.isValidAddress(recipient[0])) {
            console.log(`The address ${recipient[0]} is invalid.`)
            continue
        }
        let txn = { 
            to: recipient[0],
            fee: 1,
            amount: Number(recipient[1]) * 1000000, // amount * 1000000
            firstRound: params.lastRound,
            lastRound: endRound,
            genesisID: params.genesisID,
            genesisHash: params.genesishashb64,
            // closeRemainderTo: 'MSSLG3APTJX5ICAHO5WZYT65UBEJWH73JRNJTVVIBBGJZAQ26JC5EBMWZY',
            // note: new Uint8Array(0) // new Uint8Array(Buffer.from('6gAVR0Nsv5Y=', 'base64'))
        };

        const signedTxn = algosdk.signTransaction(txn, account.sk)
        let tx 
        try {
            tx = await algodclient.sendRawTransaction(signedTxn.blob)
            console.log(`Transaction id for ${recipient[0]}: ` + tx.txId)
            params = await algodclient.getTransactionParams()
            endRound = params.lastRound + 1000
        } catch (e) {
            console.log(e)
        }
    }

    console.log('You have successfully made the Algorand airdrop!')
}

main()