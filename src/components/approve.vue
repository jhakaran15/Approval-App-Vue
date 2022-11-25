<template>
  <div class="row">
    <div class="col-lg-3 col-md-3 col-sm-1 col-xs-1"></div>

    <div
      class="col-lg-6 col-md-6 col-sm-10 col-xs-10"
      style="height: 100vh; position: relative"
    >
      <q-card style="background-color: #f7ad19">
        <p
          class="approval-heading"
          style="
            font-family: Montserrat, sans-serif, Arial, Helvetica;
            font-size: 22px;
            font-weight: bold;
            color: #e1f8dc;
          "
        >
          APPROVAL NAME
        </p>

        <p
          style="
            font-size: 17px;
            padding: 5px;
            font-family: Montserrat, sans-serif, Arial, Helvetica;

            color: #1c2e4a;
          "
        >
          {{ userData.data.ApprovalName }}
        </p>
      </q-card>

      <q-card style="background-color: #f7ad19">
        <p
          class="approval-heading"
          style="
            font-family: Montserrat, sans-serif, Arial, Helvetica;
            font-size: 22px;
            font-weight: bold;
            color: #e1f8dc;
          "
        >
          APPROVAL DETAILS
        </p>
        <p
          style="
            font-size: 17px;
            padding: 5px;
            font-family: Montserrat, sans-serif, Arial, Helvetica;
            color: #1c2e4a;
          "
        >
          {{ userData.data.ApprovalDetails }}
        </p>
      </q-card>

      <q-card style="background-color: #f7ad19; paddding: 20px">
        <p
          class="approval-heading"
          style="
            font-family: Montserrat, sans-serif, Arial, Helvetica;

            font-size: 22px;
            font-weight: bold;
            color: #e1f8dc;
          "
        >
          CONTENT
        </p>

        <div
          class="app-header"
          style="background-color: black; color: white"
          v-if="userData.data.IdTypeOfApproval == 1"
        >
          <template v-if="isLoading"> Loading... </template>

          <template v-else>
            <span v-if="showAllPages"> {{ pageCount }} page(s) </span>

            <span v-else>
              <button :disabled="page <= 1" @click="page--">❮</button>

              {{ page }} / {{ pageCount }}

              <button :disabled="page >= pageCount" @click="page++">❯</button>
            </span>

            <label class="right">
              <input v-model="showAllPages" type="checkbox" />

              Show all pages
            </label>
          </template>
        </div>
        <vue-pdf-embed
          v-if="userData.data.IdTypeOfApproval == 1"
          ref="pdfRef"
          :source="'data:application/pdf;base64,' + userData.data.ApprovalFile"
          :page="page"
          @rendered="handleDocumentRender"
        />

        <video
          controls
          v-if="userData.data.IdTypeOfApproval == 4"
          style="width: 100%; height: 100%; padding: 20px"
        >
          <source
            type="video/webm"
            :src="'data:video/mp4;base64,' + userData.data.ApprovalFile"
          />
          <source
            type="video/mp4"
            :src="'data:video/mp4;base64,' + userData.data.ApprovalFile"
          />
        </video>
        <a
          style="
            padding: 5px;
            background-color: #1c2e4a;
            color: white;
            border-radius: 4px;
            height: 20px;
            width: 90px;
            padding-bottom: 2px;
            /* margin-top: 35px; */
            position: relative;
            left: 30px;
          "
          v-if="userData.data.IdTypeOfApproval == 1"
          download="file.pdf"
          :href="
            'data:application/octet-stream;base64,' + userData.data.ApprovalFile
          "
          >DOWNLOAD PDF</a
        >

        <a
          v-if="userData.data.IdTypeOfApproval == 2"
          style="padding: 5px"
          :href="userData.data.ApprovalFile"
          target="_blank"
          >{{ userData.data.ApprovalFile }}</a
        >

        <a
          v-if="userData.data.IdTypeOfApproval == 3"
          style="padding: 5px"
          :href="userData.data.ApprovalFile"
          target="_blank"
          >{{ userData.data.ApprovalFile }}</a
        >

        <p v-if="userData.data.IdTypeOfApproval == 5" style="padding: 5px">
          {{ userData.data.ApprovalFile }}
        </p>
      </q-card>
      <q-form @submit.prevent="formSubmit" style="margin-top: 15px">
        <q-card>
          <q-input
            v-model="comments"
            filled
            type="textarea"
            color="orange"
            placeholder="Please enter comments..."
            style="
              background-color: lightgoldenrodyellow;
              margin-bottom: 10px;
              /* position: absolute;
            bottom: 130px;
            width: 100%; */
            "
          />
          <div
            v-if="enterCommentsValidation"
            style="color: red; font-size: 12px; margin-left: 23px"
          >
            Field is required
          </div>
        </q-card>
        <div
          style="
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
            /* position: absolute;
          bottom: 30px; */
            text-align: center;
            width: 100%;
          "
        >
          <q-radio
            v-model="color"
            val="teal"
            label="Approve"
            color="green"
            style="color: green"
            v-on:click.native="approved"
          />
          <q-radio
            v-model="color"
            val="orange"
            label="Reject"
            color="red"
            style="color: red"
            v-on:click.native="rejected"
          />
          <q-radio
            v-model="color"
            val="red"
            label="More information"
            color="orange"
            style="color: orange"
            v-on:click.native="needMoreInfo"
          />
        </div>
        <q-btn
          type="submit"
          color="green"
          label="Submit"
          size="xs"
          style="
            width: 90px;
            height: 20px;
            position: absolute;
            right: 0;
            /* bottom: -29px;  */
          "
        />
      </q-form>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-1 col-xs-1"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import VuePdfEmbed from "vue-pdf-embed";
import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";

export default {
  components: {
    VuePdfEmbed,
  },
  computed: {
    ...mapState({
      userData: "approvalData",
    }),
  },
  data() {
    return {
      comments: "",
      color: "green",
      validationRequired: false,
      enterCommentsValidation: false,
      status: "",

      isLoading: true,
      page: null,
      pageCount: 1,

      showAllPages: true,
    };
  },
  created() {
    this.getuserData();
    // this.documents();
    // if (
    //   this.userData.data[this.userData.data.length - 1].IdTypeOfApproval === 1
    // ) {
    // }
  },

  watch: {
    showAllPages() {
      this.page = this.showAllPages ? null : 1;
    },
  },

  methods: {
    handleDocumentRender() {
      this.isLoading = false;
      this.pageCount = this.$refs.pdfRef.pageCount;
    },

    getuserData() {
      this.$store.dispatch("userDataVerification", {
        this: this,
      });
    },
    formSubmit() {
      if (this.validationRequired) {
        if (this.comments == "") {
          this.enterCommentsValidation = true;
          return;
        }
      }

      this.$store.dispatch("verification", {
        this: this,
        status: this.status,
        comments: this.comments,
      });
    },
    rejected() {
      this.validationRequired = true;
      this.status = "Rejected";
    },
    needMoreInfo() {
      this.validationRequired = true;
      this.status = "need more info";
    },
    approved() {
      this.validationRequired = false;
      this.enterCommentsValidation = false;
      this.status = "Approved";
    },
  },
};
</script>

<style scoped lang="scss">
/* .btn {
  position: absolute;
  bottom: 10px;
} */

.approval-heading {
  font-size: 26px;
  color: orange;
  padding: 5px;
}

@media only screen and (max-width: 500px) {
  // .button {
  //   width: auto;
  //   font-size: 16px;
  //   margin-top: 9px;
  // }
  .approval-heading {
    font-size: 21px;
    color: orange;
    padding: 5px;
  }
}
</style>
