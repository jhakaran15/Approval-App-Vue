<template>
  <div
    class="col-lg-6 col-md-6 col-sm-10 col-xs-10"
    style="
      box-shadow: 1px 3px 9px rgb(124, 123, 123);
      margin: 15px 5px 15px 5px;
    "
  >
    <q-card
      class="card-body"
      style="
        background: radial-gradient(circle, white 0%, #f5f5f5 100%);
        margin-top: 0;
      "
    >
      <div
        class="container height-100 d-flex justify-content-center align-items-center"
      >
        <div class="position-relative" style="padding-top: 100px">
          <div class="card p-2 text-center" style="height: 480px">
            <h6>Please enter the Passcode</h6>
            <div
              style="
                position: relative;
                margin-top: -60px;
                padding-bottom: 47px;
                bottom: 20px;
              "
            >
              <span>A code has been sent to</span>
              <small>*******@nimble.expert</small>
            </div>
            <div class="row">
              <div class="col-lg-3 col-md-3 col-sm-1 col-xs-1"></div>
              <div class="col-lg-6 col-md-6 col-sm-10 col-xs-10">
                <vue-otp-2
                  class="otp-input"
                  length="5"
                  join-character=""
                  inputmode="numeric"
                  pattern="[0-9]*"
                  @onChange="onChange"
                  @onComplete="onComplete"
                />
                <div
                  v-if="otpNotGiven"
                  style="color: red; font-size: 12px; margin-left: 23px"
                >
                  OTP is required
                </div>
                <div class="mt-4" style="padding-top: 60px">
                  <button class="btn submit" @click="submitOtp">Verify</button>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-1 col-xs-1"></div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.state.UserGuid = this.$route.params.id;
  },

  components: {},
  computed: {},
  data() {
    return {
      otpNotGiven: false,
      approvalOtp: "",
    };
  },
  methods: {
    onChange(value) {
      console.log("ENTER_NUMBER", value);
    },
    onComplete(value) {
      console.log("COMPLETED_NUMBER", value);
      let inputArray = value.join("");
      this.approvalOtp = inputArray;
      console.log("checking Input ArrayToString data", inputArray);
    },
    submitOtp() {
      console.log("checking OTP data", this.approvalOtp);

      if (this.approvalOtp == "") {
        this.otpNotGiven = true;
        return;
      }
      this.$store.dispatch("submitOtpData", {
        this: this,
        approvedOtpData: this.approvalOtp,
      });
    },
  },
};
</script>

<style scoped lang="scss">
* {
  background-color: #d1d1d1;
  font-family: "Montserrat", sans-serif, Arial, Helvetica;
}
.card h6 {
  color: black;
  font-size: 45px;
}
.otp-input {
  margin: 10px;
  padding: 0 35px;
}
.card-body {
  box-shadow: 1px 3px 9px rgb(124, 123, 123);
  position: relative;
  margin-top: 30px;
}
.submit {
  border-radius: 20px;
  height: 50px;
  background-color: #2c3e50;
  border: 1px solid #2c3e50;
  width: 180px;
  cursor: pointer;
  color: #fff;
  outline: none;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>
