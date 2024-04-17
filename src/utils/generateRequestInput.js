import { API_URL } from "../constants.js";

const generateRequestInput = (url) => {
  return {
    method: "POST",
    url: `${API_URL}/v1/url`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    data: {
      url: url,
    },
  };
};

export default generateRequestInput;
