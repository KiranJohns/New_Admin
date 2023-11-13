import axios from "axios";

export const getToken = () => localStorage.getItem(`admin-learnforcare_access`);
export const getAdminType = () => localStorage.getItem("adminType");
export default function fetchData() {
  let BASEURL = "";
  BASEURL = "https://www.testkiran.online/api/admin";
  // BASEURL = "http://localhost:3002/api/user";

  // /www.learnforcare.co.uk

  async function makeRequest(method, url, data = {}) {
    let token = localStorage.getItem(`admin_learnforcare_access`);

    return new Promise((resolve, reject) => {
      try {
        axios({
          method,
          url: `${BASEURL}${url}`,
          data: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
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
