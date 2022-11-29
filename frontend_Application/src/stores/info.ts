import { defineStore } from "pinia";
import { ethers, providers } from "ethers";

import { safe, useContracts } from "../../utils";

export type Chain = "97"; 
export const DEFAULT_CHAINID = "97" as Chain;

export const useInfo = defineStore("info", {
  state: () => {
    return {
        infoLoaded: false,
    };
  },
  getters: {
    // signer: (state) => state._signer(),
  },
  actions: {
    async environmentsetup() {
        console.log("All information loading");
        // Avoiding Reloading of Dashboard
        if (this.infoLoaded === false) {
          // Address Info
          await this.loadingAddresses();
          // Index Info
          await this.loadingIndexes();
          // definedPrice
          await this.definedPrice();
  
          // Smart Contract Address:
          await this.smartContractAddress();
  
          // DecimalPoints
          await this.DecimalPoints();
  
          // ContractOwner
          await this.ContractOwner();
  
          // Checking That if the Information is loaded or not
          this.infoLoaded = true;
        }
        console.log("All information loaded");
      },
    
  },
});
