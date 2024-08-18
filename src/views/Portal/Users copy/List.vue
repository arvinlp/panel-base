<template>
  <b-row>
    <b-col cols="12">
      <List
        :listID="listID"
        :endPoint="listEndPoint"
        :title="listTitle"
        :description="listDescription"
        :addItem="listPrefix"
        :editItem="listPrefix"
        :deleteItemP="listPrefix"
        :fields="fields"
        :customParam="listCustomParam"
        :customFilter="customFilter"
      >
        <template slot="filter">
          <b-col cols="12" md="3">
            <b-form-input
              v-model="customFilter[0].value"
              type="search"
              class="search-in-table"
              id="filterInput"
              :placeholder="customFilter[0].name"
            />
          </b-col>
          <b-col cols="12" md="3">
            <b-form-input
              v-model="customFilter[1].value"
              type="search"
              class="search-in-table"
              id="filterInput"
              :placeholder="customFilter[1].name"
            />
          </b-col>
          <b-col cols="12" md="3" offset-md="3">
            <b-form-input
              v-model="customFilter[1].value"
              type="search"
              class="search-in-table"
              id="filterInput"
              :placeholder="customFilter[1].name"
            />
          </b-col>
        </template>
      </List>
    </b-col>
  </b-row>
</template>

<script>
import List from "@/components/PKSITable.vue";
export default {
  data() {
    return {
      listID: "single-list",
      listTitle: "لیست پرسنل",
      listEndPoint: "panel/users",
      listDescription: "جهت جستجو کارمندی خاص از فیلترهای موجود استفاده نمایید.",
      listPrefix: "user",
      listCustomParam: "",
      fields: [
        {
          key: "nickname",
          label: "نام و نام خانوادگی",
          class: "align-middle",
          sortable: true,
        },
        {
          key: "mobile",
          label: "موبایل",
          class: "align-middle",
          sortable: false,
        },
        {
          key: "status",
          label: "وضعیت فعالیت",
          class: "align-middle w-10",
          formatter: "statusAccess",
          sortable: false,
        },
        {
          key: "actions",
          class: "table-action",
          label: "اقدامات",
          sortable: false,
        },
      ],
      customFilter: [
        {
          name: "جستجو براساس نام",
          key: "personal_name",
          value: "",
        },
        {
          name: "جستجو براساس موبایل",
          key: "mobile",
          value: "",
        },
        {
          name: "جستجو براساس موبایل",
          key: "mobile",
          value: "",
        },
      ],
    };
  },
  components: {
    List,
  },
  methods: {

  },
};
</script>
