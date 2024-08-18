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
      />
    </b-col>
  </b-row>
</template>

<script>
import List from "@/components/PKSITable.vue";
export default {
  data() {
    return {
      listID: "single-list",
      listTitle: "سطوح دسترسی",
      listEndPoint: "panel/users/roles",
      listDescription: "سطوح دسترسی فقط مربوط برای پرسنل اعمال می گردد.",
      listPrefix: "role",
      listCustomParam: "",
      fields: [
        {
          key: "name",
          label: "نام",
          class: "align-middle",
          sortable: true,
        },
        {
          key: "actions",
          class: "table-action",
          label: "اقدامات",
          sortable: false,
        },
      ],
      customFilter: [],
    };
  },
  components: {
    List,
  },
  methods: {},
};
</script>
