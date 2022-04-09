import instance from "../axios";
import * as endpoints from "./endpoints";

export const getApplications = () => {
  return instance.get(endpoints.APPLICATION_API_PATH);
};

export const getApplicationDetail = (applicationId) => {
  return instance.get(
    endpoints.APPLICATION_DETAIL_API_PATH.replace("{}", applicationId)
  );
};

export const createApplication = (payload) => {
  return instance.post(endpoints.APPLICATION_API_PATH, payload);
};
