import axios from "axios";
import { Modal } from "antd";

const DEVELOPMENT = process.env.NODE_ENV !== "production";

export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH"
};

function validateRequest(options) {
  if (
    options.data &&
    [HTTP_METHOD.POST, HTTP_METHOD.PUT, HTTP_METHOD.PATCH].indexOf(
      options.method
    ) === -1
  ) {
    throw Error(
      "Function call attached with data is only appplicable for request methods 'PUT', 'POST' and 'PATCH'"
    );
  }
}

function throwUnknownError(err) {
  Modal.error({
    title: "Error",
    content: "Unknown: " + JSON.stringify(err),
    centered: true,
    okText: "OK"
  });
  throw new Error("Unknown Error");
}

const axiosOptions = {
  timeout: 30000,
  method: "POST",
  baseURL: window.WEBSERVER,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "cache-control": "no-cache",
    cache: "no-cache"
  },
  withCredentials: true,
  data: {}
};

const service = axios.create(axiosOptions);

service.interceptors.response.use(
  res => {
    if (res.data && res.data.Result) {
      return res.data.Result;
    }
    return res.data;
  },
  err => {
    if (!err.response) {
      throwUnknownError(err);
    }
    switch (err.response.status) {
      case 401: {
        Modal.warning({
          centered: true,
          content: "Session Expired",
          okText: "OK",
          autoFocusButton: "ok",
          onOk: () => undefined
        });
        throw new Error("Session Expired");
      }
      default: {
        throwUnknownError(err);
      }
    }
  }
);

export function invoke(options) {
  if (DEVELOPMENT) {
    validateRequest(options);
  }

  return service.post("/api", options);
}
