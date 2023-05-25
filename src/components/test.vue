<template>
  <div class="test">
   
    <!-- <div class="text d-flex flex-column">
    
    </div> -->
    <div class="cardlist d-flex flex-wrap" >
      <div class="listItem" v-for="(item,index) in Marketlist" :key="index">
          <Card :src ='item.src' />
      </div>

    </div>

  </div>
</template>

<script>
import {initWallet  } from "../keplr/index";
import Card from "./workCard/card";
export default {
  name: 'MyTest',
  components:{Card},
  data(){
    return{
      Marketlist:[
        {src:'https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small'},
        {src:'https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small'},
        {src:'https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small'},
        {src:'https://d3i65oqeoaoxhj.cloudfront.net/QmX7hdHu2wAEjpTPbYvRDccfizJFKCHV1hz4mf6TiGeeeQ/small'},

      ]
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='scss' scoped>
    .test{
       height: 600px;
       .text{
           width: 100%;
           height: 100px;
           background: hotpink;
           color:blue;
           position: absolute;
           bottom: 0px;
       }
    }
</style>
