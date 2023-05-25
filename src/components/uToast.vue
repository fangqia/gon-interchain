<template>
    <v-snackbar v-model="snackbarObj.isShow" :color="snackbarObj.color" centered :timeout="snackbarObj.timer"
        style="opacity: 1">
        <span style="color: white; font-size: 20px">{{ snackbarObj.title }}</span>
    </v-snackbar>
</template>

<script>
export default {
    data() {
        return {
            snackbarObj: { isShow: false, color: "success", timer: 3000, title: "" }
        }
    },
    methods: {
        show(type, txt, timer = 3000) {
            this.snackbarObj = {
                isShow: true,
                color: type,
                timer: timer,
                title: txt
            };
            return new Promise(function (resolve) {
                setTimeout(() => {
                    resolve(true);
                }, timer + 300);
            });
        }
    },
}
</script>

<style lang="scss" scoped></style>
