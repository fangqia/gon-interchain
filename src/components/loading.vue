<template>
   <div :class="{ contain: true, mobile: isMobile }">
      <div v-if="isShowLoading" class="load py-lg-16 d-flex flex-column">
         <img src="@/assets/loading.gif" alt=""/>
         <div>Loading...</div>
      </div>
   </div>
</template>

<script>
  export default {
    name: "loading.vue",
    props: {
      isShowLoading: {
        type: Boolean
      },
    
    },
    data: () => ({}),
    computed: {
      isMobile: function() {
        return this.$vuetify.breakpoint.mobile;
      }
    }
  };
</script>

<style lang="scss" scoped>
   .contain {
      .load {
         width: 100px;
         height: 100px;
         background-color: #1e0826;
         border-radius: 10px;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         display: flex;
         justify-content: center;

         img {
            margin: 0 auto;
            width: 42px;
            height: 42px;
         }

         div {
            margin-top: 10px;
            text-align: center;
            color: white;
         }
      }
   }

</style>
