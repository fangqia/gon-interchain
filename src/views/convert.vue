<template>
  <div class="Home ">
      <div class="hearder d-flex flex-row justify-space-between align-center">
           <div class="Title">Interchain Marketplace <span>Uptick-EVM</span></div>
           <div class="d-flex flex-row align-center">
                <div class="address">0xsd72093836jsis7w8ekxd83kw0ddrsdwd456</div>
           <button class="disconnect ml-4">Disconnect</button>
           </div>    
      </div>
      <div class="content">
          <div class="List"></div>
          <div class="detail"></div>
      </div>
   
  </div>
</template>

<script>


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'convert',
  components: {  },
  data() {
    return {
      
    }

  },
  filters: {

  },
  async mounted() {

  },
  methods: {
       

  },

}

</script>
<style lang='scss' scoped>
.hearder{
    .Title {
  font-family: AvenirNext-Bold;
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #ffffff;
  span{
    color: #ed0091;
  }
}
.address{
   font-family: AvenirNext-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 20px;
	letter-spacing: 0px;
	color: #ffffff; 
}
.disconnect{
    width: 98px;
	height: 31px;
	border-radius: 15px;
	border: solid 1px #ed0091;
    opacity: 0.5;
    font-family: AvenirNext-Bold;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 20px;
	letter-spacing: 0px;
	color: #ffffff;
}
}

.content{
    .list{

    }
    .detail{
        
    }

}

</style>
