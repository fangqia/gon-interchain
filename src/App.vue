<template>

    <Layout />
</template>

<script>
import Layout from './layout/index'
global.Buffer = global.Buffer || require('buffer').Buffer;
export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style>
 
 ::-webkit-scrollbar {
    display: none;
  }
</style>
