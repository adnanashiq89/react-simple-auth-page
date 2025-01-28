import { createSlice } from '@reduxjs/toolkit';
import Router from 'next/router';
import {
  requestFailed,
  requestSucceeded,
  setUserEmail,
  setUserToken,
  startLoading,
  stopLoading,
  setCurrentUser,
} from '../app/app.slice';

import {
  forgetPassword,
  login,
  myProfile,
  otpVerify,
  resetPassword,
  signup,
} from './auth.api';
import { errorConst, responseCodeConst } from '../../../constants';

const initialState = {
  authState: false,
  authUser: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state = initialState, action) {
      state.authState = action.payload;
    },
    setAuthUser(state = initialState, action) {
      state.authUser = action.payload;
    },
  },
});

export const { setAuthState, setAuthUser } = authSlice.actions;
export const selectAuthState = (state) => state.auth.authState;
export const selectAuthUser = (state) => state.auth.authUser;
export const userLoginApi = (reqObject) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const res = await login(reqObject);
    dispatch(setUserToken(res.accessToken));
    dispatch(requestSucceeded());
    location.href = '/';
  } catch (err) {
    if (err.response.data.statusCode === responseCodeConst.NOT_FOUND) {
      dispatch(
        requestFailed(
          typeof err.response.data.message === 'object'
            ? {
                error: errorConst.INCORRECT_EMAIL,

                statusCode: err.response.data.statusCode,
              }
            : {
                error: errorConst.INCORRECT_EMAIL,

                statusCode: err.response.data.statusCode,
              }
        )
      );
    } else if (
      err.response.data.statusCode === responseCodeConst.UNAUTHORIZED
    ) {
      dispatch(
        requestFailed(
          typeof err.response.data.message === 'object'
            ? {
                error: errorConst.INCORRECT_PASSWORD,
                statusCode: err.response.data.statusCode,
              }
            : {
                error: errorConst.INCORRECT_PASSWORD,
                statusCode: err.response.data.statusCode,
              }
        )
      );
    }
  }
  dispatch(stopLoading());
};
export const userSignupApi = (reqObject) => async (dispatch) => {
  dispatch(startLoading());
  reqObject.role = 'USER';
  try {
    await signup(reqObject);
    dispatch(requestSucceeded());
    Router.push('/login');
  } catch (err) {
    if (err.response.data.statusCode === responseCodeConst.NOT_FOUND) {
      dispatch(
        requestFailed(
          typeof err.response.data.message === 'object'
            ? {
                error: errorConst.INCORRECT_REFCODE,
                statusCode: err.response.data.statusCode,
              }
            : {
                error: errorConst.INCORRECT_REFCODE,
                statusCode: err.response.data.statusCode,
              }
        )
      );
    }
    if (err.response.data.statusCode === responseCodeConst.ALREADY_EXIST) {
      dispatch(
        requestFailed(
          typeof err.response.data.message === 'object'
            ? {
                error: errorConst.EMAIL_ALREADY_EXIST,
                statusCode: err.response.data.statusCode,
              }
            : {
                error: errorConst.EMAIL_ALREADY_EXIST,
                statusCode: err.response.data.statusCode,
              }
        )
      );
    }
  }
  dispatch(stopLoading());
};
export const forgetPasswordApi =
  (reqObject, ResendCode) => async (dispatch) => {
    if (ResendCode === false) {
      dispatch(startLoading());
    }
    dispatch(setUserEmail(reqObject.email));
    try {
      await forgetPassword(reqObject);
      dispatch(requestSucceeded());
    } catch (err) {
      dispatch(
        requestFailed({
          error: errorConst.EMAIL_NOT_EXIST,
          statusCode: err.response.data.statusCode,
        })
      );
    }
    dispatch(stopLoading());
  };
export const otpVerifyApi = (reqObject) => async (dispatch) => {
  reqObject.otp = `${reqObject.codeOne}${reqObject.codeTwo}${reqObject.codeThree}${reqObject.codeFour}`;
  delete reqObject.codeOne;
  delete reqObject.codeTwo;
  delete reqObject.codeThree;
  delete reqObject.codeFour;
  dispatch(startLoading());
  try {
    const res = await otpVerify(reqObject);
    dispatch(requestSucceeded());
    dispatch(setUserEmail(res.email));
    if (res.email) {
      Router.push('/reset-password');
    }
  } catch (err) {
    dispatch(
      requestFailed({
        error: errorConst.OTP_INCORRECT,
        statusCode: err.response.data.statusCode,
      })
    );
  }
  dispatch(stopLoading());
};
export const resetPasswordApi = (reqObject) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const res = await resetPassword(reqObject);
    dispatch(setCurrentUser(res));
    dispatch(requestSucceeded());
  } catch (err) {
    dispatch(
      requestFailed({
        error: errorConst.OTP_INCORRECT,
        statusCode: err.response.data.statusCode,
      })
    );
  }
  dispatch(stopLoading());
};
export const userProfileApi = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const res = await myProfile();
    dispatch(requestSucceeded());
    dispatch(setCurrentUser(res));
  } catch (err) {
    if (err.response?.data.statusCode === responseCodeConst.INTERNAL_ERROR) {
      dispatch(
        requestFailed({
          error: errorConst.INTERNAL_ERROR,
          statusCode: err.response.data.statusCode,
        })
      );
    } else if (err.response?.data.statusCode === responseCodeConst.NOT_FOUND) {
      dispatch(
        requestFailed({
          error: errorConst.NOT_FOUND,
          statusCode: err.response.data.statusCode,
        })
      );
    }
  }
  dispatch(stopLoading());
};

export default authSlice;
