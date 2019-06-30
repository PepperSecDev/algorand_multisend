const algosdk = require('algosdk')

for(let i = 0; i < process.argv[2]; i++) {
    var account = algosdk.generateAccount();
    console.log(account.addr + ',' +  '1000000')
}
