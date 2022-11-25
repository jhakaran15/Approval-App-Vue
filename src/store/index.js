import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

Vue.use(Vuex);

const apiBizagi = "https://projects.nimble.expert/ApprovalApi/";
const apiURL = "https://projects.nimble.expert";

const dashboardLink = "http://localhost:8080/";
// const dashboardLink = "https://projects.nimble.expert/ApprovalVueApp/";

const nTime = 5000;

export default new Vuex.Store({
  state: {
    microsoftUrl: "",
    isLoading: false,
    user: "",

    documentsData: {
      ApprovalName: "",
      ApprovalDetails: "",
      ApprovalFile: "",
    },
    externalLinkData: {
      ApprovalName: "",
      ApprovalDetails: "",
      ApprovalFile: "",
    },
    linkIframeData: {
      ApprovalName: "",
      ApprovalDetails: "",
      ApprovalFile: "",
    },
    videoData: {
      ApprovalName: "",
      ApprovalDetails: "",
      ApprovalFile: "",
    },
    textData: {
      ApprovalName: "",
      ApprovalDetails: "",
      ApprovalFile: "",
    },
    listApprovals: "",
    getStatusListApprovals: "",
    IdOfApprovalFlow: "",
    getListApprovals: "",
    // date: moment().format('DD MMMM YYYY'),
    // todayDate: false,
    UserGuid: "",
    approvalData: "",
  },
  mutations: {
    SET_MICROSOFT_URL(state, microsoftUrl) {
      state.microsoftUrl = microsoftUrl;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    documentObject(state, payload) {
      state.documentsData.ApprovalName = payload.approvedDocumentsName;
      state.documentsData.ApprovalDetails = payload.approvalDetailsDocuments;
      state.documentsData.ApprovalFile = payload.uploadedDatas;
    },
    externalLinkObject(state, payload) {
      state.externalLinkData.ApprovalName = payload.approvedExternalName;
      state.externalLinkData.ApprovalDetails =
        payload.approvalDetailsLinkExternal;
      state.externalLinkData.ApprovalFile = payload.linkExternal;
    },
    linkIframeObject(state, payload) {
      state.externalLinkData.ApprovalName = payload.approvedIframeName;
      state.externalLinkData.ApprovalDetails =
        payload.approvalDetailsLinkIframe;
      state.externalLinkData.ApprovalFile = payload.linkIframe;
    },
    videoObject(state, payload) {
      state.videoData.ApprovalName = payload.approvedVideoName;
      state.videoData.ApprovalDetails = payload.approvedDetailsVideo;
      state.videoData.ApprovalFile = payload.videoUploadedData;
    },
    textObject(state, payload) {
      state.textData.ApprovalName = payload.approvedTextName;
      state.textData.ApprovalDetails = payload.approvedDetailsText;
      state.textData.ApprovalFile = payload.editorText;
    },
    approvalCard(state, data) {
      state.listApprovals = data;
    },

    approvalDataCard(state, data) {
      state.approvalData = data;
    },

    approvalstatusPage(state, data) {
      state.getStatusListApprovals = data;
    },
  },
  actions: {
    getLoginUrls({ commit, dispatch }, This) {
      commit("SET_LOADING", true);
      axios
        .get(
          apiBizagi +
            "api/Account/ExternalLogins?returnUrl=" +
            dashboardLink +
            "&generateState=true"
        )
        .then((data) => {
          console.log("LOGIN_URLS", data);
          commit("SET_MICROSOFT_URL", data.data[1].Url);
          commit("SET_LOADING", false);
        })
        .catch((err) => {
          console.log("ERROR", err);
          commit("SET_LOADING", false);
        });
    },
    loginWithMicrosoft({ commit, state, dispatch }, This) {
      console.log("microsoftUrl", state.microsoftUrl);
      localStorage.setItem("microsoftUrl", state.microsoftUrl);
      window.location.href = apiURL + state.microsoftUrl;
      console.log("URI", window.location.hash);
    },
    getUser({ commit, state, dispatch }, This) {
      commit("SET_LOADING", true);
      axios.defaults.headers.common["Authorization"] =
        "bearer " + sessionStorage.getItem("token");

      axios
        .get(apiBizagi + "api/UserInfo/GetUserInfoDetals")
        .then(({ data }) => {
          console.log("USER_DETAILS", data);
          commit("SET_USER", data);
          commit("SET_LOADING", false);
        })
        .catch((error) => {
          console.log("Error", error.message);
          console.log("ERROR", error.response.status);
          commit("SET_LOADING", false);
          if (error.response.status == 401) {
            This.this.$router.push({ name: "Login" });
          } else if (error.response.status == 404) {
            This.this.$notify({
              group: "foo",
              type: "warn",
              text: "Authentication failed, the user cannot access the dashboard.",
              duration: nTime,
            });
            This.this.$router.push({ name: "Login" });
          } else {
            This.this.$notify({
              group: "foo",
              type: "error",
              text: error.message,
              duration: nTime,
            });
          }
        });
    },

    sendEmail({ commit, state, dispatch }, This) {
      if (state.documentsData.ApprovalName !== "") {
        // if (This.approvedDocumentsName !== "") {
        console.log("CHECKING APPROVAL LEVELS", This.approvalLevels);
        const documentObj = {
          UserId: state.user.UserId,
          IdTypeOfApproval: 1,
          ApprovalName: state.documentsData.ApprovalName,
          ApprovalDetails: state.documentsData.ApprovalDetails,
          ApprovalFile: state.documentsData.ApprovalFile,
          approvaluserdatas: This.approvalLevels,
        };
        // const documentObj = {
        //   UserId: state.user.UserId,
        //   IdTypeOfApproval: 1,
        //   ApprovalName: This.approvedDocumentsName,
        //   ApprovalDetails: This.approvalDetailsDocuments,
        //   ApprovalFile: This.uploadedDatas,
        //   approvaluserdatas: This.test,
        // };
        console.log("DOCUMENTS_OBJ", documentObj);
        axios
          .post(apiBizagi + "api/Approval/vuePostApprovals", documentObj)
          .then((data) => {
            console.log("document", data);
            state.documentsData = null;
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else if (state.externalLinkData.ApprovalName !== "") {
        const linkExternalObj = {
          UserId: state.user.UserId,
          IdTypeOfApproval: 2,
          ApprovalName: state.externalLinkData.ApprovalName,
          ApprovalDetails: state.externalLinkData.ApprovalDetails,
          ApprovalFile: state.externalLinkData.ApprovalFile,
          approvaluserdatas: This.approvalLevels,
        };
        console.log("LINKEXTERNAL_OBJ", linkExternalObj);
        axios
          .post(apiBizagi + "api/Approval/vuePostApprovals", linkExternalObj)
          .then((data) => {
            console.log("linkexternal", data);
            state.externalLinkData = null;
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else if (state.linkIframeData.ApprovalName !== "") {
        const linkIframeObj = {
          UserId: state.user.UserId,
          IdTypeOfApproval: 3,
          ApprovalName: state.linkIframeData.ApprovalName,
          ApprovalDetails: state.linkIframeData.ApprovalDetails,
          ApprovalFile: state.linkIframeData.ApprovalFile,
          approvaluserdatas: This.approvalLevels,
        };
        console.log("LINKIFRAME_OBJ", linkIframeObj);
        axios
          .post(apiBizagi + "api/Approval/vuePostApprovals", linkIframeObj)
          .then((data) => {
            console.log("linkiframe", data);
            state.externalLinkData = null;
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else if (state.videoData.ApprovalName !== "") {
        const videoObj = {
          UserId: state.user.UserId,
          IdTypeOfApproval: 4,
          ApprovalName: state.videoData.ApprovalName,
          ApprovalDetails: state.videoData.ApprovalDetails,
          ApprovalFile: state.videoData.ApprovalFile,
          approvaluserdatas: This.approvalLevels,
        };
        console.log("VIDEO_OBJ", videoObj);
        axios
          .post(apiBizagi + "api/Approval/vuePostApprovals", videoObj)
          .then((data) => {
            console.log("VIDEO", data);
            state.videoData = null;
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else if (state.textData.ApprovalName !== "") {
        const textObj = {
          UserId: state.user.UserId,
          IdTypeOfApproval: 5,
          ApprovalName: state.textData.ApprovalName,
          ApprovalDetails: state.textData.ApprovalDetails,
          ApprovalFile: state.textData.ApprovalFile,
          approvaluserdatas: This.approvalLevels,
        };
        console.log("TEXT_OBJ", textObj);
        axios
          .post(apiBizagi + "api/Approval/vuePostApprovals", textObj)
          .then((data) => {
            console.log("TEXT", data);
            state.textData = null;
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },

    submitDocumentData({ commit }, payload) {
      commit("documentObject", payload);
      //   // const documentObj = {
      //   //   UserId: state.user.UserId,
      //   //   IdTypeOfApproval: 1,
      //   //   ApprovalName: This.approvedDocumentsName,
      //   //   ApprovalDetails: This.approvalDetailsDocuments,
      //   //   ApprovalFile: This.uploadedDatas,
      //   //   approvaluserdatas: [
      //   //     {
      //   //       ApprovalUserName: "sample string 1",
      //   //       ApprovalUserEmailId: "sample string 2",
      //   //       SequenceNo: "sample string 3",
      //   //     },
      //   //     {
      //   //       ApprovalUserName: "sample string 1",
      //   //       ApprovalUserEmailId: "sample string 2",
      //   //       SequenceNo: "sample string 3",
      //   //     },
      //   //   ],
      //   // };
      //   // console.log("DOCUMENTS_OBJ", documentObj);
      //   // axios
      //   //   .post(apiBizagi + "api/Approval/PostApproval", documentObj)
      //   //   .then((data) => {
      //   //     console.log("document", data);
      //   //     // commit("SET_USER", data);
      //   //   })
      //   //   .catch((error) => {
      //   //     console.log(error.message);
      //   //   });
    },

    submitLinkExternalData({ commit }, payload) {
      commit("externalLinkObject", payload);
      //   // const linkExternalObj = {
      //   //   UserId: state.user.UserId,
      //   //   IdTypeOfApproval: 2,
      //   //   ApprovalName: This.approvalNameLinkExternal,
      //   //   ApprovalDetails: This.approvalDetailsLinkExternal,
      //   //   ApprovalFile: This.linkExternal,
      //   //   approvaluserdatas: [
      //   //     {
      //   //       ApprovalUserName: "sample string 1",
      //   //       ApprovalUserEmailId: "sample string 2",
      //   //       SequenceNo: "sample string 3",
      //   //     },
      //   //     {
      //   //       ApprovalUserName: "sample string 1",
      //   //       ApprovalUserEmailId: "sample string 2",
      //   //       SequenceNo: "sample string 3",
      //   //     },
      //   //   ],
      //   // };
      //   // console.log(linkExternalObj);
      //   // axios
      //   //   .post(apiBizagi + "api/Approval/PostApproval", linkExternalObj)
      //   //   .then((data) => {
      //   //     console.log("new", data);
      //   //     // commit("SET_USER", data);
      //   //   })
      //   //   .catch((error) => {
      //   //     console.log(error.message);
      //   });
    },

    // submitLinkIframeData({ commit, state }, This) {
    //   const linkIframeObj = {
    //     UserId: state.user.UserId,
    //     IdTypeOfApproval: 3,
    //     ApprovalName: This.approvalNameLinkIframe,
    //     ApprovalDetails: This.approvalDetailsLinkIframe,
    //     ApprovalFile: This.linkIframe,
    //     approvaluserdatas: [
    //       {
    //         ApprovalUserName: "sample string 1",
    //         ApprovalUserEmailId: "sample string 2",
    //         SequenceNo: "sample string 3",
    //       },
    //       {
    //         ApprovalUserName: "sample string 1",
    //         ApprovalUserEmailId: "sample string 2",
    //         SequenceNo: "sample string 3",
    //       },
    //     ],
    //   };
    //   console.log(linkIframeObj);
    //   axios
    //     .post(apiBizagi + "api/Approval/PostApproval", linkIframeObj)
    //     .then((data) => {
    //       console.log("new", data);
    //       // commit("SET_USER", data);
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //     });
    // },
    submitLinkIframeData({ commit }, payload) {
      commit("linkIframeObject", payload);
    },

    submitVideoData({ commit }, payload) {
      commit("videoObject", payload);
      // ({ commit, state }, This) {
      //   const videoObj = {
      //     UserId: state.user.UserId,
      //     ApprovalName: This.approvedVideoName,
      //     IdTypeOfApproval: 4,
      //     approvaluserdatas: [
      //       {
      //         ApprovalUserName: "sample string 1",
      //         ApprovalUserEmailId: "sample string 2",
      //         SequenceNo: "sample string 3",
      //       },
      //       {
      //         ApprovalUserName: "sample string 1",
      //         ApprovalUserEmailId: "sample string 2",
      //         SequenceNo: "sample string 3",
      //       },
      //     ],
      //   };
      //   console.log(videoObj);
      //   axios
      //     .post(apiBizagi + "api/Approval/PostApproval", videoObj)
      //     .then((data) => {
      //       console.log("new", data);
      //     })
      //     .catch((error) => {
      //       console.log(error.message);
      //     });
    },

    submitTextData({ commit }, payload) {
      commit("textObject", payload);
      //   const textObj = {
      //     UserId: state.user.UserId,
      //     ApprovalName: This.approvedTextName,
      //     IdTypeOfApproval: 5,
      //     approvaluserdatas: [
      //       {
      //         ApprovalUserName: "sample string 1",
      //         ApprovalUserEmailId: "sample string 2",
      //         SequenceNo: "sample string 3",
      //       },
      //       {
      //         ApprovalUserName: "sample string 1",
      //         ApprovalUserEmailId: "sample string 2",
      //         SequenceNo: "sample string 3",
      //       },
      //     ],
      //   };
      //   console.log(textObj);
      //   axios
      //     .post(apiBizagi + "api/Approval/PostApproval", textObj)
      //     .then((data) => {
      //       console.log("new", data);
      //     })
      //     .catch((error) => {
      //       console.log(error.message);
      //     });
    },

    submitOtpData({ commit, dispatch }, This) {
      commit("SET_LOADING", true);
      axios.defaults.headers.common["Authorization"] =
        "bearer " + sessionStorage.getItem("token");

      const otpObj = {
        password: This.approvedOtpData,
      };
      console.log("OTP_OBJ", otpObj);
      axios
        .post(apiBizagi + "api/Userpasscode/Password", otpObj)
        .then((data) => {
          console.log("POST_OTP_RESULT ====>", data);
          if (data.status === 200) {
            // This.this.$router.push({ name: "approve" });
            This.this.$router.replace({ path: "/approve" });
          }
        })
        .catch((error) => {
          console.log(error.message);
          commit("SET_LOADING", false);
          if (error.response.status == 404) {
            This.this.$notify({
              group: "foo",
              type: "error",
              text: "Incorrect Password.",
              duration: nTime,
            });
          }
        });
    },

    getapprovalslist({ commit, state }, This) {
      commit("SET_LOADING", true);
      axios.defaults.headers.common["Authorization"] =
        "bearer " + sessionStorage.getItem("token");
      // let arr=[This.updateChart.series];
      axios
        .get(apiBizagi + "api/Approval/ListApprovals")
        .then((data) => {
          console.log("GET_APPROVALS_LIST ====>", data);

          data.data.map((obj) => {
            console.log("GET_APPROVED_COUNT", obj);
            // console.log("GET_REJECTED_COUNT", obj.CountRejectedUsers,);
            // console.log("GET_PENDING_COUNT", obj.CountPending,);

             let arr1=[obj.CountApprovedUsers,obj.CountRejectedUsers,obj.CountPending]
             This.updateChart.series=arr1;
           // This.updateChart.series.push(obj.CountApprovedUsers,obj.CountRejectedUsers,obj.CountPending);
            
          });
          commit("approvalCard", data);
          commit("SET_LOADING", false);
        })
        .catch((error) => {
          console.log(error.message);
          commit("SET_LOADING", false);
        });
    },

    getstatusapprovals({ commit, state }, This) {
      commit("SET_LOADING", true);
      state.IdOfApprovalFlow = localStorage.getItem("idApprovalFlow");
      axios.defaults.headers.common["Authorization"] =
        "bearer " + sessionStorage.getItem("token");
      axios
        .get(
          apiBizagi +
            "api/Approval/FlowDiagramOfApproval?IdOfApprovalFlow=" +
            state.IdOfApprovalFlow
        )
        .then((data) => {
          console.log("GET_APPROVAL_STATUS ====>", data);
          commit("approvalstatusPage", data);
          commit("SET_LOADING", false);
        })
        .catch((error) => {
          console.log(error.message);
          commit("SET_LOADING", false);
        });
    },
    userDataVerification({ commit, state }, This) {
      // commit("SET_LOADING", false);
      axios
        .get(
          apiBizagi +
            "api/Userpasscode/Approvaluserpage?ApprovalUserGuID=" +
            state.UserGuid
        )
        .then((data) => {
          commit("SET_LOADING", false);
          console.log("GET_USERDATA ====>", data);
          commit("approvalDataCard", data);
        })
        .catch((error) => {
          console.log(error.message);
          //  commit("SET_LOADING", false);
          if (error.response.status == 400) {
            This.this.$notify({
              group: "foo",
              type: "warn",
              text: "Page not found",
              duration: nTime,
            });
          }
        });
    },

    verification({ commit, state }, This) {
      if (This.status === "Approved" || This.status === "Rejected") {
        const statusData = {
          ApprovalUserGuID: state.UserGuid,
          Status: This.status,
          Comments: This.comments,
        };

        axios
          .put(apiBizagi + "api/Userpasscode/VueApprovalstatusdata", statusData)
          .then((data) => {
            console.log("VERIFIED ====>", data);
            if (data.status == 200) {
              // This.this.$router.push({ name: "resPonseSubmitted" });
              This.this.$router.replace({ path: "/responseSubmitted" });
            }
            // commit("approvalCard", data);
          })
          .catch((error) => {
            console.log(error.message);
            //  commit("SET_LOADING", false);
          });
      } else if (This.status === "need more info") {
        const needMoreInfoData = {
          ApprovalUserGuID: state.UserGuid,
          Moreinformation: This.comments,
        };
        axios
          .put(apiBizagi + "api/Userpasscode/Moreinfo", needMoreInfoData)
          .then((data) => {
            if (data.status == 200) {
              // This.this.$router.push({ name: "resPonseSubmitted" });
              This.this.$router.replace({ path: "/responseSubmitted" });
            }
            console.log("NEED MORE INFO ====>", data);

            // commit("approvalCard", data);
          })
          .catch((error) => {
            console.log(error.message);
            //  commit("SET_LOADING", false);
          });
      }
    },
  },
});
