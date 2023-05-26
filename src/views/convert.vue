<template>
  <div class="Home">
    <div class="hearder d-flex flex-row justify-space-between align-center">
      <div class="Title">Interchain Marketplace <span>Uptick-EVM</span></div>
      <div class="d-flex flex-row align-center">
        <div class="address">0xsd72093836jsis7w8ekxd83kw0ddrsdwd456</div>
        <button class="disconnect ml-4">Disconnect</button>
      </div>
    </div>
    <div class="content d-flex flex-row justify-space-between align-center">
      <div class="left">
        <div class="top d-flex flex-row justify-space-between align-center">
          <div class="d-flex flex-row justify-space-between align-center">
            <div class="leftButton" style="margin-right: 10px;">
              Switch to Uptick-COSMOS >
            </div>
            <div class="leftButton">
              Cross-chain record
            </div>
          </div>
          <div class="create">
            Create
          </div>
        </div>
        <div class="list">
          <div class="Cardlist d-flex align-content-start flex-wrap" v-if="list.length > 0">
            <div class="listitem" v-for="(item, index) in list" :key="index">
              <Card :imgUrl="item.imgUrl" :name="item.name" :NFTInfo="item" />
            </div>
          </div>
          <div v-else class="empty">This is empty, please create NFTs !</div>
        </div>
      </div>
      <div class="right">
        <CreateNFT></CreateNFT>
      </div>
    </div>

  </div>
</template>

<script>

import { uploadImage, getNftImg } from "/src/api/image"
import CreateNFT from "./createNFT";
import Card from "../components/workCard/card.vue";
import { getMyCardList, createInfo, getUserInfo, updateUser } from "@/api/home";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'convert',
  components: { CreateNFT, Card },
  data() {
    return {
      uploadedImageHash: '',//默认的图片,
      list: [],
      isShowLoading: false

    }

  },
  filters: {

  },
  async mounted() {
    // 获取列表
    await this.getMyList("origin_1170-1");
  },
  methods: {

    async getMyList(selectChain) {
      debugger
      console.log(selectChain)
      this.isShowLoading = true;
      let params = {
        //this.$store.state.uptickAddress,this.$store.state.IrisAddress
        owner:
          selectChain == "origin_1170-1"
            ? this.$store.state.UptickAddress
            : this.$store.state.IrisAddress,
        chainType: selectChain,
        // type:this.filterList[this.filterIndex].id
      };

      let listInfo = await getMyCardList(
        params
      );
      // this.list = listInfo.data.list;
      this.list = this.list.concat(listInfo.data.list)
      this.list = this.list.concat(listInfo.data.list)
      this.list = this.list.concat(listInfo.data.list)
      this.list = this.list.concat(listInfo.data.list)
      this.list = this.list.concat(listInfo.data.list)
      this.list = this.list.concat(listInfo.data.list)
      this.list = this.list.concat(listInfo.data.list)
      this.list = this.list.concat(listInfo.data.list)
      this.list = this.list.concat(listInfo.data.list)
      this.list = this.list.concat(listInfo.data.list)
      this.list = this.list.concat(listInfo.data.list)
      this.list = this.list.concat(listInfo.data.list)
      this.list = this.list.concat(listInfo.data.list)
      this.list = this.list.concat(listInfo.data.list)
      // this.list = this.list.concat(listInfo.data.list)
      // this.list = this.list.concat(listInfo.data.list)
      // this.list = this.list.concat(listInfo.data.list)
      // this.list = this.list.concat(listInfo.data.list)
      // this.list = this.list.concat(listInfo.data.list)

      // this.list = [this.list[1]]

      this.isShowLoading = false;
      console.log("ssss", this.list);
    },
    loadeImageUrl(hash) {
      return getNftImg(hash)
    },

  },

}

</script>
<style lang='scss' scoped>
.Home {
  // background-color: green;
  // width: 100%;
  // height: 100px;
  position: relative;

}

.hearder {
  background-color: #1e0826;
  height: 75px;
  margin: auto 0;

  .Title {
    // padding-top: 10px;
    font-family: AvenirNext-Bold;
    font-size: 32px;
    font-weight: bold;
    font-stretch: normal;
    // line-height: 30px;
    // letter-spacing: 0px;
    color: #ffffff;

    span {
      color: #ed0091;
    }
  }

  .address {
    font-family: AvenirNext-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ffffff;
  }

  .disconnect {
    width: 98px;
    height: 31px;
    border-radius: 15px;
    border: solid 1px #ed0091;
    font-family: AvenirNext-Bold;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ffffff;
  }
}

.content {
  // background-color: #ffffff;
  height: 811px;

  .left {
    flex-grow: 1;

    position: relative;
    // background-color: #ed0091;
    height: 100%;
    width: 100px;

    .top {
      height: 50px;
      // background-color: green;
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;

      .leftButton {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 31px;
        border-radius: 15px;
        border: solid 1px #ed0091;
        font-family: AvenirNext-Bold !important;
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }

      .create {
        margin-right: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 111px;
        height: 31px;
        background-color: #ed0091;
        border-radius: 15px;
        font-family: AvenirNext-Bold !important;
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }

  .list {
    margin-top: 60px;
    // background-color: yellow;
    // position: relative;

    .Cardlist {
      height: 751px;
      overflow-y: auto;

      .listitem {
        width: calc(20% - 10px);
        // height: 125px;
        padding: 10px;
      }
 
    }

    .empty {
      height: 751px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "AmpleSoft" !important;
      color: #ffffff;
    }
  }

  .right {
    width: 450px;
    height: 100%;
    background-color: #1e0826;
  }

}
</style>