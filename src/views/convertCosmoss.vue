<template>
    <div class="d-flex flex-column justify-space-center align-center">
        <div class="create d-flex flex-row justify-space-center align-center">
            <img class="image" :src="NFTInfo.imgUrl">
        </div>
        <div style="height:150px; overflow: scroll; width: 390px">
            <div class="name" style="padding: 10px;">
                {{ NFTInfo.name }}
            </div>
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
            <button class="crossBtn" @click="submitButton">
                <div>
                    Convert to Uptick-COSMOS
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
import { uploadJsonData, requestCreateNFT } from "/src/api/home"
import { convertERC2CosmosNFT } from "/src/keplr/uptick/wallet"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Convert',
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
        window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
    },
    methods: {
        keplrKeystoreChange() {
            keplrKeystoreChange();
        },
        async submitButton() {
            console.log(this.NFTInfo)

            debugger
            let contractAddress = this.NFTInfo.nftAddress
            let tokenId = this.NFTInfo.nftId
            this.isShowLoading = true
            try {
                let result = await convertERC2CosmosNFT(contractAddress, tokenId)
                console.log(result)

                let denomId = result[0].events[0].attributes[2].value
                let nftId = result[0].events[0].attributes[3].value
                console.log("denomId, nftId", denomId, nftId)
                //调用接口同步数据
                // XXXXXXXXXXXXXXX
                this.isShowLoading = false
                this.$toast("success", "Convert Success")
                this.$emit('cross:showpop');
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

.name {
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
    text-align: left;
}


.tips {
    width: 390px;

    .line {
        width: 100%;
        margin: 10px 0px 10px 0px;
        height: 1px;
        border: solid 1px #8c055e;
    }

    .tipsTitle {
        width: 100%;
        // height: 86px;
        margin: 10px 0px 10px 0px;
        font-family: AvenirNext-Bold;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        // line-height: 50px;
        letter-spacing: 0px;
        color: #ffffff;
    }

    .tips1 {
        width: 100%;
        margin: 10px 0px 10px 0px;
        font-family: AvenirNext-Bold;
        font-size: 13px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #ed0091;
        text-align: left;

        // padding: 10px 0px 10px 0px;
    }

    .tips2 {
        width: 100%;
        font-family: AvenirNext-Regular;
        font-size: 13px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #ffffff;
        padding-bottom: 10px;
    }

}

.bottom {
    width: 390px;
    display: flex;
    width: 100%;
    justify-content: space-around;
}



.crossBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 390px;
    height: 50px;
    background-image: linear-gradient(90deg,
            #ed0091 0%,
            #7e0574 100%);
    border-radius: 25px;
    cursor: pointer;

    // margin-left: 15px;
    div {
        // width: 163px;
        font-family: AvenirNext-Bold;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
    }
}
</style>