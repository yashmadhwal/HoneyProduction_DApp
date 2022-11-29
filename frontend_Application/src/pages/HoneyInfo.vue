<template>
    <div class="container mx-auto p-[20px] m-[10px] border-[3px] border-[#5F266D]">
        <!-- Loading -->
        <div v-if="infoLoading">
            Loading..
        </div>
        <!-- Loaded -->
        <div v-else>
            <!-- ID of Honey -->
            <div class="font-Amatic text-[700] text-[35px] text-[#5F266D] tracking-[3px] flex justify-center">Honey Id:
                {{ id }}</div>

            <!-- Other informations -->
            <!-- Data -->
            <div v-if='NoHoney' class="text-center">
                <!-- <img src="../assets/Icon/noHoney.webp" alt="" class="mx-auto"> -->
                Opps No honey found!
            </div>

            <div v-else class="flex justify-center">
                <div v-if="!sold">
                    <img src="../assets/Icon/Not_Sold.jpg" alt="" class="h-[150px] w-[150px]">
                    <div class="text-center text-green-500">Available</div>
                </div>
                <div v-else>
                    <img src="../assets/Icon/HoneySold.png" alt="" class="h-[150px] w-[150px]">
                    <div class="text-center text-red-500">Sold</div>
                </div>
                <!-- Time -->
                <div>
                    <div class="text-center">Time (DD/MM/YYYY ; hour:min:sec):<br>{{timestamp}}</div>
                    <div class="text-center">Weight:<br>{{weight}}</div>
                    <div class="text-center">Type:<br>{{type}}</div>
                    <div class="text-center">Wallet:<br>{{producer}}</div>
                </div>
            </div>

            <div class="flex justify-center"><button onclick="history.back()"
                    class="border-2 p-[5px] h-[50px] rounded-[12px] font-Amatic text-[700] text-[35px] text-[#F9D335] tracking-[3px] bg-[#5F266D] hover:bg-[#b02465] grid place-content-center">Go
                    Back</button></div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'

import {
    mapState,
    mapActions
} from 'pinia'

import { useHoneyInfo } from '../stores/honeyInfo'

export default {
    name: 'HoneyInfo',
    components: {

    },
    data() {
        return {
            id: 0,
            valid_id: false,
            notSold: true,
        }
    },
    beforeMount() {
        const route = useRoute();
        const temp = route.params.id;
        this.id = Number(temp)
        if (isNaN(this.id)) {
            alert("alert invalid Id")
            history.back()
        }
        else {
            this.honeyInfo(this.id)
            this.valid_id = true
        }
    },
    computed: {
        ...mapState(useHoneyInfo,['infoLoading','honeyInfo','timestamp', 'weight', 'type', 'producer', 'sold' ,'NoHoney'])
    },
    methods: {
        ...mapActions(useHoneyInfo, ['honeyInfo'])
    }
};
</script>


<style scoped>
* {
    /* border: 1px solid; */
}
</style>
