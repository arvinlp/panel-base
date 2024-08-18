<template>
  <b-container class="login h-100" fluid>
    <b-row align-h="center" align-v="center" class="h-100">
      <b-col cols="12" md="4">
        <b-card title="ورود به پرتال">
          <b-card-body>
            <b-form @submit="onSubmit" @reset="onReset">
              <b-form-group id="input-group-1" label="موبایل" label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model="form.mobile"
                  type="tel"
                  placeholder="09*********"
                  :disabled="formType == 'code' ? true : false"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="کد احراز"
                label-for="input-2"
                :description="btnResendText"
                v-if="formType == 'code'"
              >
                <CodeInput
                  :fields="5"
                  :loading="false"
                  class="input"
                  v-on:change="onChange"
                  v-on:complete="onComplete"
                />
              </b-form-group>
              <b-form-group
                id="input-group-3"
                label="کد احراز"
                label-for="input-3"
                description="گذرواژه خود را وارد نمایید."
                v-if="formType == 'password'"
              >
                <b-form-input
                  id="input-3"
                  v-model="form.password"
                  type="password"
                  placeholder="********"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-4" v-if="formType != 'code'">
                <b-form-radio-group v-model="formType" id="radio-4">
                  <b-form-radio value="verify">ورود با کد احراز</b-form-radio>
                  <b-form-radio value="password">ورود با گذرواژه</b-form-radio>
                </b-form-radio-group>
              </b-form-group>

              <b-container fluid>
                <b-row>
                  <b-col class="text-center" v-if="formType == 'verify'">
                    <b-button type="submit" variant="primary">{{ btnSubmit }}</b-button>
                  </b-col>
                  <b-col class="text-center" v-if="formType == 'password'">
                    <b-button type="submit" variant="primary">{{ btnLogin }}</b-button>
                  </b-col>
                  <b-col class="text-center" v-if="formType == 'code'">
                    <b-button type="submit" variant="primary">{{ btnLogin }}</b-button>
                  </b-col>
                </b-row>
                <b-row v-if="formType == 'code'">
                  <b-col class="text-center mt-3">
                    <b-button
                      type="reset"
                      size="sm"
                      :disabled="btnResendDisabled"
                      variant="danger"
                      >{{ btnResend }}</b-button
                    >
                  </b-col>
                </b-row>
              </b-container>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CodeInput from "vue-verification-code-input";
export default {
  name: "Home",
  data() {
    return {
      form: {},
      btnSubmit: "دریافت کد ورود",
      btnLogin: "ورود",
      btnResend: "دریافت مجدد کد",
      btnResendText: "کد پیامک شده را لطفا وارد نمایید.",
      formType: "verify",
      countDown: 30,
      btnResendDisabled: true,
      requestCode: 2,
    };
  },
  components: {
    CodeInput,
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      if (this.$store.getters.expiresIn > new Date().getTime()) {
        this.$router.push(this.$route.query.redirect || "home");
      }
    }
  },
  updated() {
    if (this.$store.getters.isAuthenticated) {
      if (this.$store.getters.expiresIn > new Date().getTime()) {
        this.$router.push(this.$route.query.redirect || "home");
      }
    }
  },
  beforeCreate() {
    if (this.$store.getters.isAuthenticated) {
      if (this.$store.getters.expiresIn > new Date().getTime()) {
        this.$router.push(this.$route.query.redirect || "home");
      }
    }
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.btnResendText =
            "زمان باقی مانده تا درخواست مجدد کد : " + this.countDown + " ثانیه";
          this.countDownTimer();
        }, 1000);
      } else {
        this.btnResendDisabled = false;
        this.btnResendText = "کد پیامک شده را لطفا وارد نمایید.";
      }
    },
    onChange(v) {
      this.form.code = v;
    },
    onComplete(v) {
      this.form.code = v;
    },
    onSubmit(evt) {
      evt.preventDefault();
      var send = {};
      switch (this.formType) {
        case "password":
          send.mobile = this.form.mobile;
          send.password = this.form.password;
          break;
        case "verify":
          send.mobile = this.form.mobile;
          break;
        case "code":
          send.mobile = this.form.mobile;
          send.code = this.form.code;
          break;
      }
      let promise = this.$http.post(this.$api("login"), this.form);
      promise
        .then((response) => {
          if (this.formType == "password" || this.formType == "code") {
            this.$store.dispatch("login", response.data);
            this.$http.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.access_token;
            this.$notify({
              group: "top",
              text: "وارد شدید.",
              type: "success",
              duration: 10000,
            });
            this.$router.push(this.$route.query.redirect || { name: "home" });
          }
          if (this.formType == "verify") {
            this.formType = "code";
            this.countDownTimer();
            this.$notify({
              group: "top",
              text: "کد احراز هویت پیامک شد.",
              type: "warn",
              duration: 10000,
            });
          }
          return response;
        })
        .catch((error) => {
          if (error.response.data.code > 0) {
            this.$notify({
              group: "right",
              text: error.response.data.message,
              type: "error",
              duration: 10000,
            });
          }
          return error;
        });
    },
    onReset(evt) {
      evt.preventDefault();
      let promise = this.$http.post(this.$api("login"), this.form);
      promise
        .then((response) => {
          if (response.data.access_token != undefined) {
            alert("Error");
          } else {
            this.formType = "code";
            this.countDown = 30 * this.requestCode;
            this.requestCode += 1;
            this.btnResendDisabled = true;
            this.countDownTimer();
          }
          return response;
        })
        .catch((error) => {
          if (error.response.data.code > 0) {
            this.$notify({
              group: "right",
              text: error.response.data.message,
              type: "error",
              duration: 10000,
            });
          }
          return error;
        });
    },
  },
};
</script>
