import React from "react";
import Table from "react-bootstrap/Table";
import fetchData from "../../../axios";
import { useEffect } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";



const BundleMatrix = () => {

  const makeRequest = fetchData();
  const [courseName, setCourseName] = useState([]);
  const [userName, setUserName] = useState([]);
  const [course, setCourse] = useState([]);
  const [managers, setManagers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const [manager, setManager] = useState(0);

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  useEffect(() => {
    makeRequest("GET", "/info/get-all-users")
      .then((res) => {
        setUsers(res.data.response);
        setCompanies(res.data.response.filter(item => item.type_of_account == "company"));
        setManagers(res.data.response.filter(item => item.type_of_account == "manager"));
        setManager(res.data.response.find(item => item.type_of_account == "manager")?.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const form = new FormData();
    form.append("manager_id", manager);
    makeRequest("POST", "/course/get-manager-matrix-course", form)
      .then((res) => {
        let temp = {
          color: "gray",
          progress: "",
        };
        // console.log(res.data.response);
        let users = res.data.response;
        let course_name = [];
        let user_name = [];
        users.forEach((item) => {
          let assigned = item.matrix_assigned.reverse();
          let enrolled = item.matrix.reverse();

          user_name.push(item.first_name + " " + item.last_name);

          let allCourses = [...assigned, ...enrolled];

          let CNames = allCourses.map((course) => {
            return course.course_name;
          });

          let courses = [];

          let newCName = [...removeDuplicates(CNames)];

          if (course_name.length < newCName.length) {
            course_name = newCName;
          } else if (course_name.length <= 0) {
            course_name = newCName;
          }

          allCourses.forEach((course) => {
            if (!courses.find((i) => i?.course_name == course?.course_name)) {
              course_name.forEach((item, id) => {
                if (item == course?.course_name) {
                  courses[id] = course;
                }
              });
            }
          });

          item["course"] = courses;

          // delete item.matrix_assigned;
          // delete item.matrix;
        });

        let tempCourses = [];
        course_name.forEach(() => {
          tempCourses.push(temp);
        });
        console.log(users);

        users.forEach((item) => {
          let temp = [...tempCourses];
          let course = item["course"];
          course_name.forEach((name, idx) => {
            course.forEach((c) => {
              if (c.course_name === name) {
                temp[idx] = c;
              }
            });
          });
          item["course"] = temp;
        });
        setCourseName(course_name);
        setUserName(user_name);
        setCourse(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [manager]);
  return (
    <div className="row p-3">
      <div style={{ position: "relative" }} className="dash-neww ">
        <div style={{ position: "absolute" }} className="">
          <span className="m-1" style={{ display: "flex" }}>
            <div
              style={{
                height: "1.5rem",
                width: "3rem",
                background: "#ae0000",
                color: "white",
                textAlign: "center",
              }}
              className="redd"
            >
              0%
            </div>
            <div
              style={{
                height: "1.5rem",
                width: "3rem",
                background: "#f7b500",
                color: "white",
                textAlign: "center",
              }}
              className="redd"
            >
              50%
            </div>
            <div
              style={{
                height: "1.5rem",
                width: "3rem",
                background: "#549C30",
                color: "white",
                textAlign: "center",
              }}
              className="redd"
            >
              100%
            </div>
          </span>
        </div>
        <div className="col-12 p-2 m-2">
          <div style={{ position: "relative" }}>
            <div className="d-flex justify-content-center my-2 ">
              <h4>Course Matrix</h4>
            </div>

            <div
              style={{ position: "absolute", top: "0", right: "0" }}
              className="col-4 p-1 m- d-flex"
            >
              <Form.Select
                onChange={(e) => {
                  console.log(e.target.value);
                  setManagers(users.filter(item => item.created_by == e.target.value));
                }}
                size=""
                style={{ border: ".1px solid #212a50" }}
                aria-label="Default select example"
              >
                <option value={null}>Select Company</option>
                {companies.map((item) => (
                  <option value={item.id}>
                    {item.first_name + " " + item.last_name}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                onChange={(e) => {
                  console.log(e.target.value);
                  setManager(e.target.value);
                }}
                size=""
                style={{ border: ".1px solid #212a50" }}
                aria-label="Default select example"
              >
                <option value={null}>Select Manager</option>
                {managers.map((item) => (
                  <option value={item.id}>
                    {item.first_name + " " + item.last_name}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>

          <Table
            style={{ marginTop: ".5rem" }}
            responsive
            bordered
            variant="light"
          >
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th
                  style={{ background: "#212a50", color: "white" }}
                  colSpan={60}
                >
                  Course Name
                </th>
              </tr>
            </thead>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th
                  style={{
                    padding: "0 0.5rem",
                    color: "#fff",
                    background: "#212a50",
                  }}
                >
                  Individual
                </th>
                {courseName.map((item) => (
                  <th
                    style={{
                      padding: "0 0.5rem",
                      color: "#fff",
                      background: "#212a50",
                    }}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {course.map((item, i) => {
                return (
                  <tr>
                    {item.course.map((course, idx) => {
                      if (idx == 0) {
                        return (
                          <>
                            <td
                              style={{
                                padding: "0 0.5rem",
                                color: "white",
                                background: "#212450",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              {userName[i]}
                            </td>
                            <td
                              style={{
                                padding: "0 0.5rem",
                                color: "#3a3b3c",
                                backgroundColor: course?.color,
                                textAlign: "center",
                              }}
                            >
                              {course.progress ? course.progress + "%" : "0%"}
                            </td>
                          </>
                        );
                      } else {
                        return (
                          <td
                            style={{
                              padding: "0 0.5rem",
                              color: "#3a3b3c",
                              backgroundColor: course.color,
                              textAlign: "center",
                            }}
                          >
                            {course.progress ? course.progress + "%" : "0%"}
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BundleMatrix;
