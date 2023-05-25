<template>
    <div>
       
        <uToast ref="toast"></uToast>
    </div>
</template>

<script>

    export default {
        components: {   },
        methods: {
            toast(type, txt, timer) {
                return this.$refs.toast.show(type, txt, timer);
            },
            confirm(txt, ps) {
                this.$refs.confirm.show(txt, ps);
            }
        },
    }
</script>

<style lang="scss">
</style>
