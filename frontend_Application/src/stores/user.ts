import { defineStore } from "pinia";
import { ethers, providers } from "ethers";

import { useInfo } from "./info";
import { DEFAULT_CHAINID } from "./info";

// Importing Roles information

// import { useToken } from './contract/token'
export const useUser = defineStore("user", {
  state: () => {
    return {
      wallet: "",
      shortWallet: "",
      loading: false,
      minting: false,
      transferring: false,
      login: false,
      chainId: DEFAULT_CHAINID,
      userRole: '',
      currentPage: '',
      _signer: () => null as null | providers.JsonRpcSigner,
    };
  },
  getters: {
    signer: (state) => state._signer(),
  },
  actions: {
    async connect(
      wallet: string,
      signer: providers.JsonRpcSigner,
      chainId: string
    ) {
      console.log("Connect: ", wallet, chainId);
      // this.wallet = wallet;
      this.wallet = ethers.utils.getAddress(wallet);
      this.shortWallet = wallet.slice(0, 6) + "..." + wallet.slice(-4);
      this.connected = true;
      this._signer = () => signer;
      this.login = true;
      this.chainId = chainId.toString();
    },

    async connectMetamask() {
      console.log("Connecting to metamask...");
      console.log("loading", this.loading);
      console.log("chain ID", this.chainId);
      this.loading = true;

      console.log("this.loading", this.loading);
      const info = useInfo();

      // If InfoLoaded is false, then environmental setup required
      const infoLoad = info.infoLoaded;
      if (infoLoad === false) {
        await info.environmentsetup();
      }

      try {

        if (!(window as any).ethereum)
          throw new Error("Please set up MetaMask properly");

        const wallet = (
          await (window as any).ethereum.request?.({
            method: "eth_requestAccounts",
          })
        )[0] as string;

        const provider = new providers.Web3Provider(
          ((window as any).ethereum as any) || (window as any).web3
        );
        const signer = provider.getSigner();
        const chainId = (await provider?.getNetwork())?.chainId;
        // console.log("(await signer.getChainId()).toString())",(await signer.getChainId()).toString())
        // console.log("this.chainId)",this.chainId)
        if ((await signer.getChainId()).toString() != this.chainId) {
          this.loading = false;
          this.openConnectWindow();
          return;
        }
        //   if (!chainIds.includes(chainId.toString() as Chain))
        // await this.switchChainId('97')

        // Get current page:


        // Getting Current Role

        this.getAuthorisedRole(this.currentPage)

        if(ethers.utils.getAddress(wallet) != this.userRole){
          alert("No authorisation!! Connect via authorised wallet or contact Admin!")
        }

        else {
          await this.connect(wallet, signer, chainId.toString());  
          ((window as any).ethereum as any).once(
            "chainChanged",
            async (chainId: string) => {
              await this.connectMetamask();
            }
          );
        }
        
        
        // ;((window as any).ethereum as any).once(
        //   'accountsChanged',
        //   this.addressChangeHandler
        // )
      } catch (err: any) {
        console.log("error");
        console.log(err);
      }
      
      // Loading info of wallets
      const water = useWater();
      water.loadWaterInfo();
      const electricity = useElectricity();
      electricity.loadElectricityInfo();
      const fuel = useFuel();
      fuel.loadFuelInfo();
      const filling = useFilling();
      filling.loadFuelInfo();

      this.loading = false;
      console.log("loading", this.loading);
    },

    // To Authorise the role as we navigate through the pages.
    getAuthorisedRole(page){
      const info = useInfo();
      switch (page) {
        case 'admin':
          this.userRole = info.definedAddress.admin;
          break;
            
        case 'electricity':
          this.userRole = info.definedAddress.electricity;
          break;
            
        case 'water':
          this.userRole = info.definedAddress.water;
          break;
        
        case 'fuel':
          this.userRole = info.definedAddress.fuel;
          break;

        case 'fillingStation':
          this.userRole = info.definedAddress.fillingStation;
          break;
      }
    },

    // Update page as per navigation
    updatePage(page){
      this.currentPage = page;
    }
  },
});
