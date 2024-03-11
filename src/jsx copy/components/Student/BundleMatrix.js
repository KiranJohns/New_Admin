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
        setCompanies(
          res.data.response.filter((item) => item.type_of_account == "company")
        );
        setManagers(
          res.data.response.filter((item) => item.type_of_account == "manager")
        );
        // setManager(
        //   res.data.response.find((item) => item.type_of_account == "manager")
        //     ?.id
        // );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const form = new FormData();
    form.append("manager_id", manager);
    makeRequest("POST", "/course/get-manager-matrix-bundle", form)
      .then((res) => {
        let temp = {
          color: "gray",
          progress: "",
        };
        // console.log(res.data.response);
        // console.log(res.data.response);
        let users = res.data.response;
        let course_name = [];
        let user_name = [];
        users.forEach((item) => {
          let assigned = item.matrix_assigned.reverse();
          let enrolled = item.matrix.reverse();

          if (item.type_of_account != "Individual") {
            assigned = assigned.filter((course) => {
              console.log("course ", course);
              if (course.count >= 1 && course.owner == item.id) {
                return course;
              }
            });
          }
          user_name.push(item.first_name + " " + item.last_name);

          let allCourses = [...assigned, ...enrolled];

          let CNames = allCourses.map((course) => {
            return course.bundle_name;
          });

          let courses = [];

          let newCName = [...removeDuplicates(CNames)];

          if (course_name.length < newCName.length) {
            course_name = newCName;
          } else if (course_name.length <= 0) {
            course_name = newCName;
          }

          allCourses.map((item) => {
            if (item.progress == 0) {
              item["color"] = "red";
            }
            if (item.progress > 0) {
              item["color"] = "yellow";
            }
            if (item.progress == 100) {
              item["color"] = "green";
            }
          });

          allCourses.forEach((course) => {
            if (!courses.find((i) => i?.course_name == course?.bundle_name)) {
              course_name.forEach((item, id) => {
                if (item == course?.bundle_name) {
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
              if (c.bundle_name === name) {
                temp[idx] = c;
              }
            });
          });
          item["course"] = temp;
        });
        setCourseName(course_name);
        setUserName(user_name);
        setCourse(users);
        console.log("users ", users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [manager]);
  return (
    <div className="row p-3">
      <div
        style={{ position: "relative", background: "#fff" }}
        className="dash-neww "
      >
        <div style={{ position: "absolute", marginLeft: ".8rem" }} className="">
          <span className="m-2" style={{ display: "flex" }}>
            <div
              style={{
                height: "1.5rem",
                width: "7rem",
                background: "#ae0000",
                color: "white",
                textAlign: "center",
              }}
              className="redd"
            >
              Not started
            </div>
            <div
              style={{
                height: "1.5rem",
                width: "7rem",
                background: "#f7b500",
                color: "white",
                textAlign: "center",
              }}
              className="redd"
            >
              In progress
            </div>
            <div
              style={{
                height: "1.5rem",
                width: "7rem",
                background: "#549C30",
                color: "white",
                textAlign: "center",
              }}
              className="redd"
            >
              Completed
            </div>
          </span>
        </div>
        <div className="col-12 p-2 m-2">
          <div style={{ position: "relative" }}>
            <div className="d-flex justify-content-center my-2 ">
              <h4>Bundle Matrix</h4>
            </div>

            <div
              style={{ position: "absolute", top: "0", right: "0" }}
              className="col-4 p-1 m- d-flex"
            >
              <Form.Select
                onChange={(e) => {
                  setManager(e.target.value);
                  setManagers(
                    [
                      users.find(item => item.id == e.target.value),
                      ...users.filter((item) => (item.created_by == e.target.value && item.type_of_account == "manager")),
                    ]
                  );
                }}
                style={{ background: "#5a9676", color: "#fff" }}
                className="form-control"
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
                style={{ background: "#5a9676", color: "#fff" }}
                className="form-control"
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
                  colSpan={1}
                ></th>
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
                                color: "#212450",
                                background: "#fff",
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
                              {course?.color == "red" && "Not Started" || course?.color == "yellow" && "In Progress" || course?.color == "green" && "Completed" || course?.color == "gray" && "" }
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
                            {(course?.color == "red" && "Not Started") ||
                              (course?.color == "yellow" && "In Progress") ||
                              (course?.color == "green" && "Completed") ||
                              (course?.color == "gray" && "")}
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
