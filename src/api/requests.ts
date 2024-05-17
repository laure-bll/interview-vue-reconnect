import axios from "axios";
import { accessToken } from "@/api/auth";

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
      Authorization: "Bearer " + JSON.parse(`${accessToken}`),
    },
  })
    .then((data) => successCallback(data))
    .catch((err) => failureCallback(err));
};

export default rqt;
