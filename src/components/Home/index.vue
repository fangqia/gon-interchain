<template>
  <div class="Home">
    <div class="hearder d-flex flex-row justify-space-between align-center">
      <div class="Title">Uptick-<span>EVM</span> NFT</div>
    </div>
    <div class="btn">
      <button class="wallet" @click="connectWallet">Connect Wallet</button>
    </div>
  </div>
</template>

<script>

import {
  getkeplrIrisAddress,
  getkeplrUptickAddress,
  initWallet,
} from "../../keplr/index";

import { wallet as evmWallet } from "@/metaMask";
import { getMatamaskWeb3 } from "@/metaMask/wallet";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {},
  data() {
    return {

    }

  },
  filters: {

  },
  async mounted() {

    initWallet();


  },
  methods: {
    async connectWallet() {

      // Iris Address
      let account = await getkeplrIrisAddress();
      let evmAccount = await getMatamaskWeb3();
      debugger
      this.$store.commit("SET_DID", account.toLowerCase());
      // uptick Address
      let uptickAccount = await getkeplrUptickAddress();
      this.$store.commit("SET_UPTICK_DID", uptickAccount.toLowerCase());
      if (account && uptickAccount) {
        this.$router.push({ name: "evm" });
      }
    },

    // async getMatamaskWeb3(){
    //   let account = await evmWallet().getAccountInfo();
    //   let address = await account.getAddress();
    //   return address;
    // },
  },

}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.hearder {
  background-color: #1e0826;
  height: 75px;
  margin: auto 0;

  .Title {

    font-family: AvenirNext-Bold;
    font-size: 32px;
    font-weight: bold;
    font-stretch: normal;
    // line-height: 30px;
    letter-spacing: 0px;
    color: #ffffff;

    span {
      color: #ed0091;
    }
  }

}


.btn {
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;

  .wallet {
    width: 376px;
    height: 61px;
    background-color: #ed0091;
    border-radius: 29px;
    font-family: "MuseoModerno-SemiBold";
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ffffff;
  }
}
</style>
