<template>
    <div class="content">
        <transition name="slide-fade" v-for="item in tips" :key="item.index">
            <div class="tip" v-if="item.isShow">
                <div class="cont">
                    <div class="title">{{ item.data.title }}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
let tip_idx = 0;

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Popup',
    data() {
        return {
            data: {
                title: ''
            },
            tips: [],
        }
    },
    created() { },
    methods: {
        show(opt) {
            let dt = {};

            if (typeof (opt) == 'number') {
                dt = this.data[opt];
            } else if (typeof (opt) == 'object') {
                dt = opt;
            } else {
                throw "参数类型错误";
            }
            let tip = {
                index: tip_idx,
                isShow: true,
                data: dt
            };
            console.log(225, tip);
            this.tips.push(tip);
            tip_idx++;

            this.closeTip(tip);
        },
        close_click(idx) {
            let fd = this.tips.find(f => f.index == idx);
            fd.isShow = false;

            clearTimeout(fd["time_" + idx]);

            console.log(222, idx, fd);
            // let fi = this.tips.findIndex(f => f.index==idx);
            // this.tips.splice(fi, 1);
        },
        closeTip(opt) {
            opt["time_" + opt.index] = setTimeout(() => {
                this.close_click(opt.index);
            }, 5000);
        }
    },
}
</script>

<style lang="scss" scoped>
.content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 340px;
    z-index: 99999;
    pointer-events: none;

    .tip {
        padding: 10px 0;
        margin: 10px;
        background-color: #fb599b;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        position: relative;
        pointer-events: auto;

        .close {
            margin: 20px 20px;
            position: absolute;
            left: 283px;
            top: -28px;
            color: white;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 13px;
            cursor: pointer;
        }

        .cont {
            width: 77%;

            .title {
                text-align: center;
                margin-left: -10px;
                width: 255px;
                min-height: 35px;
                font-size: 15px;
                font-weight: bold;
                font-family: Helvetica;
                color: #FFFFFF;
                line-height: 20px;
                //white-space:nowrap;

                margin-top: 15px;
                margin-bottom: 10px;

            }

            .text {
                color: #FFFFFF;
            }
        }
    }
}

/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
    transition: all .30s ease;
}

.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
    opacity: 0;
}
</style>
