<template>
  <b-row>
    <b-col cols="12">
      <b-card :title="title" :sub-title="description">
        <b-card-body>
          <b-form @submit="onSubmit">
            <b-row align-v="center">
              <b-col cols="12" md="6">
                <b-row align-v="center" class="my-1">
                  <b-col cols="3">
                    <label for="fname">نام :</label>
                  </b-col>
                  <b-col cols="9">
                    <b-form-input
                      id="fname"
                      v-model="form.fname"
                      placeholder="نام را وارد نمایید."
                    ></b-form-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row align-v="center" class="my-1">
                  <b-col cols="3">
                    <label for="lname">نام خانوادگی :</label>
                  </b-col>
                  <b-col cols="9">
                    <b-form-input
                      id="lname"
                      v-model="form.lname"
                      placeholder="نام خانوادگی را وارد نمایید."
                    ></b-form-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row align-v="center" class="my-1">
                  <b-col cols="3">
                    <label for="mobile">موبایل :</label>
                  </b-col>
                  <b-col cols="9">
                    <b-form-input
                      id="mobile"
                      v-model="form.mobile"
                      type="tel"
                      placeholder="۹*********"
                      pattern="[9]{1}[0-9]{9}"
                    ></b-form-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row align-v="center" class="my-1">
                  <b-col cols="3">
                    <label>جنسیت :</label>
                  </b-col>
                  <b-col cols="8" class="row">
                    <b-col class="form-radio-datamis">
                      <input
                        id="Female"
                        type="radio"
                        v-model.trim="form.sex"
                        value="female"
                        class="form-radio-input"
                      />
                      <label class="form-radio-label" for="Female">
                        <span></span>زن
                      </label>
                    </b-col>
                    <b-col class="form-radio-datamis">
                      <input
                        id="Male"
                        type="radio"
                        v-model.trim="form.sex"
                        value="male"
                        class="form-radio-input"
                      />
                      <label class="form-radio-label" for="Male">
                        <span></span>مرد
                      </label>
                    </b-col>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12">
                <hr />
              </b-col>
              <b-col cols="12" md="6">
                <b-row align-v="center" class="my-1">
                  <b-col cols="3">
                    <label for="role-id">دسترسی کاربر :</label>
                  </b-col>
                  <b-col cols="9">
                    <multiselect
                      id="role-id"
                      v-model="role_id"
                      label="name"
                      track-by="id"
                      placeholder="نوع کاربری را انتخاب کنید."
                      open-direction="bottom"
                      :options="role_ids"
                      :multiple="false"
                      :searchable="true"
                      :isLoading="isLoading"
                      selectLabel
                      selectedLabel="انتخاب شده"
                      deselectLabel="حذف انتخاب"
                      @select="onSelectRoleId"
                      @change="onSelectRoleId"
                    >
                      <span slot="noResult">موردی یافت نشد مجددا بررسی کنید.</span>
                      <span slot="noOptions">خطا در دریافت اطلاعات مجددا سعی کنید.</span>
                    </multiselect>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row align-v="center" class="my-1">
                  <b-col cols="4">
                    <label for="input-small">وضعیت دسترسی:</label>
                  </b-col>
                  <b-col cols="8" class="row align-items-center">
                    <b-col class="form-radio-datamis">
                      <input
                        id="Enable"
                        type="radio"
                        v-model.trim="form.status"
                        value="1"
                        class="form-radio-input"
                      />
                      <label class="form-radio-label" for="Enable">
                        <span></span>فعال
                      </label>
                    </b-col>
                    <b-col class="form-radio-datamis">
                      <input
                        id="Disable"
                        type="radio"
                        v-model.trim="form.status"
                        value="0"
                        class="form-radio-input"
                      />
                      <label class="form-radio-label" for="Disable">
                        <span></span>دسترسی محدود/غیرفعال
                      </label>
                    </b-col>
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
      title: "افزودن کاربر جدید",
      description: null,
      role: { name: "کاربر سیستم", code: "user" },
      role_id: null,
      isLoading: false,
      role_ids: [],
      form: {
        role: "client",
        sex: "male",
        status: 1,
      },
      apiUrl: "panel/users",
      parentRoute: { name: "users" },
    };
  },
  components: {},
  mounted() {
        this.getRoleIds();
    if (this.$route.params.id) {
      this.getData();
      this.title = "ویرایش اطلاعات " + this.form.fname + " " + this.form.lname;
    }
  },
  methods: {
    onSelectRoleId(value) {
      this.form.role_id = value.id;
      this.role_id = value;
    },
    onSelectSex(value) {
      this.form.sex = value.code;
      this.sex = value;
    },
    getRoleIds() {
      let promise = this.$http.get(this.$api("panel/users/roles/all"));

      return promise
        .then((response) => {
          this.role_ids = response.data;
          this.role_id = this.role_ids.find((item) => item.id == this.form.role_id);
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
          this.role = this.roles.find((item) => item.code == response.data.role);
          this.onSelectRole(this.role);
          this.title = "ویرایش اطلاعات " + this.form.fname + " " + this.form.lname;
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
              text: "اطلاعات کاربر با موفقیت بروز رسانی شد.",
              type: "success",
              duration: 10000,
            });
          } else {
            this.$notify({
              group: "top",
              text: "کاربر جدید با موفقیت افزوده شد.",
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
