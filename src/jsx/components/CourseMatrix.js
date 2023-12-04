import React from "react";
import Table from "react-bootstrap/Table";
import fetchData from "../../axios";
import { useEffect } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { jwtDecode } from "jwt-decode";

const ManCoursMatrix = () => {
  const matrixDataUser = [
    {
      id: 1,
      name: "Stark",
    },
    {
      id: 2,
      name: "Miles",
    },
    {
      id: 3,
      name: "Aloshy",
    },
    {
      id: 4,
      name: "Alba",
    },
  ];

  const matrixDataCourse = [
    [
      {
        id: 1,
        userId: 1,
        course: {
          name: "some of the people",
          color: "#ae0000",
          progress: "0%",
        },
      },
      {
        id: 1,
        userId: 1,
        course: {
          name: "of the people",
          color: "#549C30",
          progress: "100%",
        },
      },
      {
        id: 1,
        userId: 1,
        course: {
          name: "by the people",
          color: "#f7b500",
          progress: "50%",
        },
      },
      {
        id: 1,
        userId: 1,
        course: {
          name: "for the people",
          color: "#549C30",
          progress: "100%",
        },
      },
    ],
    [
      {
        id: 1,
        userId: 2,
        course: {
          name: "by the people",
          color: "#f7b500",
          progress: "50%",
        },
      },
      {
        id: 2,
        userId: 2,
        course: {
          name: "some of the people",
          color: "#ae0000",
          progress: "0%",
        },
      },
      {
        id: 3,
        userId: 2,
        course: {
          name: "of the people",
          color: "#549C30",
          progress: "100%",
        },
      },
      {
        id: 4,
        userId: 2,
        course: {
          name: "for the people",
          color: "#f7b500",
          progress: "50%",
        },
      },
    ],
    [
      {
        id: 1,
        userId: 3,
        course: {
          name: "some of the people",
          color: "#ae0000",
          progress: "0%",
        },
      },
      {
        id: 1,
        userId: 3,
        course: {
          name: "for the people",
          color: "#f7b500",
          progress: "50%",
        },
      },
      {
        id: 1,
        userId: 3,
        course: {
          name: "of the people",
          color: "#549C30",
          progress: "100%",
        },
      },
      {
        id: 1,
        userId: 3,
        course: {
          name: "by the people",
          color: "#549C30",
          progress: "100%",
        },
      },
    ],
    [
      {
        id: 1,
        userId: 4,
        course: {
          name: "by the people",
          color: "#f7b500",
          progress: "50%",
        },
      },
      {
        id: 1,
        userId: 4,
        course: {
          name: "some of the people",
          color: "#ae0000",
          progress: "0%",
        },
      },
      {
        id: 1,
        userId: 4,
        course: {
          name: "of the people",
          color: "#549C30",
          progress: "100%",
        },
      },
      {
        id: 1,
        userId: 4,
        course: {
          name: "for the people",
          color: "#549C30",
          progress: "100%",
        },
      },
    ],
  ];

  // const courseName = [
  //   "some of the people",
  //   "by the people",
  //   "of the people",
  //   "for the people",
  // ];

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

export default ManCoursMatrix;

// import React from "react";
// import { Link } from "react-router-dom";
// import { Nav, Tab, Dropdown } from "react-bootstrap";
// import { IMAGES, SVGICON } from "./Dashboard/Content";
// import { FaEye } from "react-icons/fa";
// import { Button, ButtonGroup } from "react-bootstrap";
// import { FaDeleteLeft } from "react-icons/fa6";
// import { BiSolidEdit } from "react-icons/bi";

// import PageTitle from "../layouts/PageTitle";
// import { Row, Col, Card, Table, Badge, ProgressBar } from "react-bootstrap";

// const svg1 = (
//   <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
//     <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
//       <rect x="0" y="0" width="24" height="24"></rect>
//       <circle fill="#000000" cx="5" cy="12" r="2"></circle>
//       <circle fill="#000000" cx="12" cy="12" r="2"></circle>
//       <circle fill="#000000" cx="19" cy="12" r="2"></circle>
//     </g>
//   </svg>
// );

// const tabledata = [
//   {
//     image: IMAGES.food1,
//     title: "Beef Steak with Fried Potato",
//     subtitle: "Dinner",
//     rating: "5.0",
//     sales: "1,210",
//     intrest: "20%",
//   },
//   {
//     image: IMAGES.food2,
//     title: "Pancake with Honey",
//     subtitle: "Breakfast",
//     rating: "4.9",
//     sales: "1,110",
//     intrest: "13&",
//   },
//   {
//     image: IMAGES.food3,
//     title: "Japanese Beef Ramen",
//     subtitle: "Lunch",
//     rating: "4.8",
//     sales: "1,050",
//     intrest: "18%",
//   },
//   {
//     image: IMAGES.food4,
//     title: "Mixed Salad",
//     subtitle: "Lunch",
//     rating: "5.0",
//     sales: "1,400",
//     intrest: "17%",
//   },
//   {
//     image: IMAGES.food5,
//     title: "Snack Beef Meatball with Vegetable",
//     subtitle: "Snack",
//     rating: "4.8",
//     sales: "1,456",
//     intrest: "15%",
//   },
// ];
// const tabledata2 = [
//   {
//     image: IMAGES.food5,
//     title: "Beef Steak with Fried Potato",
//     subtitle: "Breakfast",
//     rating: "5.0",
//     sales: "1,210",
//     intrest: "20%",
//   },
//   {
//     image: IMAGES.food2,
//     title: "Pancake with Honey",
//     subtitle: "Breakfast",
//     rating: "4.9",
//     sales: "1,110",
//     intrest: "13&",
//   },
//   {
//     image: IMAGES.food3,
//     title: "Japanese Beef Ramen",
//     subtitle: "Breakfast",
//     rating: "4.8",
//     sales: "1,050",
//     intrest: "18%",
//   },
// ];
// const tabledata3 = [
//   {
//     image: IMAGES.food2,
//     title: "Beef Steak with Fried Potato",
//     subtitle: "Lunch",
//     rating: "5.0",
//     sales: "1,210",
//     intrest: "20%",
//   },
//   {
//     image: IMAGES.food2,
//     title: "Pancake with Honey",
//     subtitle: "Lunch",
//     rating: "4.9",
//     sales: "1,110",
//     intrest: "13&",
//   },
//   {
//     image: IMAGES.food3,
//     title: "Japanese Beef Ramen",
//     subtitle: "Lunch",
//     rating: "4.8",
//     sales: "1,050",
//     intrest: "18%",
//   },
//   {
//     image: IMAGES.food4,
//     title: "Mixed Salad",
//     subtitle: "Lunch",
//     rating: "5.0",
//     sales: "1,400",
//     intrest: "17%",
//   },
// ];
// const tabledata4 = [
//   {
//     image: IMAGES.food3,
//     title: "Mixed Salad",
//     subtitle: "Snack",
//     rating: "5.0",
//     sales: "1,400",
//     intrest: "17%",
//   },
//   {
//     image: IMAGES.food5,
//     title: "Snack Beef Meatball with Vegetable",
//     subtitle: "Snack",
//     rating: "4.8",
//     sales: "1,456",
//     intrest: "15%",
//   },
// ];

// const CourseMatrix = () => {
//   return (
//     <div className="card">
//       <Col lg={12}>
//         <Card>
//           <Card.Header>
//             <Card.Title></Card.Title>
//           </Card.Header>
//           <Card.Body>
//             <Table responsive>
//               <thead>
//                 <tr style={{ background: "#212a50" }}>
//                   <th className="width80">
//                     <strong>ID</strong>
//                   </th>
//                   <th style={{ textAlign: "center" }}>
//                     <strong>Amount</strong>
//                   </th>
//                   <th style={{ textAlign: "center" }}>
//                     <strong>Date</strong>
//                   </th>
//                   <th style={{ textAlign: "center" }}>
//                     <strong>Customer</strong>
//                   </th>
//                   <th style={{ textAlign: "center" }}>
//                     <strong>Place</strong>
//                   </th>
//                   <th style={{ textAlign: "center" }}>
//                     <strong>Customer Type</strong>
//                   </th>
//                   <th style={{ textAlign: "center" }}>
//                     {" "}
//                     <strong>Action</strong>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>
//                     <strong>01</strong>
//                   </td>
//                   <td style={{ textAlign: "center" }}>250</td>
//                   <td style={{ textAlign: "center" }}>11/11/2023</td>
//                   <td style={{ textAlign: "center" }}>Rio</td>
//                   <td style={{ textAlign: "center" }}>
//                     London
//                     {/* <Badge bg="" className="light badge-success">Active</Badge> */}
//                   </td>
//                   <td style={{ textAlign: "center" }}>Individual</td>
//                   <td style={{ textAlign: "center" }}>
//                     <Button className="me-2" variant="success btn-icon-xxs">
//                       <FaEye />
//                     </Button>
//                     <Button className="me-2" variant="primary btn-icon-xxs">
//                       <BiSolidEdit />
//                     </Button>
//                     <Button className="me-2" variant="danger btn-icon-xxs">
//                       <FaDeleteLeft />
//                     </Button>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>02</strong>
//                   </td>
//                   <td style={{ textAlign: "center" }}>55</td>
//                   <td style={{ textAlign: "center" }}>12/11/2023</td>
//                   <td style={{ textAlign: "center" }}></td>
//                   <td>
//                     {/* <Badge bg="" className="light badge-success">Active</Badge> */}
//                   </td>
//                   <td style={{ textAlign: "center" }}>Company</td>
//                   <td style={{ textAlign: "center" }}>
//                     <Button className="me-2" variant="success btn-icon-xxs">
//                       <FaEye />
//                     </Button>
//                     <Button className="me-2" variant="primary btn-icon-xxs">
//                       <BiSolidEdit />
//                     </Button>
//                     <Button className="me-2" variant="danger btn-icon-xxs">
//                       <FaDeleteLeft />
//                     </Button>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>03</strong>
//                   </td>
//                   <td style={{ textAlign: "center" }}>25</td>
//                   <td style={{ textAlign: "center" }}>13</td>
//                   <td style={{ textAlign: "center" }}>Rio</td>
//                   <td></td>
//                   <td style={{ textAlign: "center" }}>Individual</td>
//                   <td style={{ textAlign: "center" }}>
//                     <Button className="me-2" variant="success btn-icon-xxs">
//                       <FaEye />
//                     </Button>
//                     <Button className="me-2" variant="primary btn-icon-xxs">
//                       <BiSolidEdit />
//                     </Button>
//                     <Button className="me-2" variant="danger btn-icon-xxs">
//                       <FaDeleteLeft />
//                     </Button>
//                   </td>
//                 </tr>
//               </tbody>
//             </Table>
//           </Card.Body>
//         </Card>
//       </Col>
//     </div>
//   );
// };

// export default CourseMatrix;