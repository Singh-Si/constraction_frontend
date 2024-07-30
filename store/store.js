import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/loginslice/LoginSlice";
import VerifyOtpSlice from "@/store/VerifyOtpSlice";
import SettingUpAccountUser from "@/store/settingupaccouontslice/SettingUpAccountSlice";
import CreateOrgUser from "@/store/createorgslice/CreateOrgSlice";
import CreateSite from "@/store/createSite/CreateSiteSlice";
import fetchrolesAsync from "@/store/rolesandpermission/RoleandPermission";
import getOrganizationAsync from "@/store/organisation/fetchOrganisation";
import getSiteAsync from "@/store/createSite/GetSites";
import getAllmember from "@/store/member/allmember";
import fetchmemberBySite from "@/store/member/memberbysites";
import fetchOrganizationplan from "@/store/plan/plan";
import organizationProfilePatchAsync from "@/store/organization-profile/OrganizationProfile";
import fetchProfileDataAsync from "@/store/userProfile/UserProfileSlice";
import TaskSlice from "./taskslice/TaskSlice";
import siteSlice from "@/store/siteSlice";
import UserPermisionSlice from "./UserPermisionSlice";
import workSlice from "./organization-profile/work-category";
import memberSlice from "./member/MemberSlice";
import vendorSlice from "./vendor/getvendor";
import bomMaterialSlice from "./material/Bom";
import gettodayAttendenceSlice from './attendence/getTodayAttendence'  
import fetchlabourSlice from './Labourfetch/labourfetch'
import IndentSlice from "./material/IndentSlice";
import allIndentSlice from "./stock/indents";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loginotp: VerifyOtpSlice,
    usersetupaccount: SettingUpAccountUser,
    createorg: CreateOrgUser,
    createsite: CreateSite,
    fetchrolesAsync: fetchrolesAsync,
    getOrganizationAsync: getOrganizationAsync,
    getSiteAsync: getSiteAsync,
    getAllmember: getAllmember,
    fetchmemberBySite: fetchmemberBySite,
    fetchOrganizationplan: fetchOrganizationplan,
    organizationProfilePatchAsync: organizationProfilePatchAsync,
    fetchProfileDataAsync: fetchProfileDataAsync,
    TaskSlice: TaskSlice,
    siteSlice: siteSlice,
    UserPermisionSlice: UserPermisionSlice,
    MemberSlice: memberSlice,
    workSlice: workSlice,
    vendorSlice:vendorSlice,
    bomMaterialSlice: bomMaterialSlice,
    gettodayAttendenceSlice:gettodayAttendenceSlice,
    fetchlabourSlice:fetchlabourSlice,
    IndentSlice: IndentSlice,
    allIndentSlice: allIndentSlice,
  },
});

export default store;
