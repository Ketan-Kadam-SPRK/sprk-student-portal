import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  userId: null,
  userDetails: null,
  examsData: null,
  userProfilePic: null,
  orgDetails: {
    orgName: null,
    orgLogo: null,
    orgAddress: null,
    orgWeb: null,
    orgCertificate: null,
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    setLogout: (state) => {
      state.token = null;
      state.user = null;
      state.userId = null;
      state.userDetails = null;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload.userDetails;
    },
    setUserProfilePic: (state, action) => {
      state.userProfilePic = action.payload.userProfilePic;
    },
    setOrgDetails: (state, action) => {
      state.orgDetails = action.payload.orgDetails;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setUserDetails,
  setUserProfilePic,
  setOrgDetails,
} = authSlice.actions;

export default authSlice.reducer;
