<template>
  <q-card>
    <div class="row" style="margin-top: 20px">
      <div class="col-lg-3 col-md-3 col-sm-1 col-xs-0"></div>
      <div class="col-lg-6 col-md-6 col-sm-10 col-xs-12">
        <q-btn
          round
          color="green"
          icon="add"
          size="sm"
          style="position: absolute; right: 10px; top: 10px"
          @click="addCards"
          ><q-tooltip> Add levels </q-tooltip>
        </q-btn>
        <h3 v-if="cards.length == 0" style="text-align: center; color: orange">
          ADD MEMBERS
        </h3>
        <!-- <span>ADD LEVELS</span> -->

        <!-- <approvalCard v-for="(card, index) in mainCard" :key="index">
        </approvalCard> -->
        <q-form @submit.prevent="formSubmit">
          <q-btn
            v-if="cards.length >= 1"
            style="
              background: #008000;
              color: white;
              position: absolute;
              right: 43px;
              bottom: -40px;
            "
            label="Start approval"
            size="sm"
            type="submit"
            class="StartApprovalBtn"
          />
          <q-card
            v-for="(card, index) in cards"
            :key="card.index"
            style="
              margin: 45px;
              border: 1px solid orange;
              background-color: orange;
            "
          >
            <p style="margin: 10px 10px 20px; color: white; line-height: 10px">
              Approval Level {{ index + 1 }}
            </p>
            <q-btn
              round
              color="red"
              icon="close"
              @click="removeCards(index)"
              size="xs"
              style="position: absolute; right: 5px; top: 5px"
            >
              <q-tooltip> Cancel levels </q-tooltip>
            </q-btn>
            <q-btn
              round
              color="green"
              icon="add"
              @click="addSubCards(card)"
              size="xs"
              style="position: absolute; right: 35px; top: 5px"
              ><q-tooltip> Add members </q-tooltip>
            </q-btn>

            <q-input
              v-model="card.name"
              filled
              label="name"
              label-color="orange"
              color="orange"
              dense
              style="
                margin: 37px 5px 15px 5px;
                padding: 5px;
                background-color: white;
              "
              :rules="[
                (val) => !!val || 'Field is required',
                (val) => val.length <= 20 || 'Please use maximum 20 characters',
              ]"
            />
            <q-input
              v-model="card.email"
              filled
              label="email"
              label-color="orange"
              color="orange"
              dense
              style="
                margin: 5px 5px 15px 5px;
                padding: 5px;
                background-color: white;
              "
              :rules="[(val) => !!val || 'Email is missing', isValidEmail]"
            />
            <q-card
              v-for="(subCard, index) in card.subCards"
              :key="subCard.index"
              style="margin: 5px; padding: 5px; background-color: orange"
            >
              <q-btn
                round
                color="red"
                icon="close"
                @click="removeSubCards(card, index)"
                size="5px"
                style="position: absolute; right: 1px; top: 1px"
              >
                <q-tooltip> Cancel </q-tooltip>
              </q-btn>

              <q-input
                filled
                label="name"
                label-color="orange"
                color="orange"
                dense
                v-model="subCard.name"
                style="
                  margin: 5px 5px 15px 5px;
                  padding: 5px;
                  background-color: white;
                "
                :rules="[
                  (val) => !!val || 'Field is required',
                  (val) =>
                    val.length <= 20 || 'Please use maximum 20 characters',
                ]"
              />
              <q-input
                filled
                label="email"
                label-color="orange"
                color="orange"
                dense
                v-model="subCard.email"
                style="
                  margin: 5px 5px 15px 5px;
                  padding: 5px;
                  background-color: white;
                "
                :rules="[(val) => !!val || 'Email is missing', isValidSubEmail]"
              />
            </q-card>
            <!-- <approvalCard v-for="(card, index) in cardduplicate" :key="index">
            </approvalCard> -->
          </q-card>
        </q-form>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-1 col-xs-0"></div>
    </div>
  </q-card>
</template>

<script>
// import approvalCard from "./approvalCard.vue";
export default {
  data() {
    return {
      cards: [{ name: "", email: "", subCards: [] }],
      sendCards: [],
      // cardduplicate: [],
      // uniqueKey: 0,
    };
  },
  methods: {
    addCards() {
      this.cards.push({
        name: "",
        email: "",
        subCards: [],
      });
    },
    isValidEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Invalid email";
    },
    isValidSubEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Invalid email";
    },

    removeCards(index) {
      this.cards.splice(index, 1);
    },
    removeSubCards(card, index) {
      card.subCards.splice(index, 1);
    },
    // addSubCards() {
    //   // row.subCards.push({ name: "", email: "" });

    //   return this.addSub;

    //   console.log("test", this.cardduplicate);
    // },

    formSubmit() {
      let levelData = this.cards;
      console.log("LEVEL DATA", levelData);
      levelData.forEach((value, sequenceIndex) => {
        this.sendCards.push({
          ApprovalUserName: value.name,
          ApprovalUserEmailId: value.email,
          SequenceNo: sequenceIndex + 1,
        }),
          value.subCards.forEach((value, index) => {
            this.sendCards.push({
              ApprovalUserName: value.name,
              ApprovalUserEmailId: value.email,
              SequenceNo: sequenceIndex + 1,
            });
          });
      });
      this.$store.dispatch("getapprovalslist", {
        this: this,
      });
      this.$store.dispatch("sendEmail", {
        this: this,
        approvalLevels: this.sendCards,
      });

      this.$router.push({ name: "approveList" });
    },
    addSubCards(row) {
      row.subCards.push({ name: "", email: "" });

      // console.log("test", this.cardduplicate);

      // this.cardduplicate.push({});
      // this.uniqueKey += 1;
    },
  },
};
</script>

<style scoped lang="scss">
@media only screen and (max-width: 500px) {
  .StartApprovalBtn {
    width: 65px;
    height: 22px;

    line-height: 8.4px;
  }
}
</style>
