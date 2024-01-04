import axios from "axios";

export const getToken = () => localStorage.getItem(`admin-learnforcare_access`);
export const getAdminType = () => localStorage.getItem("adminType");
export default function fetchData() {
  let BASEURL = "";
  BASEURL = "https://backend.learnforcare.co.uk/api/admin";
  // BASEURL = "http://localhost:3002/api/user";

  // /www.learnforcare.co.uk


  async function makeRequest(method, url, data = {}) {
    let token = localStorage.getItem(`admin_learnforcare_access`);

    return new Promise((resolve, reject) => {
      try {
        axios({
          method,
          url: `${BASEURL}${url}`,
          data: data,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            console.log(error.response);
            reject(error.response);
          });
      } catch (error) {
        reject(error?.message);
      }
    });
  }
  return makeRequest;
}
