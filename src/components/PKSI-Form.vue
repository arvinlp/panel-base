<template>
  <div>
    <b-row v-if="sections">
      <b-col
        v-for="(item, index) in sections"
        v-bind:key="index"
        :cols="item.cols"
        :md="item.md">
        <b-card :title="item.title" :sub-title="item.description">
          <b-card-body>
            <b-row>
              <b-col cols="12">
                <input :v-model="form[index]">
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "PKSI-Form",
  props: {
    listID: {
      type: String,
      defalut: "table-one",
    },
    sections: Array,
    forms: Array,
  },
  data() {
    return {
    };
  },
  components: {},
  created() {},
  beforeCreate() {},
  methods: {},
};
</script>
