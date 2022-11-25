<template>
  <div>
    <q-layout class="home-section">
      <q-header bordered class="bg-white"  style="position: fixed" >
        
          
          <!-- <div style="margin-left: 66px" v-if="todayDate">
            <q-badge outline color="orange-8" class="cursor-pointer">
              <div class="today-date">
                <b> Date:- {{ $store.state.date }} </b>
              </div>
            </q-badge>
          </div> -->

        
        <div class="row">
          <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
            <div>
              <img
                class="nimbleLogo"
                src="../assets/nimble_logo.png"
                style="height: 60px; padding: 11px 0px 0px 25px"
              />
            </div>
          </div>
          <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
            <q-toolbar>
              <q-space />
              <div class="adminImg">
                <img src="../assets/admins.png" style="height: 30px" />
              </div>

              <div class="adminName" style="color: black">
                <div class="user-name">
                  {{ user.UserName }}
                </div>

                <div class="main-logout-icon">
                  <i class="fas fa-power-off logout-icon" @click="logout"></i>
                </div>
              </div>
            </q-toolbar>
          </div>
          <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
        </div>
      </q-header>

      <q-page-container class="q-pa-lg">
        <transition name="slide" mode="out-in">
          <router-view />
        </transition>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  created() {
    this.getUser();
  },
  computed: {
    ...mapState({
      user: "user",
      // todayDate: "todayDate",
    }),
  },
  data() {
    return {};
  },
  methods: {
    approvalPage() {
      this.$router.push({ name: "approval" });
    },
    getUser() {
      this.$store.dispatch("getUser", { this: this });
    },
    logout() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style scoped lang="scss">
.logout-icon {
  cursor: pointer;
  border-radius: 18px;
}

@media only screen and (min-width: 0px) and (max-width: 599px) {
  .nimbleLogo {
    width: 170px;
  }
  .adminImg {
    padding-top: 20px;
  }
  .adminName {
    padding-top: 14px;
  }
  .user-name {
    display: none;
  }
  .logout-icon {
    padding: 10px;
  }
}

@media only screen and (min-width: 600px) {
  .nimbleLogo {
    width: 190px;
  }
  .adminName {
    position: relative;
    display: flex;
    justify-content: space-around;
    padding-top: 10px;
  }
  .user-name {
    padding-top: 8px;
    padding-left: 15px;
  }
  .logout-icon {
    position: absolute;
    bottom: 5px;
    right: 2px;
  }
  .main-logout-icon {
    padding-left: 28px;
  }
  .adminImg {
    padding-top: 20px;
  }
}
</style>
