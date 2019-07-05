# Algorand token multisender
## Requirements

1. NodeJS v11.2.0 and NPM v6.9.0 (`brew install node`)
2. Git (`brew install git`)

## Installation

1. `git clone https://github.com/PepperSecDev/algorand_multisend.git`
2. `cd algorand_multisend`
3. `npm install`
4. `cp recipients.csv.example recipients.csv`
4. Place your addresses to `recipients.csv` file. (Specify amount in ALGOs)
5. Put your mnemonic in `.env.example` file (`SEED_PHRASE` parameter)
6. `cp .env.example .env`

## Start the app
1. `node index`


# Section for developers

## run mainnet node
1. `docker-compose up -d`
2. `docker-compose exec algorand_mainnet bash`
3. `cat /algorand/node/data/algod.token`

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