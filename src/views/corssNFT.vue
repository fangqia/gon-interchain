<template>
    <div class="d-flex flex-column justify-space-center align-center">
        <div class="create d-flex flex-row justify-space-center align-center">
            <img class="image" :src="NFTInfo.imgUrl">
        </div>
        <div style="height:150px; overflow: scroll; width: 100%;">
            <div class="name" style="padding: 10px;">
                {{ NFTInfo.name }}
            </div>
            <div class="description">
                {{ NFTInfo.description }}
            </div>
        </div>
        <div class="line"></div>
        <div class="tips">
            <div class="name" style="padding: 0px 10px 0px 10px; font-size: 13px; text-align: left;">
                Cross-chain need to complete the following operations:
            </div>
            <div class="description" style="padding: 10px 10px 10px 10px; font-size: 13px; text-align: left;">
                1. Convert Uptick-EVM based NFTs to Uptick-COSMOS based.
            </div>
            <div class="tips2" style="text-align: left;">
                2. Cross-chain transfer the NFTs from the Uptick-COSMOS chain to the IRISnet chain.
            </div>
        </div>
        <div class="bottom">
            <button class="withdrawBtn" @click="submitButton">
                <div>
                    Withdraw to Uptick-EVM
                </div>
            </button>
            <button class="crossBtn" @click="submitButton">
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

import { uploadImage, getNftImg } from "/src/api/image"
import Loading from "@/components/loading.vue";
import { keplrKeystoreChange } from "/src/keplr/index";
import { uploadJsonData, requestCreateNFT } from "/src/api/home"
import { getAccountInfo, issueUptickDenomAndMint, uptick2Iris } from "/src/keplr/uptick/wallet"
import { getMyBalance, issueDenomAndMint, quiryTx, mintNFT } from "/src/keplr/iris/wallet"

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

        console.log(this.$store.state.IrisAddress)//IrisAddress
        console.log(this.$store.state.UptickAddress)//UptickAddress
        console.log(this.$store.state.chainType)//chainType
        this.chainType = this.$store.state.chainType
 
        console.log(this.nameValue)
        window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
        // debugger
        //         const randomInt = new Date().getTime() % 100000 + 1;
        //         this.nameValue = "test_" + this.chainType + "_" + String(randomInt)
        //         this.descriptionValue = "test_" + this.chainType + "_" + String(randomInt)
        //         this.uploadedImageHash = 'QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2'

    },
    watch: {
        uploadedImageHash: 'checkInput',
        nameValue: 'checkInput',
        descriptionValue: 'checkInput',
    },
    methods: {
        keplrKeystoreChange() {
            keplrKeystoreChange();
        },
 
        async submitButton() {
 
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

.name {
    // width: 90%;
    font-family: AvenirNext-Bold;
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
    font-family: AvenirNext-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    padding-left: 10px;
    padding-right: 10px;
    text-align: left;
}

.line {
    margin: 10px 10px 10px 10px;
	width: 96%;
	height: 1px;
	border: solid 1px #8c055e;
}

.tips2 {
    font-family: AvenirNext-Bold;
    font-size: 13px;
    font-weight: normal;
    letter-spacing: 0px;
    color: #ed0091;
    padding: 0px 10px 10px 10px;
}

.bottom {
    display: flex;
    width: 100%;
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

    div {
        width: 91px;
        font-family: AvenirNext-Bold;
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
    // margin-left: 15px;
    div {
        width: 163px;
        font-family: AvenirNext-Bold;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
    }
}
</style>