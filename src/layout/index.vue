<template>
    <v-app class="top">
        <div class="topBg"></div>
        <v-main class="main">
            <v-container :id="containerId" class="content">
                <router-view :key="key"></router-view>
            </v-container>
        </v-main>

    </v-app>
</template>

<script>
export default {
    name: 'MyLayout',
    components: {

    },
    data: function () {
        return {
            drawerOpened: false,
            containerId: 'container'
        };
    },

    computed: {
        key() {
            return this.$route.name !== undefined ?
                this.$route.name + new Date() :
                this.$route + new Date();
        },

    },

};
</script>

<style lang="scss" scoped>
.top {
    background-image: url('../assets/bg.jpg');
    background-repeat: no-repeat;
    background-size: 150px 80px;
    background-size: 100% 100%;
    background-attachment: fixed;
    position: relative;

    .topBg {
        background-color: #1e0826;
        height: 75px;
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
    }

}

.content {
    margin: 0 auto;
    // margin-top: 0px;
    padding: 0;
    width: calc(100% - 40px);
    min-height: 550px;

}
</style>


