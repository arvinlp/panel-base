<template>
  <b-row>
    <b-col cols="12">
      <b-card :title="title" :sub-title="description">
        <b-card-body>
          <b-form @submit="onSubmit">
            <b-row align-v="center">
              <b-col cols="12">
                <b-row align-v="center" class="my-1">
                  <b-col cols="1">
                    <label for="name">نام :</label>
                  </b-col>
                  <b-col cols="11">
                    <b-form-input
                      id="name"
                      v-model="form.name"
                      placeholder="نام را وارد نمایید."
                    ></b-form-input>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <hr />
            <b-row align-v="center" class="mt-2">
              <b-col cols="12" md="6">
                <b-button variant="outline-primary" size="sm" type="submit">
                  ثبت و ذخیره
                </b-button>
              </b-col>
              <b-col cols="12" md="6" class="text-md-left">
                <b-button variant="danger" size="sm" :to="parentRoute">بازگشت</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      title: "افزودن سطح دسترسی جدید",
      description: null,
      isLoading: false,
      form: {},
      apiUrl: "panel/users/roles",
      parentRoute: { name: "roles" },
    };
  },
  components: {},
  mounted() {
    if (this.$route.params.id) {
      this.getData();
    }
  },
  methods: {
    getRoleIds() {
      let promise = this.$http.get(this.$api("panel/users/roles/all"));

      return promise
        .then((response) => {
          this.role_ids = response.data;
          if (this.form.role == "user") {
            this.role_id = this.role_ids.find((item) => item.id == this.form.role_id);
          }
          return response.data;
        })
        .catch((error) => {
          this.role_ids = [{ id: 0, name: "-----" }];
          return error;
        });
    },
    getData() {
      let promise = this.$http.get(this.$api(this.apiUrl + "/" + this.$route.params.id));
      return promise
        .then((response) => {
          this.form = response.data;
          return response.data;
        })
        .catch((error) => {
          return error;
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      var promise = null;
      if (this.$route.params.id) {
        promise = this.$http.put(
          this.$api(this.apiUrl + "/" + this.$route.params.id),
          this.form
        );
      } else {
        promise = this.$http.post(this.$api(this.apiUrl + "/new"), this.form);
      }

      promise
        .then((response) => {
          if (this.$route.params.id) {
            this.$notify({
              group: "top",
              text: "اطلاعات سطح دسترسی با موفقیت بروز رسانی شد.",
              type: "success",
              duration: 10000,
            });
          } else {
            this.$notify({
              group: "top",
              text: "سطح دسترسی جدید با موفقیت افزوده شد.",
              type: "success",
              duration: 10000,
            });
          }
          this.$router.push(this.$route.query.redirect || this.parentRoute);
          return response;
        })
        .catch((error) => {
          let e = error.response;
          if (e.status != 422) {
            this.$notify({
              group: "right",
              text: e.data.message,
              type: "error",
              duration: 10000,
            });
          }
        });
    },
  },
};
</script>
