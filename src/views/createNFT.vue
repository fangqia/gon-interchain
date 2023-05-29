<template>
    <div class="d-flex flex-column justify-space-center align-center">
        <div class="create d-flex flex-row justify-space-center align-center">
            <input type="file" accept="image/*" ref="fileInput" style="display:none" @change="uploadFile">
            <div class="addButton" @click="chooseFile">
                <img v-if="uploadedImageHash == ''" class="addImage"
                    :src="loadeImageUrl('QmVPw5QsFkLQKX4ysErUACT4yg5Rf65Z4qZKirJ9bwKLFg')">
                <img class="uploadImage" :src="loadeImageUrl(uploadedImageHash)" v-if="uploadedImageHash != ''">
            </div>

        </div>
        <div class="name" style="padding-top: 20px;">
            <div style="display: flex; justify-content: end;">
                <div class="title" style="text-align: right;">{{ nameValue.length }}/80</div>
            </div>
            <input class="textInput" type="text" v-model="nameValue" maxlength="80">
        </div>
        <div class="description">
            <div class="title" style="text-align: right;">{{ descriptionValue.length }}/800</div>
            <textarea class="descriptionText" v-model="descriptionValue" maxlength="800"></textarea>
        </div>
        <div style="width: 90%;">
            <button class="subBtn" @click="submitButton" :disabled="isInputEmpty">Submit</button>
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
import { issueUptickDenomAndMint } from "/src/keplr/uptick/wallet"
import { issueDenomAndMint } from "/src/keplr/iris/wallet"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Create',
    inheritAttrs: false,
    components: { Loading },
    props: {
        imgUrl: String,
        name: String,
        NFTInfo: Object
    },
    data() {
        return {
            uploadedImageHash: '',//默认的图片,
            nameValue: '',// 初始化输入框的值为空
            descriptionValue: '',
            isInputEmpty: true,
            isShowLoading: false,
            sender: '',
            metadataUrl: '',
            chainType: '',
            amountValue: '1'
        }

    },
    filters: {

    },
    async mounted() {
        console.log(this.$store.state.IrisAddress)//IrisAddress
        console.log(this.$store.state.UptickAddress)//UptickAddress
        console.log(this.$store.state.chainType)//chainType
        this.chainType = this.$store.state.chainType

        if (this.chainType == "gon-irishub-1") {
            this.sender = this.$store.state.IrisAddress
        }

        if (this.chainType == "origin_1170-1") {
            this.sender = this.$store.state.UptickAddress
        }
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
        async getMetaDataJson() {
            var metaParams = {}
            metaParams.name = encodeURIComponent(this.nameValue)
            metaParams.description = encodeURIComponent(this.descriptionValue)
            metaParams.image = this.loadeImageUrl(this.uploadedImageHash)
            metaParams.minter = this.sender

            let result = await uploadJsonData(metaParams)
            console.log(result)
            // https://ipfs.upticknft.com/ipfs/QmR55vt4EVdtKyjHuepUgytGiVwTBPnVupDrnJx5gE38Di
            return "https://ipfs.upticknft.com/ipfs/" + result.data.data
        },
        async requestCreateSuccess(txResult) {
            var params = {}

            params.nftAddress = txResult.tokenId;
            params.nftId = txResult.nftIds
            params.hash = txResult.hash
            params.chainType = this.chainType
            params.name = encodeURIComponent(this.nameValue)
            params.description = encodeURIComponent(this.descriptionValue)
            params.creator = this.sender
            params.owner = this.sender
            params.imgUrl = this.loadeImageUrl(this.uploadedImageHash)
            params.metadataUrl = this.metadataUrl
            let result = await requestCreateNFT(params)
            console.log(result)
            if (result.status == 201 || result.status == 200) {
                return result.data.data
            } else {
                // flag = false;
                throw new Error("Request Creeate Falied");
            }
        },
        async submitButton() {

            try {
                console.log(this.nameValue)
                this.isShowLoading = true

                let name = this.nameValue;
                let sender = this.sender
                let data = ""
                let amount = Number(this.amountValue)

                let uri = await this.getMetaDataJson()
                this.metadataUrl = uri

                console.log("wxl ---- mintNFT", name, sender, uri, data, amount)

                let txResult;
                if (this.chainType == "gon-irishub-1") {
                    txResult = await issueDenomAndMint(
                        name,
                        sender,
                        sender,
                        uri,
                        data,
                        amount,
                    );
                    console.log(txResult)
                }
                if (this.chainType == "origin_1170-1") {
                    txResult = await issueUptickDenomAndMint(
                        name,
                        sender,
                        sender,
                        uri,
                        data,
                        amount,
                    );
                }

                debugger
                await this.requestCreateSuccess(txResult)

                let title = "Create Success"
                this.$mtip({
                    title: title,
                });
                this.isShowLoading = false
                this.pushHome()

            } catch (error) {
                console.log(error);
                debugger
                this.isShowLoading = false
                this.$mtip({
                    title: error.message,
                });
            }
        },
        chooseFile() {
            this.$refs.fileInput.click()
        },
        async uploadFile(event) {
            console.log(event)
            const file = event.target.files[0]
            console.log(file)
            const formData = new FormData()
            formData.append('file', file)
            this.isShowLoading = true
            try {
                const value = await uploadImage(file);
                this.isShowLoading = false
                console.log(value.data.data);
                this.uploadedImageHash = value.data.data
            } catch (error) {
                console.error(error);
                this.isShowLoading = false
            }
        },
        loadeImageUrl(hash) {
            return getNftImg(hash)
        },
        checkInput() {
            this.isInputEmpty =
                this.nameValue.trim() === '' ||
                this.descriptionValue.trim() === '' ||
                this.amountValue.trim() === '' ||
                this.uploadedImageHash.trim() === 'QmPuuSpLdzV4Hz4aJtPUVzxsgnLKPYiqKdYtdTGyLF6Pn5'
            console.log(this.isInputEmpty)
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

    .addButton {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #401b45;
        background-position: center;
        height: 450px;
        width: 100%;

        .addImage {
            // background-image: url('/src/assets/icon_addimage.png');
            background-size: 100px;
            height: 90px;
            width: 100px;
        }

        .uploadImage {
            height: 100%;
            width: 100%;
            object-fit: contain;

            // background-color: green;

        }
    }
}

.name {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    // background-color: green;
    .textInput {
        // width: 100%;
        height: 44px;
        padding-left: 10px;
        padding-right: 10px;
        background-image: linear-gradient(#e8daff,
                #e8daff),
            linear-gradient(#a17ae0,
                #a17ae0);
        background-blend-mode: normal,
            normal;
        border-radius: 5px;
    }
}


.description {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    .descriptionText {
        resize: none;
        padding-left: 10px;
        padding-right: 10px;

        /* width: 325px; */
        width: 100%;
        height: 119px;
        background-image: linear-gradient(#e8daff,
                #e8daff),
            linear-gradient(#a17ae0,
                #a17ae0);
        background-blend-mode: normal,
            normal;
        border-radius: 5px;
    }
}


.subBtn {
    margin-top: 25px;
    // margin-bottom: 20px;
    width: 100%;
    height: 41px;
    background-color: #fb599b;
    border-radius: 20px;

    font-family: AmpleSoft-Bold !important;
    font-size: 15px !important;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    cursor: pointer;

}


.subBtn:disabled {
    background-color: gray;
}
</style>