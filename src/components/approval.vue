<template>
  <div class="row">
    <div class="col-lg-3 col-md-3 col-sm-1 col-xs-1">
      <q-btn
        size="sm"
        color="orange"
        icon="arrow_back_ios_new"
        label="back"
        class="back-btn"
        @click="backBtn"
        :no-wrap="true"
        :stack="false"
      />
    </div>
    <div
      class="col-lg-6 col-md-6 col-sm-10 col-xs-10 input-div"
      style="box-shadow: 1px 3px 9px rgb(124, 123, 123); margin-top: 50px"
    >
      <q-card
        class="my-card"
        style="
          background: radial-gradient(circle, white 0%, #f5f5f5 100%);
          margin-top: 0;
        "
      >
        <q-tabs
          v-model="tab"
          indicator-color="white"
          class="bg-orange text-white shadow-2"
        >
          <q-tab name="documents" icon="text_snippet" class="tabs">
            <div>Document</div>
          </q-tab>

          <q-tab name="linkexternal" icon="link" class="tabs">
            <div>External link</div>
          </q-tab>

          <q-tab name="linkiframe" icon="fa fa-link" class="tabs">
            <div>Iframe link</div>
          </q-tab>

          <q-tab name="video" icon="play_circle" class="tabs">
            <div>Video</div>
          </q-tab>

          <q-tab name="text" icon="description" class="tabs">
            <div>Text</div>
          </q-tab>
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="documents">
            <q-form @submit.prevent="onsubmitDocuments">
              <div class="gap"></div>
              <q-input
                v-model="approvalNameDocuments"
                class="approvalName"
                filled
                label="Name of approval"
                label-color="orange"
                color="orange"
                dense
                ref="approvalNameDocuments"
                :rules="[
                  (val) => !!val || 'Field is required',
                  (val) =>
                    val.length <= 35 || 'Please use maximum 35 characters',
                ]"
              />
              <div class="gap"></div>

              <q-input
                v-model="approvalDetailsDocuments"
                ref="approvalDetailsDocuments"
                class="approvalDetails"
                label="Details"
                label-color="orange"
                filled
                type="textarea"
                color="orange"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <div class="gap"></div>

              <q-uploader
                label="Upload Documents (max-size=10mb)"
                color="orange"
                square
                flat
                bordered
                @added="fileUpload"
                max-total-size="10485760"
                accept=".pdf,.docx,.ppt, document/"
                class="document-dragdrop"
              ></q-uploader>
              <div
                v-if="documentsNotUploaded"
                style="color: red; font-size: 12px; margin-left: 23px"
              >
                Field is required
              </div>
              <div class="gap"></div>

              <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 button-div">
                  <q-btn
                    label="cancel"
                    color="red"
                    size="sm"
                    class="cancel-btn"
                    @click="cancelDocuments"
                  ></q-btn>

                  <q-btn
                    type="submit"
                    icon-right="arrow_forward"
                    :no-wrap="true"
                    :stack="true"
                    color="green"
                    size="sm"
                    class="submit-btn"
                  >
                    Add members</q-btn
                  >
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
              </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="linkexternal">
            <q-form @submit.prevent="onsubmitLinkExternal">
              <div class="gap"></div>
              <q-input
                v-model="approvalNameLinkExternal"
                class="approvalName"
                filled
                label="Name of approval"
                label-color="orange"
                color="orange"
                dense
                :rules="[
                  (val) => !!val || 'Field is required',
                  (val) =>
                    val.length <= 35 || 'Please use maximum 35 characters',
                ]"
              />
              <div class="gap"></div>

              <q-input
                v-model="approvalDetailsLinkExternal"
                class="approvalDetails"
                label="Details"
                label-color="orange"
                filled
                type="textarea"
                color="orange"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <div class="gap"></div>
              <q-input
                v-model="linkExternal"
                class="externalLink"
                ref="externalLink"
                filled
                label="Enter external link"
                label-color="orange"
                color="orange"
                dense
                :rules="[(val) => !!val || 'Field is required']"
              />
              <div class="gap"></div>

              <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 button-div">
                  <q-btn
                    label="cancel"
                    color="red"
                    size="sm"
                    class="cancel-btn"
                    @click="cancelLinkExternal"
                  ></q-btn>

                  <q-btn
                    type="submit"
                    label="Add members"
                    icon-right="arrow_forward"
                    color="green"
                    size="sm"
                    class="submit-btn"
                  ></q-btn>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
              </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="linkiframe">
            <q-form @submit.prevent="onsubmitLinkIframe">
              <div class="gap"></div>
              <q-input
                v-model="approvalNameLinkIframe"
                class="approvalName"
                filled
                label="Name of approval"
                label-color="orange"
                color="orange"
                dense
                ref="approvalNameLinkIframe"
                :rules="[
                  (val) => !!val || 'Field is required',
                  (val) =>
                    val.length <= 35 || 'Please use maximum 35 characters',
                ]"
              />
              <div class="gap"></div>

              <q-input
                v-model="approvalDetailsLinkIframe"
                ref="approvalDetailsLinkIframe"
                class="approvalDetails"
                label="Details"
                label-color="orange"
                filled
                type="textarea"
                color="orange"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <div class="gap"></div>

              <q-input
                ref="linkIframe"
                class="linkIframe"
                filled
                v-model="linkIframe"
                label="Enter Iframe Link"
                label-color="orange"
                color="orange"
                dense
                :rules="[(val) => !!val || 'Field is required']"
              />

              <div class="gap"></div>

              <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 button-div">
                  <q-btn
                    label="cancel"
                    color="red"
                    size="sm"
                    class="cancel-btn"
                    @click="cancelLinkIframe"
                  ></q-btn>

                  <q-btn
                    type="submit"
                    label="Add members"
                    icon-right="arrow_forward"
                    color="green"
                    size="sm"
                    class="submit-btn"
                  ></q-btn>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
              </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="video">
            <q-form @submit.prevent="onsubmitVideos">
              <div class="gap"></div>
              <q-input
                v-model="approvalNameVideos"
                class="approvalName"
                filled
                label="Name of approval"
                label-color="orange"
                color="orange"
                dense
                ref="approvalNameVideos"
                :rules="[
                  (val) => !!val || 'Field is required',
                  (val) =>
                    val.length <= 35 || 'Please use maximum 35 characters',
                ]"
              />
              <div class="gap"></div>

              <q-input
                v-model="approvalDetailsVideos"
                ref="approvalDetailsVideos"
                class="approvalDetails"
                label="Details"
                label-color="orange"
                filled
                type="textarea"
                color="orange"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <div class="gap"></div>

              <q-uploader
                label="Upload Videos"
                color="orange"
                square
                flat
                bordered
                @added="videoUpload"
                accept=".mp4,.mkv,.MPEG4, Video/"
                class="videos-dragdrop"
              ></q-uploader>
              <div
                v-if="videoNotUploaded"
                style="color: red; font-size: 12px; margin-left: 23px"
              >
                Field is required
              </div>
              <div class="gap"></div>

              <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 button-div">
                  <q-btn
                    label="cancel"
                    color="red"
                    size="sm"
                    class="cancel-btn"
                    @click="cancelDetailsVideos"
                  ></q-btn>

                  <q-btn
                    type="submit"
                    label="Add members"
                    icon-right="arrow_forward"
                    :no-wrap="true"
                    color="green"
                    size="sm"
                    class="submit-btn"
                  ></q-btn>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
              </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="text">
            <q-form @submit.prevent="onsubmitText">
              <div class="gap"></div>
              <q-input
                v-model="approvalNameText"
                class="approvalName"
                filled
                label="Name of approval"
                label-color="orange"
                color="orange"
                dense
                :rules="[
                  (val) => !!val || 'Field is required',
                  (val) =>
                    val.length <= 35 || 'Please use maximum 35 characters',
                ]"
              />
              <div class="gap"></div>

              <q-input
                v-model="approvalDetailsText"
                ref="approvalDetailsText"
                class="approvalDetails"
                label="Details"
                label-color="orange"
                filled
                type="textarea"
                color="orange"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <div class="gap"></div>

              <div class="q-pa-md q-gutter-sm">
                <q-editor
                  v-model="editorText"
                  ref="editorText"
                  placeholder="Type Something Here..."
                  flat
                  content-class="bg-grey-3"
                  toolbar-text-color="white"
                  toolbar-toggle-color="yellow-8"
                  toolbar-bg="orange"
                  :toolbar="[
                    ['bold', 'italic', 'underline'],
                    [
                      {
                        label: $q.lang.editor.formatting,
                        icon: $q.iconSet.editor.formatting,
                        list: 'no-icons',
                        options: ['p', 'h3', 'h4', 'h5', 'h6', 'code'],
                      },
                    ],
                  ]"
                />
              </div>
              <div
                v-if="noText"
                style="color: red; font-size: 12px; margin-left: 23px"
              >
                Field is required
              </div>

              <div class="gap"></div>

              <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 button-div">
                  <q-btn
                    label="cancel"
                    color="red"
                    size="sm"
                    class="cancel-btn"
                    @click="cancelDetailsText"
                  ></q-btn>

                  <q-btn
                    type="submit"
                    label="Add members"
                    icon-right="arrow_forward"
                    :no-wrap="true"
                    color="green"
                    size="sm"
                    class="submit-btn"
                  ></q-btn>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
              </div>
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-1 col-xs-1"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "documents",
      approvalNameDocuments: "",
      approvalDetailsDocuments: "",
      documentsNotUploaded: false,
      uploadedDatas: null,
      approvalNameLinkExternal: "",
      approvalDetailsLinkExternal: "",
      linkExternal: "",
      approvalNameLinkIframe: "",
      approvalDetailsLinkIframe: "",
      linkIframe: "",
      approvalNameVideos: "",
      approvalDetailsVideos: "",
      videoUploadedData: null,
      videoNotUploaded: false,
      approvalNameText: "",
      approvalDetailsText: "",
      editorText: "",
      noText: false,
    };
  },
  methods: {
    backBtn() {
      this.$router.push({ name: "Home" });
    },
    cancelDocuments() {
      this.$router.push({ name: "Home" });
    },
    fileUpload(val) {
      console.log("ADDED_FILES", val);
      var t = this;
      var reader = new FileReader();
      reader.readAsDataURL(val[0]);
      reader.onloadend = function () {
        var base64data = reader.result;
        t.uploadedDatas = {
          FileName: val[0].name,
          uploadedData: base64data.split("base64,")[1],
        };
        console.log("uploadedFile", t.uploadedDatas);
      };
    },

    onsubmitDocuments() {
      if (this.uploadedDatas === null) {
        this.documentsNotUploaded = true;
        return;
      }

      this.$store.dispatch("submitDocumentData", {
        this: this,
        approvedDocumentsName: this.approvalNameDocuments,
        approvalDetailsDocuments: this.approvalDetailsDocuments,
        uploadedDatas: this.uploadedDatas.uploadedData,
      });
      this.approvalNameDocuments = "";
      this.approvalDetailsDocuments = "";
      this.uploadedDatas = null;
      this.$router.push({ name: "approvalLevels" });
    },

    cancelLinkExternal() {
      this.$router.push({ name: "Home" });
    },
    onsubmitLinkExternal() {
      this.$store.dispatch("submitLinkExternalData", {
        this: this,
        approvedExternalName: this.approvalNameLinkExternal,
        approvalDetailsLinkExternal: this.approvalDetailsLinkExternal,
        linkExternal: this.linkExternal,
      });
      this.approvalNameLinkExternal = "";
      this.approvalDetailsLinkExternal = "";
      this.linkExternal = "";
      this.$router.push({ name: "approvalLevels" });
    },

    cancelLinkIframe() {
      this.$router.push({ name: "Home" });
    },
    onsubmitLinkIframe() {
      this.$store.dispatch("submitLinkIframeData", {
        this: this,
        approvedIframeName: this.approvalNameLinkIframe,
        approvalDetailsLinkIframe: this.approvalDetailsLinkIframe,
        linkIframe: this.linkIframe,
      });
      this.approvalNameLinkIframe = "";
      this.approvalDetailsLinkIframe = "";
      this.linkIframe = "";
      this.$router.push({ name: "approvalLevels" });
    },
    videoUpload(val) {
      console.log("ADDED_FILES", val);
      var t = this;
      var reader = new FileReader();
      reader.readAsDataURL(val[0]);
      reader.onloadend = function () {
        var base64data = reader.result;
        t.videoUploadedData = {
          FileName: val[0].name,
          uploadedData: base64data.split("base64,")[1],
        };
        console.log("uploadedVideo", t.videoUploadedData);
      };
    },
    onsubmitVideos() {
      console.log("videodata", this.videoUploadedData);
      if (this.videoUploadedData === null) {
        this.videoNotUploaded = true;
        return;
      }
      this.$store.dispatch("submitVideoData", {
        this: this,
        approvedVideoName: this.approvalNameVideos,
        approvedDetailsVideo: this.approvalDetailsVideos,
        videoUploadedData: this.videoUploadedData.uploadedData,
      });
      console.log("checking input data", this.approvalNameVideos);
      console.log("checking upload data", this.videoUploadedData);
      this.approvalNameVideos = "";
      this.approvalDetailsVideos = "";
      this.videoUploadedData = null;

      this.$router.push({ name: "approvalLevels" });
    },
    cancelDetailsVideos() {
      this.$router.push({ name: "Home" });
    },

    onsubmitText() {
      console.log("checking input data", this.approvalNameText);
      console.log("checking details data", this.approvalDetailsText);
      console.log("checking text data", this.editorText);

      if (this.editorText === "") {
        this.noText = true;
        return;
      }

      this.$store.dispatch("submitTextData", {
        this: this,
        approvedTextName: this.approvalNameText,
        approvedDetailsText: this.approvalDetailsText,
        editorText: this.editorText,
      });
      this.approvalNameText = "";
      this.approvalDetailsText = "";
      this.editorText = "";
      this.noText = "";
      this.$router.push({ name: "approvalLevels" });
    },
    cancelDetailsText() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped lang="scss">
.tabs {
  margin: 0 auto;
}

.button-div {
  text-align: center;
  position: relative;
  bottom: 9px;
}

.my-card {
  box-shadow: 1px 3px 9px rgb(124, 123, 123);
  position: relative;
  margin-top: 30px;
}

.cancel-btn {
  margin-right: 5px;
  width: 40%;
}
.submit-btn {
  width: 50%;
  height: 25px;
  padding: 0;
  line-height: 9px;
}

.gap {
  padding-top: 20px;
  padding-bottom: 20px;
}

.input-div {
  margin-top: 50px;
  overflow: hidden;
}

.back-btn {
  width: 90px;
  height: 20px;
  margin-top: 10px;
  font-size: 0.8rem;
  padding-bottom: 27px;
}

.approvalName {
  background-color: rgba($color: #fff1f1, $alpha: 0.4);
  color: wheat;
  margin-left: 10px;
  margin-right: 10px;
}

.approvalDetails {
  background-color: rgba($color: #fff1f1, $alpha: 0.4);
  margin-left: 10px;
  margin-right: 10px;
}

.document-dragdrop {
  position: relative;
  left: 10px;
  width: 97%;
}

.externalLink {
  background-color: rgba($color: #fff1f1, $alpha: 0.4);
  color: wheat;
  margin-left: 15px;
  margin-right: 10px;
}
.linkIframe {
  background-color: rgba($color: #fff1f1, $alpha: 0.4);
  color: wheat;
  margin-left: 10px;
  margin-right: 10px;
}

.videos-dragdrop {
  position: relative;
  left: 10px;
  width: 97%;
}

@media only screen and (min-width: 100px) and (max-width: 599px) {
  .back-btn {
    width: 60px;
    height: 20px;
  }
  .submit-btn {
    font-size: 3rem;
  }
}
</style>
