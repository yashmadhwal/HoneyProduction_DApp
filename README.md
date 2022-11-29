# Honey Production Decentralised Application
This repository consist of two parts:
- Smart Contract (contract_blockchain)
- Frontend Application (frontend_Application)

This guide will help you to compile, deploy and interact with smart contract running on the blockchain via frontend application.
So, lets get started...

##### Open Terminal and clone the repository by running the following command:
```
    https://github.com/yashmadhwal/HoneyProduction_DApp.git
```

## 1. Deploy smart contract
### Pre-requisite:
- [RPC](https://docs.bscscan.com/misc-tools-and-utilities/public-rpc-nodes) for connecting to blockchain network
- API key from [Binance](https://www.binance.com/en/binance-api) for contract verification. 
_Note_: In this tutorial, we will be working with Binance, therefore the above links are for binance. You can choose any network that supports EVM (e.g. Ethereum), and then accordingly change the RPC and API keys
- Private key of wallet which will be deploying the contract. Best way is to have MetaMask wallet installed in your Browser.

### Setting up contract environment:
- Navigate to the folder
    ```
    cd contract_blockchain
    ```
- Install the required dependencies
    ```
    npm i
    ```
- Compile the contract
    ```
    npm run compile
    ```
- Test the smart contract's functionality
    ```
    npm run test
    ```
### Deploy contract:
- Create a file `.secrets.json`:
    ```
    touch .secrets.json
    ```
- Open `.secrets.json` by running `open .secrets.json` or opening by any code editor and paste the following and save it:
    ```
    {
        "bsc_test" : "#Your RPC key",
        "privateKey" : "#Your private key ",
        "apiKey" : "#Your API  Key"
    }
    ```
    Replace the api keys with your keys. _Note_: That this file will be ignored by git as it is included in the .gitignore file.
- To deploy and verify the contract
    ```
    npx hardhat deploy --tags honeyProduction --network bsc_testnet
    ```
    __Deploying to other networks__:
    - If you wish to deploy on someother network that supports EVM, then you need to do some configurations.
    - In `hardhat.config.ts` file, do the network cofiguration as follows (for example for ETH):
        ```
        eth_scan: {
            url: secrets.eth_test,
            accounts: [secrets.privateKey],
            verify: {
                etherscan: {
                apiKey: secrets.apiKey,
            },
          },
        },
        ```
        Note that you will require to add the RPC and API for ethererum in `.secrets.json` accordingly.
    - To deploy, select `--network` accordingly, e.g. `--network eth_scan`.
- Once contract is deployed, you should verify smart contract, such that interacting with it becomes easy:
    ```
    npx hardhat etherscan-verify --network bsc_testnet
    ```
    
## 2. Interacting with deployed Smart Contract:
- Approving Honey Producer's wallet to produce Honey Package. As per Public Key Infrasturcture (PKI), smart contract deployer, shoud approve wallets that will be eligible to produce honey. Go to the deployed contract address (_Only for reference_: https://testnet.bscscan.com/address/0xc4a24ca2e3fc5af67cee60017b53150fff34369f#code) 
- Connect with Metamask (clicking `Connect to Web3`) and write the transaction by calling fuction `permitAccess(address _producerAddress)` and pass the parameter of wallet address, that will be eligible to produce package.
- After permitting the wallet, switch to that Wallet (in Metamask) to produce package. Call the function `producePackage(uint _quantityWeight, string memory _honeyType)` and pass the required info, for example, _100_ grams and _WILDFLOWER_ as type. And write the contract.

## 3. Running Decentralized Application:
### Pre-requisite:
- Copy folders `deployments` and `typechain` from _contract\_blockchain_ folder and paste it in the _fontend\_Application_ folder. 


### Setting up contract environment:

- Go to the root folder (either by running `cd ..` in terminal or open new terminal)
- Navigate to the folder
    ```
    cd frontend_Application
    ```
- Install the required dependencies
    ```
    npm i
    ```
- Create a file `.secrets.ts`:
    ```
    touch .secrets.ts
    ```
- Open `.secrets.ts` by running `open .secrets.ts` or opening by any code editor and paste the following and save it:
    ```
    export default {
        "bsc_test" : "#Your RPC key"
    }
    ```
    Replace the api keys with your keys. _Note_: That this file will be ignored by git as it is included in the .gitignore file.

- Run the application:
    ```
    npm run dev
    ```
    
- Explore the application at he deployed _local\_host_: http://127.0.0.1:5173/



