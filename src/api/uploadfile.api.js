import { httpClient } from "./httpClient";

const UPLOAD_FILE = "/job/upload";
const uploadFile = formData => {
  return httpClient.post(UPLOAD_FILE, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export { uploadFile };
