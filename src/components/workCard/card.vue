<template>
  <div>
    <div class="work d-flex  flex-column">
      <img class="mainImg" :src="imgUrl" @click="imgClick" style="cursor: pointer;border-radius: 5px 5px 5px 5px;"
        :style="{ height: height + 'px' }">
    </div>
    <div class="content">
      <div class="name">{{ name }}</div>

    </div>
  </div>
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
  data() {
    return {
      height: 125
    }

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.setHeight()
  },
  methods: {
    setHeight() {
      const img = document.querySelector('.mainImg');
      const width = img.offsetWidth;
      this.height = width
    },
    handleResize() {
      // 处理屏幕变化事件
      this.setHeight()
    },
    imgClick() {
      this.$router.push({ name: 'cardDetail', query: { nftAddress: this.NFTInfo.nftAddress, nftId: this.NFTInfo.nftId, owner: this.NFTInfo.owner } })
    },
  },
};
</script>

<style lang="scss" scoped>
.work {
  overflow: hidden;

  .mainImg {
    transition: all .5s ease .1s;
    object-fit: cover;
    // height: 125px;
  }

  .mainImg:hover {
    transform: scale(1.1);
    // transform: translate(0px, 0px) scale(2) rotate(0deg);  
  }
}

.content {
  height: 25px;

  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: AvenirNext-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    padding-top: 5px;
  }
}
</style>