<template>
  <q-layout view="lHh Lpr lFf" id="lay-out">
    <notifications group="foo" position="top center" style="z-index: 10001" />
    <loading
      :active.sync="isLoading"
      color="#fa8005"
      background-color="#000"
      :z-index="10000"
      :is-full-page="fullPage"
    >
    </loading>
    <router-view />
  </q-layout>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapState } from "vuex";
export default {
  components: {
    Loading,
  },
  computed: {
    ...mapState({
      isLoading: "isLoading",
    }),
  },
  data() {
    return {
      fullPage: true,
    };
  },
};
</script>

<style>
/* html, body {
  background-color: #f7d794;
  background-color: #31CCEC;
} */
</style>
