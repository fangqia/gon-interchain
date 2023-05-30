<template>
  <div class="Home">
    <div class="hearder d-flex flex-row justify-space-between align-center">
      <div class="Title">Uptick-<span>COSMOS</span> NFT</div>
      <div class="d-flex flex-row align-center">
        <div class="address">{{ uptickAddress }}</div>
        <button class="disconnect ml-4" @click="disconnect">Disconnect</button>
      </div>
    </div>
    <div class="content d-flex flex-row justify-space-between align-center">
      <div class="left">
        <div class="top d-flex flex-row justify-space-between align-center">
          <div class="d-flex flex-row justify-space-between align-center">
            <div class="leftTitle">
              Cross-chain transfer
            </div>
            <div class="leftButton" style="margin-right: 10px;" @click="switchButton">
              Switch to Uptick-EVM >
            </div>
          </div>
          <!-- <div class="create">
            Create
          </div> -->
        </div>
        <div class="list">
          <div class="Cardlist d-flex align-content-start flex-wrap" v-if="list.length > 0">
            <div class="listitem" v-for="(item, index) in list" :key="index">
              <Card :selectedId="selectItem.id" :imgUrl="item.imgUrl" :name="item.name" :NFTInfo="item" @click:item="onClickItem"/>
            </div>
          </div>
          <div v-else class="empty">This is empty, please create NFTs !</div>
        </div>
      </div>
      <div class="right">
        <CosmosCross :NFTInfo="selectItem" @withdraw:showpop="withdrawShowPop" @crossIris:showpop="crossIrisShowPop"></CosmosCross>
      </div>
      <popup :visible.sync="popupVisible"
        title=""
        @reload:data="reladData" @submit:popup="submitPopup">
      </popup>
    </div>

  </div>
</template>

<script>

import { getNftImg } from "/src/api/image"
import CosmosCross from "./cosmosCorss";
import Card from "../components/workCard/card.vue";
import { getMyCardList } from "@/api/home";
import Popup from './popup';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'convert',
  components: { CosmosCross, Card },
  data() {
    return {
      uploadedImageHash: '',//默认的图片,
      list: [],
      isShowLoading: false,
      selectItem: {},
      cardClass: "listitem",
      popupVisible: false,
      uptickAddress: "",
      title: ""
    }

  },
  filters: {

  },
  async mounted() {
    this.uptickAddress = this.$store.state.UptickAddress
    console.log(this.uptickAddress)
    if (this.uptickAddress == "") {
      this.$router.push({ name: "Home" });
      return
    }

    // 获取列表
    await this.getMyList("origin_1170-1");
  },
  methods: {
    disconnect() {
      localStorage.clear();
      this.$store.commit("SET_DID", "");
      this.$store.commit("SET_UPTICK_DID", "");
      this.$router.push({ name: "Home" });
    },
    withdrawShowPop() {
      this.popupVisible = true
      this.title = "Cross chain conversion completed, switch to Uptick - EVM chain for cross chain operation"
    },
    crossIrisShowPop() {
      this.popupVisible = true
      this.title = "Cross chain to IRIS completed"
    },
    async reladData() {
      console.log("reloadData")
      await this.getMyList("origin_1170-1");
    },
    submitPopup() {
      this.$router.push({ name: "evm" });
    },
    switchButton() {
      this.$router.push({ name: "evm" });
    },
    onClickItem(item) {
      console.log(item.name)
      this.selectItem = item
    },
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
      this.list = listInfo.data.list;
      this.selectItem = this.list[0]
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
      color: #b82fff;
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
        cursor: pointer;
      }

      .leftTitle {
        // width: 203px;
        // height: 18px;
        font-family: AvenirNext-Regular;
        font-size: 23px;
        font-weight: normal;
        font-stretch: normal;
        // line-height: 70px;
        letter-spacing: 0px;
        color: #ffffff;
        padding-right: 20px;
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