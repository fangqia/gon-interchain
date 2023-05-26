<template>
  <v-card style="background-color:#00043a">
    <div class="work d-flex  flex-column">
      <img class="mainImg" :src="imgUrl" @click="imgClick"
        style="cursor: pointer;border-radius: 5px 5px 0px 0px;height:180px">
    </div>
    <div class="content">
      <div class="name">{{ name }}</div>

    </div>
  </v-card>
</template>

<script>


export default {
  name: "Work",
  inheritAttrs: false,
  props: {
    imgUrl: String,
    name: String,
    NFTInfo: Object

  },
  data: () => ({




  }),
  // watch: {
  //   hash: {
  //     handler: async function (hash) {
  //       if (!hash) {
  //        hash = "98A323F388E1D9456F0B0AA25B75DCC54BC6836D8BBB565DF12192C50AF5C649"
  //       }
  //        this.src = await getNftImg( hash);

  //     },
  //     immediate: true,
  //   },
  // },
  mounted() {


  },
  methods: {
    imgClick() {
      this.$router.push({ name: 'cardDetail', query: { nftAddress: this.NFTInfo.nftAddress, nftId: this.NFTInfo.nftId, owner: this.NFTInfo.owner } })
    },
  },
};
</script>

<style lang="scss" scoped>
.work {
  // height: 212px;
  // height: calc(20% + 100px);
  // height: 100%;

  .mainImg {
    transition: all .5s ease .1s;
    object-fit: cover;
    // height: 235px;
  }

  overflow: hidden;

  .mainImg:hover {
    transform: scale(1.1);
    // transform: translate(0px, 0px) scale(2) rotate(0deg);  
  }

  .video {
    .icons {
      position: absolute;
      left: 10px;
      bottom: 5px;
    }

  }


}

.content {
  height: 25px;

  .name {
    font-family: "AmpleSoft";
    font-size: 15px !important;
    font-weight: normal;
    font-stretch: normal;
    // line-height: 70px;
    letter-spacing: 0px;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bold {
    font-family: "AmpleSoft-Bold";
  }
}
</style>