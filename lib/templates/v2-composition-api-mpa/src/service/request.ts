import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

const errorMessage = (message: string) => {
  Message({
    message,
    type: 'error',
    duration: 2000
  });
};

class BaseRequest {
  instance: AxiosInstance;
  private readonly options: AxiosRequestConfig;

  constructor(options: AxiosRequestConfig) {
    this.options = options;
    this.instance = axios.create(options);
    this.setRequestInterceptor();
    this.setResponseInterceptor();
  }

  setRequestInterceptor() {
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      err => {
        return err;
      }
    );
  }

  setResponseInterceptor() {
    this.instance.interceptors.response.use(
      res => {
        if (res.status !== 200) {
          errorMessage('系统错误');
          return Promise.reject(res);
        }
        return res;
      },
      err => {
        return err;
      }
    );
  }
}

class CommonRequest extends BaseRequest {}

export default CommonRequest;
