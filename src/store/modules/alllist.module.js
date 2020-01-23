import { make } from "vuex-pathify";
import { getAllList, getListPagination } from "../../api/list.api";

const state = {
  supplierlist: [],
  jobList: [],
  Request: {
    "RequestsSubjects": {
      "SubjectsName": null,
      "WriteDate": "0001-01-01T00:00:00",
      "WriteWhere": null,
      "ReceiveNo": null,
      "ReceiveDate": "0001-01-01T00:00:00",
      "Receiver": null,
      "RequesterSign": {
        "FullName": null,
        "Signed": false,
        "SignType": null,
        "TestSubs": {
            "A":{
                "B": {
                    "C": {
                        "D":{
                            "LastRoot": "LastRequest!"
                        }
                    }
                }
            }
        }
      }
    },
    "Requester": {
      "Requester": {
        "FullName": null,
        "OfficeName": null,
        "OfficeTel": null,
        "PersonType": 0,
        "JuristicType": null,
        "RegisterDate": "0001-01-01T00:00:00",
        "RegisterNo": null,
        "AuthorizedPerson": {
          "FullName": null,
          "OfficeName": null,
          "OfficeTel": null,
          "PersonType": 0,
          "JuristicType": null,
          "RegisterDate": "0001-01-01T00:00:00",
          "RegisterNo": null,
          "AuthorizedPerson": null,
          "HouseNo": null,
          "VillageNo": null,
          "SubStreetName": null,
          "StreetName": null,
          "CitySubDivisionName": null,
          "CityName": null,
          "CountrySubDivisionName": null,
          "PostCode": null,
          "Tel": null
        },
        "HouseNo": null,
        "VillageNo": null,
        "SubStreetName": null,
        "StreetName": null,
        "CitySubDivisionName": null,
        "CityName": null,
        "CountrySubDivisionName": null,
        "PostCode": null,
        "Tel": null
      }
    },
    "Taget": {
      "TitleDeeds": {
        "FullName": null,
        "OfficeName": null,
        "OfficeTel": null,
        "PersonType": 0,
        "JuristicType": null,
        "RegisterDate": "0001-01-01T00:00:00",
        "RegisterNo": null,
        "AuthorizedPerson": null,
        "HouseNo": null,
        "VillageNo": null,
        "SubStreetName": null,
        "StreetName": null,
        "CitySubDivisionName": null,
        "CityName": null,
        "CountrySubDivisionName": null,
        "PostCode": null,
        "Tel": null
      },
      "ListBuildDescs": [
        {
          "BuildType": 0,
          "BuildUnit": 0,
          "BuildFor": 0,
          "BuildArea": 0.0,
          "CarParking": 0
        },
        {
          "BuildType": 0,
          "BuildUnit": 0,
          "BuildFor": 0,
          "BuildArea": 0.0,
          "CarParking": 0
        },
        {
          "BuildType": 0,
          "BuildUnit": 0,
          "BuildFor": 0,
          "BuildArea": 0.0,
          "CarParking": 0
        }
      ],
      "Supervisor": {
        "LicenseNo": null,
        "LicenseType": null,
        "LicenseMajor": null,
        "LicenseMinor": null,
        "Nationality": null,
        "EngineeAge": 0,
        "FullName": null,
        "PersonType": 0,
        "OfficeName": null,
        "OfficeTel": null,
        "HouseNo": null,
        "VillageNo": null,
        "SubStreetName": null,
        "StreetName": null,
        "CitySubDivisionName": null,
        "CityName": null,
        "CountrySubDivisionName": null,
        "PostCode": null,
        "Tel": null
      },
      "DesignAndCalculation": {
        "LicenseNo": null,
        "LicenseType": null,
        "LicenseMajor": null,
        "LicenseMinor": null,
        "Nationality": null,
        "EngineeAge": 0,
        "FullName": null,
        "PersonType": 0,
        "OfficeName": null,
        "OfficeTel": null,
        "HouseNo": null,
        "VillageNo": null,
        "SubStreetName": null,
        "StreetName": null,
        "CitySubDivisionName": null,
        "CityName": null,
        "CountrySubDivisionName": null,
        "PostCode": null,
        "Tel": null
      },
      "CompletedDays": 0,
      "PlanCopy": 0,
      "PlanPage": 0,
      "CalculationsCopy": 0,
      "ConsentDesignAndCalculationCopy": 0,
      "LicenseDesignAndCalculationCopy": 0,
      "TitleDeedsCopy": 0,
      "ConsentOwnerTitleDeedsCopy": 0,
      "ConsentSupervisorCopy": 0,
      "LicenseSupervisorCopy": 0,
      "OtherDocs": null,
      "NotifyWithIn": "0001-01-01T00:00:00",
      "LicenseFee": 0.0,
      "PlanInspectionFee": 0.0,
      "ReceiptVolumnNo": null,
      "ReceiptNo": null,
      "ReceiptDate": "0001-01-01T00:00:00",
      "IssueLicenseVolumnNo": null,
      "IssueLicenseNo": null,
      "IssueLicenseDate": null,
      "Authorities": {
        "FullName": null,
        "Signed": false,
        "SignType": null
      }
    }
  }
};

const mutations = {
  ...make.mutations(state)
};

const getters = {
    ...make.getters(state),
    sortDataGetters: state => {
        return state.supplierList.suppliers//.filter(item => item.age.toString().includes(1))
    },

    sortDataGettersSearch: (state, getters) => {
        return state.supplierList.suppliers//.filter(item => item.age.toString().includes(2))
    },
    
};

const actions = {
  //...make.actions(state),

  allListAction({ commit }) {
    getAllList().then(res => {
     if(res !=null){
      commit("SET_SUPPLIERLIST", res.data);
     }
    });
  },

  listPaginationAction({ commit },  resBody ){
    var json = {
      pagesize: 10,
      pagenumber: 1,
      orderproperty: "CREATEDATE",
      orderbydescending: true,
      search: []
    };
    getListPagination(json).then(res => {
      commit("SET_JOB_LIST", res.data)
    }).catch(error => {
      console.log(error)
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
