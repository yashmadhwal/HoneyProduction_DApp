import { defineStore } from "pinia";
import { ethers, providers } from "ethers";

import { safe, useContracts } from "../../utils";

export type Chain = "97"; 
export const DEFAULT_CHAINID = "97" as Chain;

export const useHoneyInfo = defineStore("honeyInfo", {
  state: () => {
    return {
        infoLoading: false,
        // 1667474163,100,CLOVER,0x80773c866332a7f3CFdD583d0b3A96655F035d6C,false 
      
        honeyId: 0,
        timestamp: '',
        weight: 0,
        type: '',
        producer: '',
        sold: false,
    
        NoHoney: false
    };
  },
  getters: {
    // signer: (state) => state._signer(),
  },
  actions: {


    async honeyInfo(id){
        // gettingHoneyInfo
        this.infoLoading = true
        try {

            console.log('Honey Id',id)
            const { honey } = useContracts(DEFAULT_CHAINID);
            const temp = await honey.getHoneyInfo(id);
            
            this.honeyId = temp[0]

            // Timestamp
            const unixTime = temp[1] 
            let date = new Date(Number(unixTime) * 1000);
            // Hours part from the timestamp
            let dateMonth = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

            let hours = date.getHours();
            // Minutes part from the timestamp
            let minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            let seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
            let formattedTime = dateMonth + ' ; '+ hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

            this.timestamp = formattedTime
            this.weight= temp[2]
            this.type= temp[3]
            this.producer= temp[4]
            this.sold= temp[5]
            this.NoHoney = false
    
            } catch (err: any){
                console.log(err)
                this.honeyId=0
                this.timestamp=''
                this.weight=0
                this.type=''
                this.producer=''
                this.sold=false
                this.NoHoney = true
            }
        this.infoLoading = false
    }    
  },
});
