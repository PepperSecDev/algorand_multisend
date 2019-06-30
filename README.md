## links
[faucet](https://bank.testnet.algorand.network/)
[docs](https://developer.algorand.org/docs/javascript-sdk)


## run testnet in Docker NO PERSISTENT STATE
```
docker run -p 127.0.0.1:8080:8080/tcp -it algorand/testnet
./update.sh -d ~/node/data
./diagcfg telemetry name -n bob
./goal node status -d data
cat data/algod.token
```

## run testnet on MAC
Install node using guide [here](https://developer.algorand.org/docs/installing-mac) and switch network from mainnet to testnet using [this](https://developer.algorand.org/docs/switching-networks) guide.

## usefull commands
```
curl http://127.0.0.1:8080/v1/block/1 -H "X-Algo-API-Token: 8d35a643aa33dee7882f35bd0c52832ffb9b789f43028aecd612b7e46133c4de"
```

```
./goal node start -d data
```