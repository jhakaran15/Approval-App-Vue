<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      title="Approval Status"
      :data="table_data"
      :columns="approval_status_columns"
      :rows-per-page-options="[0]"
      hide-bottom
      row-key="name"
      flat
      bordered
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      getStatusListApprovals: "getStatusListApprovals",
    }),
  },
  data() {
    return {
      approval_status_columns: [
        {
          name: "name",
          required: true,
          label: "Approved Name",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 100px",
          headerClasses: "bg-primary text-white",
        },
        {
          name: "Status",
          align: "center",
          label: "Status",
          field: "Status",
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 100px",
          headerClasses: "bg-primary text-white",
        },
        {
          name: "comment",
          label: "Comments",
          align: "center",
          field: "comment",
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 100px",
          headerClasses: "bg-primary text-white",
        },
        // {
        //   name: "date",
        //   label: "Date",
        //   align: "center",
        //   field: "date",
        //   classes: "bg-grey-2 ellipsis",
        //   style: "max-width: 100px",
        //   headerClasses: "bg-primary text-white",
        // },
      ],

      table_data: [
        {
          name: "",
          Status: "",
          comment: "",
          // date: "",
        },
      ],
    };
  },
  created() {
    this.getStatusApproval();
  },
  methods: {
    getStatusApproval() {
      this.$store.dispatch("getstatusapprovals", {
        this: this,
      });
    },
  },
};
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 210px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #f7d794

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>

