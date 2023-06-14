<template>
  <div class="Home">
    <div class="hearder d-flex flex-row justify-space-between align-center">
      <div class="Title">Uptick-<span>EVM</span> NFT</div>
      <div class="d-flex flex-row align-center">
        <div class="address">{{ evmAddress }}</div>
        <button class="disconnect ml-4" @click="disconnect">Disconnect</button>
      </div>
    </div>
    <div class="content d-flex flex-row justify-space-between align-center">
      <div class="left">
        <div class="top d-flex flex-row justify-space-between align-center">
          <div class="d-flex flex-row justify-space-between align-center">
            <div class="leftButton" style="margin-right: 10px;" @click="switchButton">
              Switch to Uptick-COSMOS >
            </div>
            <div class="leftButton" @click="crossButtonRecord">
              Cross-chain record
            </div>
          </div>
          <div class="create" @click="showCreate">
            Create
          </div>
        </div>
        <div class="list">
          <div class="Cardlist d-flex align-content-start flex-wrap" v-if="list.length > 0">
            <div class="listitem" v-for="(item, index) in list" :key="index">
              <Card :selectedId="selectItem.id" :imgUrl="item.imgUrl" :name="item.name" :NFTInfo="item"
                @click:item="onClickItem" />
            </div>
          </div>
          <div v-else class="empty">This is empty, please create NFTs !</div>
        </div>
      </div>
      <div class="right">
        <CreateNFT v-if="isShowCreate" @reload:data="reladData"></CreateNFT>
        <ConvertCosmoss v-if="!isShowCreate" :NFTInfo="selectItem" @cross:showpop="crossShowPop"></ConvertCosmoss>
      </div>
      <!-- <button @click="showPopup">弹出窗口</button> -->
      <popup :visible.sync="popupVisible"
        title="Cross chain conversion completed, switch to Uptick - COSMOS chain for cross chain operation"
        @reload:data="reladData" @submit:popup="submitPopup">
      </popup>
    </div>

  </div>
</template>

<script>

import { getNftImg } from "/src/api/image"
import CreateNFT from "./createNFT";
import ConvertCosmoss from "./convertCosmoss";
import Card from "../components/workCard/card.vue";
import { getMyCardList, updateUser } from "@/api/home";
import Popup from './popup';
import { getEvmAddress } from "/src/keplr/uptick/wallet"


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'convert',
  components: { CreateNFT, ConvertCosmoss, Card, Popup },
  data() {
    return {
      list: [],
      isShowLoading: false,
      isShowCreate: true,
      selectItem: {},
      popupVisible: false,
      evmAddress: "",
      chainType: "1170"
    }

  },
  filters: {

  },
  async mounted() {

    let uptickAddress = this.$store.state.UptickAddress
    console.log(uptickAddress)
    if (uptickAddress == "") {
      this.$router.push({ name: "Home" });
      return
    }

    // 获取列表
    let params = {
      owner: this.$store.state.UptickAddress,
      chainType: this.chainType,
    };
    let result = await updateUser(params)
    console.log(result)

    this.evmAddress = getEvmAddress(uptickAddress)
    // 获取列表
    await this.getMyList();
  },
  methods: {
    disconnect() {
      localStorage.clear();
      this.$store.commit("SET_DID", "");
      this.$store.commit("SET_UPTICK_DID", "");
      this.$router.push({ name: "Home" });
    },
    async reladData() {
      console.log("reloadData")
      await this.getMyList();
    },
    submitPopup() {
      this.$router.push({ name: "cosmos" });
    },
    crossShowPop() {
      this.popupVisible = true
    },
    crossHidePop() {
      this.popupVisible = false
    },
    showPopup() {
      this.popupVisible = true;
    },
    switchButton() {
      // this.$router.push({ name: "chainCross" });
      this.$router.push({ name: "cosmos" });
    },
    crossButtonRecord() {
      let url = "https://explorer.gon.upticknft.app/?address=" + this.$store.state.UptickAddress
      window.open(url, '_blank')
    },

    onClickItem(item) {
      console.log(item)
      this.isShowCreate = false
      this.selectItem = item
    },
    showCreate() {
      this.selectItem = {}
      this.isShowCreate = true
    },
    async getMyList(selectChain) {
      debugger
      console.log(selectChain)
      this.isShowLoading = true;
      let params = {
        //this.$store.state.uptickAddress,this.$store.state.IrisAddress
        owner: this.evmAddress,
        chainType: this.chainType,
        // type:this.filterList[this.filterIndex].id
      };

      let listInfo = await getMyCardList(
        params
      );
      this.list = listInfo.data.list;
      if (this.list.length > 0) {
        this.isShowCreate = false
        this.selectItem = this.list[0]
      } else {
        this.isShowCreate = true
      }
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
        cursor: pointer;

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
        cursor: pointer;

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
      font-family: "AvenirNext-Regular" !important;
      color: #ffffff;
    }
  }

  .right {
    width: 450px;
    height: 100%;
    background-color: #1e0826;
  }

  /* 隐藏滚动条 */
  ::-webkit-scrollbar {
    display: none;
  }

}
</style>