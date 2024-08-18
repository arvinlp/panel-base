<template>
  <div>
    <b-card :title="titleM" :sub-title="description">
      <b-card-body>
        <b-row class="mb-3">
          <slot name="filter" />
        </b-row>
        <b-row class="mb-3">
          <b-col cols="12" md="3">
            <b-button
              variant="outline-primary"
              :to="{ name: `${addItem}-new` }"
              class="w-100"
              v-if="addItem != null"
            >
              افزودن
            </b-button>
          </b-col>
          <b-col cols="12" md="3" v-if="recoverItemP">
            <b-button variant="outline-secondary" class="w-100" v-on:click="reload()">
              بارگذاری
            </b-button>
          </b-col>
          <b-col cols="12" md="3" v-else offset-md="3">
            <b-button variant="outline-secondary" class="w-100" v-on:click="reload()">
              بارگذاری
            </b-button>
          </b-col>
          <b-col cols="12" md="3" v-if="recoverItemP">
            <b-button variant="outline-secondary" class="w-100" v-on:click="deleteShow()">
              {{ btnShowDeleted }}
            </b-button>
          </b-col>
          <b-col cols="12" md="3">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="px-0"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="scroll">
            <b-table
              :id="listID"
              show-empty
              striped
              :busy.sync="isBusy"
              :items="getData"
              :fields="fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :filter="customFilter"
              :filterIncludedFields="filterOn"
              :current-page="currentPage"
              :per-page="perPage"
              :empty-filtered-text="`خطا: موردی برای نمایش یافت نشد!`"
            >
              <template v-slot:empty>
                <p class="text-center">خطا: موردی برای نمایش یافت نشد!</p>
              </template>
              <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>دریافت اطلاعات</strong>
                </div>
              </template>
              <template v-slot:cell(name)="data">
                <span :class="`space-${data.item.level}`">{{ data.item.name }}</span>
              </template>
              <template v-slot:cell(actions)="data">
                <slot name="action" />
                <router-link
                  v-for="(item, index) in customActions"
                  v-bind:key="index"
                  :to="{ name: item.to, params: { id: data.item.id } }"
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  class="btn btn-outline-default"
                  :title="item.name"
                >
                  <font-awesome-icon :icon="['fas', item.icon]" />
                </router-link>
                <router-link
                  v-if="editItem"
                  :to="{
                    name: `${editItem}-edit`,
                    params: { id: data.item.id },
                  }"
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  class="btn btn-outline-default"
                  title="ویرایش"
                >
                  <font-awesome-icon :icon="['fas', 'pencil-alt']" />
                </router-link>
                <a
                  v-if="deleteItemP"
                  href="#"
                  v-on:click="deleteItem(data.item.id)"
                  class="btn btn-outline-default"
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  title="حذف"
                >
                  <font-awesome-icon :icon="['fas', 'trash-alt']" />
                </a>
                <a
                  v-if="showDeleteList"
                  href="#"
                  v-on:click="recoverItem(data.item.id)"
                  class="btn btn-outline-default"
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  title="بازگردانی"
                >
                  <font-awesome-icon :icon="['fas', 'recycle']" />
                </a>
              </template>
            </b-table>
          </b-col>
          <b-col cols="12">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0 px-0"
            />
          </b-col>
        </b-row>
      </b-card-body>
      <!-- Delete Modal -->
      <b-modal v-model="modalDelete.show" centered>
        <template v-slot:modal-header="{ close }">
          <h5>حذف</h5>
          <b-button size="sm" variant="outline-danger" @click="close()">
            <font-awesome-icon :icon="['fas', 'times']" />
          </b-button>
        </template>

        <template>
          <p>آیا از حذف این آیتم اطمینان دارید ؟</p>
        </template>

        <template v-slot:modal-footer="{ cancel }">
          <div class="text-right">
            <b-button size="sm" variant="success" @click="deleteItemOK()">بلی</b-button>
          </div>
          <div class="text-left">
            <b-button size="sm" variant="danger" @click="cancel()">خیر</b-button>
          </div>
        </template>
      </b-modal>
      <!-- Recover Modal -->
      <b-modal v-model="modalRecover.show" centered>
        <template v-slot:modal-header="{ close }">
          <h5>بازگردانی</h5>
          <b-button size="sm" variant="outline-danger" @click="close()">
            <font-awesome-icon :icon="['fas', 'times']" />
          </b-button>
        </template>

        <template>
          <p>آیا از بازگردانی این آیتم اطمینان دارید ؟</p>
        </template>

        <template v-slot:modal-footer="{ cancel }">
          <div class="text-right">
            <b-button size="sm" variant="success" @click="recoverItemOK()">بلی</b-button>
          </div>
          <div class="text-left">
            <b-button size="sm" variant="danger" @click="cancel()">خیر</b-button>
          </div>
        </template>
      </b-modal>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "PKSITable",
  props: {
    listID: {
      type: String,
      defalut: "table-one",
    },
    endPoint: {
      type: String,
    },
    title: {
      type: String,
      default: "نامشحص",
    },
    description: {
      type: String,
      default: null,
    },
    sortBy: {
      type: String,
      default: "id",
    },
    addItem: {
      type: String,
      default: null,
    },
    editItem: {
      type: String,
      default: null,
    },
    deleteItemP: {
      type: String,
      default: null,
    },
    recoverItemP: {
      type: String,
      default: null,
    },
    customParam: {
      type: String,
      default: "",
    },
    customFilter: Array,
    fields: Array,
    customActions: Array,
  },
  data() {
    return {
      isBusy: false,
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      sortDesc: false,
      sortDirection: "asc",
      filter: [],
      filterOn: [],

      modalDelete: {
        show: false,
        title: "حذف آیتم",
        content: "آیا حذف این آیتم مطمین هستید ؟",
        btnOK: "بلی",
        btnCancel: "خیر",
        itemID: null,
      },
      modalRecover: {
        show: false,
        title: "حذف آیتم",
        content: "آیا حذف این آیتم مطمین هستید ؟",
        btnOK: "بلی",
        btnCancel: "خیر",
        itemID: null,
      },
      customParamM: "",
      titleM: "",
      showDeleteList: false,
      oldCustom: "",
      btnShowDeleted: "حذف شده ها",
      oldTitle: "",
    };
  },
  components: {},
  created() {},
  beforeCreate() {},
  mounted() {
    this.customParamM = this.customParam;
    this.titleM = this.title;
  },
  methods: {
    deleteShow() {
      if (this.showDeleteList) {
        this.showDeleteList = false;
        this.customParamM = this.oldCustom;
        this.$root.$emit("bv::refresh::table", this.listID);
        this.btnShowDeleted = "حذف شده ها";
        this.titleM = this.oldTitle;
      } else {
        this.showDeleteList = true;
        this.oldCustom = this.customParamM;
        if (this.customParamM.length > 0) this.customParamM += "&";
        this.customParamM += "delete=show";
        this.$root.$emit("bv::refresh::table", this.listID);
        this.btnShowDeleted = "لیست اصلی";
        this.oldTitle = this.titleM;
        this.titleM += " حذف شده";
      }
    },
    recoverItem(itemID, itemTitle) {
      this.modalRecover.show = true;
      this.modalRecover.title = "« " + itemTitle + " »";
      this.modalRecover.content = "آیا از بازگردانی « " + itemTitle + " » مطمین هستید ؟";
      this.modalRecover.itemID = itemID;
    },
    recoverItemOK() {
      this.isBusy = true;
      let promise = this.$http.post(
        this.$api(this.endPoint + "/" + this.modalRecover.itemID)
      );

      this.currentPage = 1;
      this.totalRows = this.totalRows - 1;

      return promise
        .then((response) => {
          this.$notify({
            group: "top",
            text: "آیتم مورد نظر بازگردانی شد !",
            type: "success",
            duration: 10000,
          });
          this.$root.$emit("bv::refresh::table", this.listID);
          this.modalRecover.show = false;
          return response;
        })
        .catch((error) => {
          if (error.response)
            if (error.response.data)
              if (error.response.data.code > 0) {
                this.$notify({
                  group: "right",
                  text: error.response.data.message,
                  type: "error",
                  duration: 10000,
                });
              }
          return error;
        })
        .finally(() => (this.isBusy = false));
    },
    deleteItem(itemID, itemTitle) {
      this.modalDelete.show = true;
      this.modalDelete.title = "« " + itemTitle + " »";
      this.modalDelete.content = "آیا از حذف « " + itemTitle + " » مطمین هستید ؟";
      this.modalDelete.itemID = itemID;
    },
    deleteItemOK() {
      this.isBusy = true;
      let promise = this.$http.delete(
        this.$api(this.endPoint + "/" + this.modalDelete.itemID)
      );

      this.currentPage = 1;
      this.totalRows = this.totalRows - 1;

      return promise
        .then((response) => {
          this.$root.$emit("bv::refresh::table", this.listID);
          if (this.recoverItemP != null) {
            if (response.data.message == "MOVE TO TRASH") {
              this.$notify({
                group: "top",
                text:
                  "آیتم مورد نظر به لیست حذف شده اضافه شد، دسترسی به این آیتم توسط کاربران مسدود می باشد.",
                type: "success",
                duration: 10000,
              });
            } else {
              this.$notify({
                group: "top",
                text: "آیتم مورد نظر حذف شد !",
                type: "success",
                duration: 10000,
              });
            }
          } else {
            this.$notify({
              group: "top",
              text: "آیتم مورد نظر حذف شد !",
              type: "success",
              duration: 10000,
            });
          }
          this.modalDelete.show = false;
          return response;
        })
        .catch((error) => {
          if (error.response)
            if (error.response.data)
              if (error.response.data.code > 0) {
                this.$notify({
                  group: "right",
                  text: error.response.data.message,
                  type: "error",
                  duration: 10000,
                });
              }
          return error;
        })
        .finally(() => (this.isBusy = false));
    },
    reload() {
      this.$root.$emit("bv::refresh::table", this.listID);
    },
    getData(ctx, callback) {
      this.items = [];
      this.isBusy = true;
      var params = "?";
      if (this.customParamM) params = `${params}${this.customParamM}&`;

      let sort = "asc";
      if (ctx.sortDesc) {
        sort = "desc";
      }
      let sortBy = ctx.sortBy;

      params = `${params}page=${ctx.currentPage}&order_by=${sortBy}&order=${sort}`;

      if (this.customFilter) {
        this.customFilter.forEach((element) => {
          if (element.value != "") params = `${params}&${element.key}=${element.value}`;
        });
      }

      let promise = this.$http.get(this.$api(this.endPoint + params));
      promise
        .then((response) => {
          const items = response.data.data;
          this.totalRows = items.length;
          return callback(items);
        })
        .catch((error) => {
          if (error.response)
            if (error.response.data)
              if (error.response.data.code > 0) {
                this.$notify({
                  group: "right",
                  text: error.response.data.message,
                  type: "error",
                  duration: 10000,
                });
              }
          return callback([]);
        })
        .finally(() => (this.isBusy = false));
    },
    statusEnable(value) {
      switch (parseInt(value)) {
        case 0:
          return "غیرفعال";
        case 1:
          return "فعال";
        default:
          return "---";
      }
    },
    statusAccess(value) {
      switch (parseInt(value)) {
        case 0:
          return "مسدود شده";
        case 1:
          return "فعال";
        case 2:
          return "در دست بررسی";
        default:
          return "---";
      }
    },
    statusPublish(value) {
      switch (parseInt(value)) {
        case 0:
          return "رد شده است";
        case 1:
          return "منتشر شده است";
        case 2:
          return "در انتظار بررسی";
        case 3:
          return "در انتظار رفع مشکلات";
        default:
          return "---";
      }
    },
  },
};
</script>
