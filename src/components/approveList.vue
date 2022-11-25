<template>
  <div>
    <div class="row">
      <div
        class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
        style="position: relative; background: #f6f6f6"
      >
        <div class="row">
          <div class="approval-heading">Approval List</div>
        </div>
        <div style="height: 565px" class="top-card-div">
          <q-card class="topCard" style="background: #f6f6f6">
            <div>
              <q-btn
                class="btn-create"
                label="New Approval"
                @click="createNewApproval"
                size="md"
              />
            </div>

            <div v-if="listApprovals.length == 0">
              <h1 class="no-approval">No Approvals Found</h1>
            </div>
            <div class="card-div">
              <q-card
                class="approve-list-card"
                style="cursor: pointer"
                v-for="(approvalList, index) in listApprovals.data"
                :key="index"
              >
                <div
                  class="text-h6 q-py-xs"
                  style="text-align: left; font-size: 10px"
                  @click="openStatusLog(approvalList.IdOfApprovalFlow)"
                >
                  <div class="graph">
                     <apexchart
                      height="110"
                      :options="chartOptions"
                      :series="chartOptions.series"
                      :colors="chartOptions.colors"
                      :labels="chartOptions.labels"
                    >
                    </apexchart> 
                  </div> 
                  <br />
                  <p>
                    {{ approvalList.IdOfApprovalFlow }}
                    {{ approvalList.ApprovalName }}
                  </p>
                  <hr style="opacity: 1; margin-top: -20px" />
                  <p>
                    {{ approvalList.ApprovalDetails }}
                    {{listApprovals.data.CountApprovedUsers}}
                    {{listApprovals.data.CountRejectedUsers}}
                    {{listApprovals.data.CountPending}}
                  </p>
                  <hr style="opacity: 1; margin-top: -20px" />
                </div>
              </q-card>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";
import { mapState } from "vuex";
import approvalVue from "./approval.vue";
export default {
  computed: {
    ...mapState({
      listApprovals: "listApprovals",
    }),
  },

  data() {
    return {
      chartOptions: {
        chart: {
          type: "pie",
        },
        series: [],
        labels: ["Approved", "Rejected", "Pending"],
        colors: ["#ff9800", "#ff0000", "#23ca2a"],
        tooltip: {
          enabled: false,
        },
      },
    };
  },

  created() {
    this.getAllApproval();
  },

  methods: {
    createNewApproval() {
      this.$router.push({ name: "approval" });
    },
    openStatusLog(idApprovalFlow) {
      console.log("GET_FLOW_ID ====>", idApprovalFlow);
      localStorage.setItem("idApprovalFlow", idApprovalFlow);
      this.$router.push({ name: "StatusLog" });
    },
    getAllApproval() {
      this.$store.dispatch("getapprovalslist", {
        this: this,
        updateChart: this.chartOptions,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.top-card {
  margin: 10px 10px 12px 85px;
  position: relative;
  top: 20px;
  z-index: 50;
}

.my-card {
  vertical-align: top;
  position: relative;
  border-radius: 24px;
  background: #fff;
}

.approval-heading {
  background-color: #fa8005;
  margin-top: 20px;
  width: 130px;
  height: 35px;
  color: #fff;
  border-radius: 9px;
  position: absolute;
  left: 0;
  z-index: 5;
  text-align: center;
  padding: 4px;
  font-size: 16px;
}

.top-card-div {
  margin-top: 35px;
  margin-bottom: 55px;
}

.topCard {
  padding: 30px;
}

.card-div {
  display: flex;
  justify-content: space-evenly;
  align-content: flex-end;
  flex-wrap: wrap;
}

.approve-list-card {
  // box-shadow: 1px 3px 9px rgb(124, 123, 123);
  padding: 20px;
  width: 300px;
  height: 330px;
  margin: 30px;
  border-radius: 5px;
  border: 1px solid orange;
  background: radial-gradient(circle, rgb(238, 238, 238) 0%, #b1d4c1 100%);
  overflow-y: scroll;
  padding-right: 20px;
}
.approve-list-card::-webkit-scrollbar {
  display: none;
}
.approve-list-card ::-webkit-scrollbar {
  display: none;
}
.btn-create {
  border-radius: 9px;
  position: absolute;
  right: 0;
  font-family: "Montserrat", sans-serif, Arial, Helvetica;
  top: -10px;
  background-color: #fa8005;
  color: #fff;
  line-height: 10px;
}

.no-approval {
  text-align: center;
  font-family: "Montserrat", sans-serif, Arial, Helvetica;
  font-size: 3rem;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.00735em;
  color: #f44336 !important;
}

@media only screen and (min-width: 100px) and (max-width: 599px) {
  .no-approval {
    margin-right: 5px;
    text-align: center;
    font-size: 20px;
  }

  .btn-create {
    height: 31px;
    width: 100px;
    font-size: 11px;
    text-align: center;
    line-height: 13px;
    margin-top: -5px;
  }

  .approval-heading {
    height: 29px;
    width: 130px;
    font-size: 15px;
  }
}

@media only screen and (max-width: 450px) {
  .approve-list-card {
    min-width: 200px;
    height: 200px;
    border: 2px solid orange;
  }
}
</style>
