<template>
  <div>
    <div class="work d-flex  flex-column">
      <img class="mainImg" :class="{ 'selected': selectedId === NFTInfo.id }" :src="imgUrl" @click="imgClick"
        style="cursor: pointer;border-radius: 5px 5px 5px 5px;" :style="{ height: height + 'px' }">
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
    selectedId: Number,
    NFTInfo: Object

  },
  data() {
    return {
      height: 125,
      isActive: true
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
      this.$emit('click:item', this.NFTInfo)
    },
  },
};
</script>

<style lang="scss" scoped>
.work {
  overflow: hidden;


  .mainImg {
    transition: all .1s ease .1s;
    object-fit: cover;
    // height: 125px;
  }


  .mainImg.selected {
    background-color: green;
    background-color: #ed0091;
    border-radius: 5px;
    border: solid 2px #ea0091;
    opacity: 0.8;
  }

  .mainImg:hover {
    // transform: scale(1.1);
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