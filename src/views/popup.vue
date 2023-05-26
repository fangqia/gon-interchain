<template>
  <div>
    <div class="mask" v-show="visible"></div>
    <div class="popup" v-show="visible">
      <div class="tips" style="color: black;">
        Cross chain conversion completed, switch to Uptick - COSMOS chain for cross chain operation
      </div>
      <div class="bottom">
        <button class="cancellationBtn" @click="closePopup">
          <div>
            {{ buttonText }}
          </div>
        </button>
        <button class="confirmBtn" @click="submitButton">
          <div>
            Confirm
          </div>
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCountingDown: false,
      countdownSeconds: 3,
    }
  },
  computed: {
    buttonText() {
      if (this.isCountingDown) {
        return `${this.countdownSeconds}`;
      } else {
        return 'Cancellation';
      }
    }
  },
  methods: {
    closePopup() {
      if (!this.isCountingDown) {
        this.isCountingDown = true;
        let countdownInterval = setInterval(() => {
          this.countdownSeconds--;
          if (this.countdownSeconds === 0) {
            clearInterval(countdownInterval);
            this.isCountingDown = false;
            this.countdownSeconds = 3;
            this.$emit('update:visible', false);
            this.$emit('reload:data');
          }
        }, 1000);
      }
    },
    submitButton() {
      this.$router.push({ name: "cosmos" });
    }
  }
}
</script>

<style lang='scss' scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 1000;

  width: 451px;
  height: 196px;
  background-color: #ffffff;
  border-radius: 5px;

  .tips {
    // width: 353px;
    // height: 36px;
    font-family: AvenirNext-Bold;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    // line-height: 40px;
    letter-spacing: 0px;
    color: #000000;
    text-align: center;
    // background-color: green;
    padding-top: 50px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
    text-align: left;

  }

  .bottom {
    display: flex;
    justify-content: space-between;

    height: 40px;
    padding-left: 30px;
    padding-right: 30px;

    .cancellationBtn {
      width: 160px;
      height: 40px;
      border-radius: 20px;
      border: solid 2px #ed0091;

      font-family: AvenirNext-Bold;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ed0091;
    }

    .confirmBtn {
      width: 161px;
      height: 40px;
      background-color: #ed0091;
      border-radius: 20px;

      font-family: AvenirNext-Bold;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }

}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
