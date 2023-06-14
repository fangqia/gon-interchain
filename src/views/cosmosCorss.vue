<template>
    <div class="d-flex flex-column justify-space-center align-center">
        <div class="create d-flex flex-row justify-space-center align-center">
            <img class="image" :src="NFTInfo.imgUrl">
        </div>
        <div class="nftinfo">
            <div class="name" style="padding: 10px;">
                {{ NFTInfo.name }}
            </div>
            <!-- <div class="description">
                {{ NFTInfo.description }}
            </div> -->
            <div class="description">
                {{ NFTInfo.description }}
            </div>
        </div>
        <div class="tips">
            <div class="line"></div>
            <div class="tipsTitle">
                Cross-chain need to complete the following operations:
            </div>
            <div class="tips1">
                1. Convert Uptick-EVM based NFTs to Uptick-COSMOS based.
            </div>
            <div class="tips2">
                2. Cross-chain transfer the NFTs from the Uptick-COSMOS chain to the IRISnet chain.
            </div>
        </div>
        <div class="bottom">
            <button class="withdrawBtn" @click="withdrawButton">
                <div>
                    Withdraw to Uptick-EVM
                </div>
            </button>
            <button class="crossBtn" @click="crossButton">
                <div>
                    Cross-chain transfer to IRISnet
                </div>
            </button>

        </div>
        <loading :isShowLoading="isShowLoading"></loading>
        <uComponents ref="ucom"></uComponents>
    </div>
</template>

<script>

import { getNftImg } from "/src/api/image"
import Loading from "@/components/loading.vue";
import { keplrKeystoreChange } from "/src/keplr/index";
import { requestConvertCosmosNFT2ERC } from "/src/api/home"
import { convertCosmosNFT2ERC, uptick2Iris } from "/src/keplr/uptick/wallet"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Cross',
    inheritAttrs: false,
    components: { Loading },
    props: {
        NFTInfo: Object
    },
    data() {
        return {
            isShowLoading: false,
            sender: '',
        }
    },
    filters: {

    },
    async mounted() {
        console.log(this.NFTInfo)
        console.log(this.$store.state.UptickAddress)//UptickAddress
        console.log(this.nameValue)
        window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
        // debugger
        //         const randomInt = new Date().getTime() % 100000 + 1;
        //         this.nameValue = "test_" + this.chainType + "_" + String(randomInt)
        //         this.descriptionValue = "test_" + this.chainType + "_" + String(randomInt)
        //         this.uploadedImageHash = 'QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2'

    },
    methods: {
        keplrKeystoreChange() {
            keplrKeystoreChange();
        },

        async withdrawButton() {

            console.log(this.NFTInfo)

            debugger
            let denomId = this.NFTInfo.nftAddress
            let nftId = this.NFTInfo.nftId
            this.isShowLoading = true
            try {
                let txResult = await convertCosmosNFT2ERC(denomId, nftId)
                let requestConvert = this.requestConvertSuccess(txResult)
                console.log(requestConvert)
                this.isShowLoading = false
                this.$toast("success", "Convert Success")
                this.$emit('withdraw:showpop');
                debugger
            } catch (error) {
                this.isShowLoading = false
                this.$toast("error", error)
            }
        },

        async requestConvertSuccess(txResult) {
            var params = {}

            params.evmNftAddress = txResult.evmNftAddress
            params.evmNftId = txResult.evmNftId
            params.evmOwner = txResult.evmOwner

            let updateNftDto = {}
            updateNftDto.nftAddress = txResult.nftAddress
            updateNftDto.nftId = txResult.nftId
            updateNftDto.owner = txResult.owner

            console.log(params)
            console.log(updateNftDto)

            let result = await requestConvertCosmosNFT2ERC(params, updateNftDto)
            console.log(result)
            if (result.status == 201 || result.status == 200) {
                return result.data.data
            } else {
                // flag = false;
                throw new Error("Request Creeate Falied");
            }
        },
        async crossButton() {
            console.log(this.NFTInfo)

            let denomId = this.NFTInfo.nftAddress
            let nftId = this.NFTInfo.nftId
            this.isShowLoading = true
            try {
                let result = await uptick2Iris(denomId, nftId)
                console.log(result)
                // //链上转送完成，调用接口
                // let params = {}
                // params.nftAddress = denomId
                // params.nftId = nftId
                // params.status = 1
                // // let transferResult = await requestTranserNFT(params)
                // // console.log(transferResult)

                this.isShowLoading = false
                this.$toast("success", "Cross chain to IRIS completed").then(()=>{
                       this.$emit('crossIris');
                })
              
                debugger
            } catch (error) {
                this.isShowLoading = false
                this.$toast("error", error)
            }
        },
        loadeImageUrl(hash) {
            return getNftImg(hash)
        },
    },

}

</script>
<style lang='scss' scoped>
.title {
    text-align: center;
    width: 100%;
    font-family: "AmpleSoft-Bold" !important;
    font-size: 15px !important;
    font-weight: normal;
    font-stretch: normal;
    color: #ffffff;
}

.create {
    width: 100%;
    height: 450px;

    .image {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #401b45;
        width: 100%;
        height: 100%;
        object-fit: contain;
        overflow: hidden;
        // cursor: pointer;
    }
}


.nftinfo {
    height: 100px;
    overflow: auto;
    width: 390px;
}

::-webkit-scrollbar {
    display: none;
}


.name {
    // width: 90%;
    font-family: "AvenirNext-Bold" !important;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
}


.description {
    font-family: "AvenirNext-Regular" !important;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    text-align: left;
}

.tips {
    width: 390px;

    .line {
        margin: 10px 0px 10px 0px;
        width: 100%;
        height: 1px;
        border: solid 1px #8c055e;
    }

    .tipsTitle {
        width: 100%;
        font-family: "AvenirNext-Bold" !important;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
    }

    .tips1 {
        width: 100%;
        font-family: "AvenirNext-Regular" !important;
        font-size: 13px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #ffffff;
        padding: 10px 0px 10px 0px;
    }



    .tips2 {
        width: 100%;
        font-family: "AvenirNext-Bold" !important;
        font-size: 13px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #ed0091;
        padding: 10px 0px 10px 0px;
    }

}


.bottom {
    display: flex;
    width: 390px;
    justify-content: space-around;
}

.withdrawBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 151px;
    height: 50px;
    border-radius: 25px;
    border: solid 1px #ed0091;
    cursor: pointer;

    div {
        width: 91px;
        font-family: "AvenirNext-Bold" !important;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
    }
}


.crossBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 226px;
    height: 50px;
    background-image: linear-gradient(90deg,
            #ed0091 0%,
            #7e0574 100%);
    border-radius: 25px;
    cursor: pointer;

    // margin-left: 15px;
    div {
        width: 163px;
        font-family: "AvenirNext-Bold" !important;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
    }
}</style>