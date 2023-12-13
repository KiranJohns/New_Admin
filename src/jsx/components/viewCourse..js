import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiChatDeleteFill } from "react-icons/ri";
import { Nav, Tab, Dropdown } from "react-bootstrap";
import { IMAGES, SVGICON } from "./Dashboard/Content";
import { FaEye } from "react-icons/fa";
import { Button, ButtonGroup } from "react-bootstrap";
import { BiSolidEdit } from "react-icons/bi";
import PageTitle from "../layouts/PageTitle";
import { Row, Col, Card, Table, Badge, ProgressBar } from "react-bootstrap";
import fetchData from "../../axios";
import { useState } from "react";
import swal from "sweetalert";
import { useEffect } from "react";
import CourseModal from "./Food/CourseModals";
import { MdAssignmentAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
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

const tabledata = [
  {
    image: IMAGES.food1,
    title: "Beef Steak with Fried Potato",
    subtitle: "Dinner",
    rating: "5.0",
    sales: "1,210",
    intrest: "20%",
  },
  {
    image: IMAGES.food2,
    title: "Pancake with Honey",
    subtitle: "Breakfast",
    rating: "4.9",
    sales: "1,110",
    intrest: "13&",
  },
  {
    image: IMAGES.food3,
    title: "Japanese Beef Ramen",
    subtitle: "Lunch",
    rating: "4.8",
    sales: "1,050",
    intrest: "18%",
  },
  {
    image: IMAGES.food4,
    title: "Mixed Salad",
    subtitle: "Lunch",
    rating: "5.0",
    sales: "1,400",
    intrest: "17%",
  },
  {
    image: IMAGES.food5,
    title: "Snack Beef Meatball with Vegetable",
    subtitle: "Snack",
    rating: "4.8",
    sales: "1,456",
    intrest: "15%",
  },
];
const tabledata2 = [
  {
    image: IMAGES.food5,
    title: "Beef Steak with Fried Potato",
    subtitle: "Breakfast",
    rating: "5.0",
    sales: "1,210",
    intrest: "20%",
  },
  {
    image: IMAGES.food2,
    title: "Pancake with Honey",
    subtitle: "Breakfast",
    rating: "4.9",
    sales: "1,110",
    intrest: "13&",
  },
  {
    image: IMAGES.food3,
    title: "Japanese Beef Ramen",
    subtitle: "Breakfast",
    rating: "4.8",
    sales: "1,050",
    intrest: "18%",
  },
];
const tabledata3 = [
  {
    image: IMAGES.food2,
    title: "Beef Steak with Fried Potato",
    subtitle: "Lunch",
    rating: "5.0",
    sales: "1,210",
    intrest: "20%",
  },
  {
    image: IMAGES.food2,
    title: "Pancake with Honey",
    subtitle: "Lunch",
    rating: "4.9",
    sales: "1,110",
    intrest: "13&",
  },
  {
    image: IMAGES.food3,
    title: "Japanese Beef Ramen",
    subtitle: "Lunch",
    rating: "4.8",
    sales: "1,050",
    intrest: "18%",
  },
  {
    image: IMAGES.food4,
    title: "Mixed Salad",
    subtitle: "Lunch",
    rating: "5.0",
    sales: "1,400",
    intrest: "17%",
  },
];
const tabledata4 = [
  {
    image: IMAGES.food3,
    title: "Mixed Salad",
    subtitle: "Snack",
    rating: "5.0",
    sales: "1,400",
    intrest: "17%",
  },
  {
    image: IMAGES.food5,
    title: "Snack Beef Meatball with Vegetable",
    subtitle: "Snack",
    rating: "4.8",
    sales: "1,456",
    intrest: "15%",
  },
];

const ViewCourse = () => {
  const makeRequest = fetchData();
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();

  const [openModalForWorkExp, setOpenModalForWorkExp] = useState(false);

  const [bundles, setBundles] = useState([]);
  const [bundleId, setBundleId] = useState(1);
  const [courseName,setCourseName] = useState("");

  useEffect(() => {
    makeRequest("GET", "/course/get-all-course")
      .then((res) => {
        setCourse(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function assignBundle(userId, count) {
    console.log(bundleId, userId, count);
    let form = new FormData();
    form.append("type", "course");
    form.append("count", count);
    form.append("user_id", userId);
    form.append("bundle_id", bundleId);

    makeRequest("POST", "/info/assign-bundle", form) // assign bundle and assign course is same route
      .then((res) => {
        swal("Assigned!", "Course Assigned", "success");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDelete(id) {
    makeRequest("DELETE", `/course/delete/${id}`)
      .then((res) => {
        setCourse((prev) => prev.filter((item) => item.id != Number(id)));
        swal("Done!", "successfully deleted", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <CourseModal
        setOpenModalForWorkExp={setOpenModalForWorkExp}
        openModalForWorkExp={openModalForWorkExp}
        assignBundle={assignBundle}
        name={courseName}
      />
      <div className="card">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>All Courses</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr style={{ textAlign: "center", background: "#212A50" }}>
                    <th className="width80">
                      <strong>ID</strong>
                    </th>
                    <th>
                      <strong>Course Name</strong>
                    </th>
                    <th>
                      <strong>Category</strong>
                    </th>
                    <th>
                      <strong>Description</strong>
                    </th>
                    <th>
                      <strong>Price</strong>
                    </th>
                    <th>
                      <strong>Status</strong>
                    </th>
                    <th>
                      <strong>Action</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {course &&
                    course.map((item, id) => (
                      <tr style={{ textAlign: "center" }}>
                        <td>
                          <strong>{item?.course_code}</strong>
                        </td>
                        <td>{item?.name}</td>
                        <td>{item?.category}</td>
                        <td>{item?.description.slice(0, 30)}</td>
                        <td>{item?.price}</td>
                        <td>
                          <Badge bg="" className="light badge-success">
                            Active
                          </Badge>
                        </td>
                        <td>
                          <a href={`https://test.learnforcare.co.uk/course/${item.id}`}>
                            <Button
                              className="me-2"
                              variant="success btn-icon-xxs"
                            >
                              <FaEye />
                            </Button>
                          </a>
                          <Button
                            onClick={() => {
                              setBundleId(item.id);
                              setCourseName(item.name)
                              setOpenModalForWorkExp(true);
                            }}
                            className="me-2"
                            variant="info btn-icon-xxs"
                          >
                            <MdAssignmentAdd />
                          </Button>

                          <Button
                            className="me-2"
                            variant="primary btn-icon-xxs"
                            onClick={() =>
                              navigate("/edit-course", {
                                state: { id: item.id },
                              })
                            }
                          >
                            <BiSolidEdit />
                          </Button>
                          <Button
                            className="me-2"
                            variant="danger btn-icon-xxs"
                          >
                            <FaTrash 
                            style={{fontSize:'1rem'}}
                              onClick={() => handleDelete(item.id)}
                            />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default ViewCourse;
