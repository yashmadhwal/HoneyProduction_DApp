<template>
  <div class="container mx-auto h-screen flex flex-col justify-between bg-[#EBEBEB] p-[20px]">
    <!-- Header -->
    <div class="h-[120px] grid place-items-center border-b-[3px] border-[#5F266D]">
      <div class="flex">
        <h1 class='text-[50px] tracking-[3px] text-[#F9D335] font-Amatic font-[700]'>THE HONEY NETWORK</h1><img
          src="../assets/Icon/header_icon.svg" alt="Icon" class="ml-2 mr-2">
      </div>
    </div>


    <!-- Main -->
    <div class="h-full relative">

      <!--Overlap: Connect Wallet -->
      <!-- <div class="absolute right-0">
        <connectWallet />
      </div> -->

      <!-- Search Bar -->
      <div class="grid grid place-content-center h-full w-full">
        <form class="flex justify-around">
          <input
            class="border-2 h-[50px] w-[250px] rounded-[12px] hover:border-[#5F266D] focus:outline-none focus:border-[#5F266D] text-center font-Amatic text-[35px] tracking-[3px]"
            placeholder="Enter Honey Id" v-model="id" required>
          <router-link :to="`/${id}`">
            <button
              class="border-2 w-[70px] h-[50px] rounded-[12px] font-Amatic text-[700] text-[35px] text-[#F9D335] tracking-[3px] bg-[#5F266D] hover:bg-[#b02465] grid place-content-center"
              @click="info">GET</button>
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>
  

<script>
import connectWallet from './connectWallet.vue'

export default {
  name: 'Home',
  components: {
    connectWallet
  },
  data() {
        return{
            id:'',
        }
    },
  beforeMount(){
    
  }
}
</script>

<style>
div {
  /* border: 1px solid black; */
}

h1 {
  -webkit-text-stroke: 1.5px #5F266D;
}
</style>