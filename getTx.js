const algosdk = require('algosdk')
const fs = require('fs')
require('dotenv').config()
const { SEED_PHRASE, TOKEN, ASERVER, APORT } = process.env

async function main() {
    const txid = 'JMI4QRAUKST7RROM7T6U77YUD5BQU24VOP6VRQF33WSFINQABKYA'
    const address = 'TGNACADQQYRWGI5INBV3CI5ZKXP46T6K6A6H5X57HTME6BI5CUBPFJGIBU'
    const algodclient = new algosdk.Algod(TOKEN, ASERVER, APORT)
    const reciept = await algodclient.transactionInformation( address, txid )
    console.log('reciept', reciept)
}

main()