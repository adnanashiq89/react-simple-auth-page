import { apiConst } from '../../../constants/api.constants';
import { MyAxios } from '../../axios';
import { appTokenName } from '../../../constants';

export const login = (reqObject) =>
  new Promise((resolve, reject) => {
    const data = JSON.stringify(reqObject);

    const config = {
      method: 'post',
      url: `${apiConst.auth}${apiConst.login}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    MyAxios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const signup = (reqObject) =>
  new Promise((resolve, reject) => {
    const data = JSON.stringify(reqObject);

    const config = {
      method: 'post',
      url: `${apiConst.auth}${apiConst.signUp}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    MyAxios(config)
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });

export const forgetPassword = (reqObject) =>
  new Promise((resolve, reject) => {
    const data = JSON.stringify(reqObject);

    const config = {
      method: 'post',
      url: `${apiConst.auth}${apiConst.forgetPassword}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    MyAxios(config)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

export const otpVerify = (reqObject) =>
  new Promise((resolve, reject) => {
    const data = JSON.stringify(reqObject);

    const config = {
      method: 'post',
      url: `${apiConst.auth}${apiConst.verifyOtp}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    MyAxios(config)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

export const resetPassword = (reqObject) =>
  new Promise((resolve, reject) => {
    const data = JSON.stringify(reqObject);

    const config = {
      method: 'post',
      url: `${apiConst.auth}${apiConst.resetPssword}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    MyAxios(config)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

export const myProfile = () =>
  new Promise((resolve, reject) => {
    const config = {
      method: 'get',
      url: `${apiConst.profileMe}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.get(appTokenName)}`,
      },
    };
    MyAxios(config)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
