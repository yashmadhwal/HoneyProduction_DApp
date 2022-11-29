<template>
    <div class="w-[300px] pt-[40px] font-Amatic tracking-[3px] text-[24px] font-bold text-[#5f266d]">
        <div @click="connectMetamask()" v-if='!loading && !login' class="h-[50px] bg-[#ffad39] hover:bg-[#c28b3e] border-[2px] border-[#5f266d] rounded-[30px] grid place-content-center cursor-pointer">
            Connect MetaMask
        </div>
        <div v-if='loading' class="h-[50px] bg-[#ffad39] border-[2px] border-[#5f266d] rounded-[30px] grid place-content-center cursor-progress">
            <div v-if='loading' class="flex"><img src="../assets/Images/Icons/loaging.png" alt="" class="motion-reduce:hidden animate-spin dark:invert">&nbsp;&nbsp;Loading...</div>
        </div>

        <div v-if='login && !loading' class="h-[50px] bg-[#c3842b] border-[2px] border-[#5f266d] rounded-[30px] grid place-content-center cursor-not-allowed">
            Connected: {{ shortWallet }}</div>
    </div>
</template>

<script>

import {
    mapActions,
    mapState
} from 'pinia'

// import {
//     useUser
// } from '../stores/user'

// import {
//     useInfo
// } from '../stores/info'

export default {
    name: 'ConnectWallet'
}
</script>