import router from "@/router";
import axios, { HttpStatusCode } from "axios";

interface RequestParams {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
  data?: any;
  successCallback: (data: any) => void;
  failureCallback: (err: any) => void;
}

const rqt = ({
  url,
  method,
  data,
  successCallback,
  failureCallback,
}: RequestParams) => {
  axios({
    url,
    method,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(`${localStorage.getItem("api_token")}`),
    },
  })
    .then((data) => successCallback(data))
    .catch((err) => {
      if (err?.data?.response?.status === HttpStatusCode.Unauthorized) {
        router.push("login");
      } else {
        return failureCallback(err);
      }
    });
};

export default rqt;
