require("@nomiclabs/hardhat-waffle");
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
import "hardhat-deploy";

import {HardhatUserConfig} from "hardhat/config"

const secrets = require("./.secrets.json");

const config:HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    bsc_scan: {
      url: secrets.bsc_test,
      accounts: [secrets.privateKey],
      verify: {
        etherscan: {
          apiKey: secrets.apiKey,
        },
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: secrets.apiKey,
  },
  namedAccounts: {
    deployer: 0,
    sender: 1,
  },
};

export default config;
