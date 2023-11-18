import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Tab, Dropdown } from "react-bootstrap";
import { IMAGES, SVGICON } from "./Dashboard/Content";
import { Button, ButtonGroup } from "react-bootstrap";
import { RiChatDeleteFill } from "react-icons/ri";
import PageTitle from "../layouts/PageTitle";
import { Row, Col, Card, Table, Badge, ProgressBar } from "react-bootstrap";
import fetchData from "../../axios";

const svg1 = (
  <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <rect x="0" y="0" width="24" height="24"></rect>
      <circle fill="#000000" cx="5" cy="12" r="2"></circle>
      <circle fill="#000000" cx="12" cy="12" r="2"></circle>
      <circle fill="#000000" cx="19" cy="12" r="2"></circle>
    </g>
  </svg>
);

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

const CourseMatrix = () => {
  const makeRequest = fetchData()
  const [exams, setExams] = useState([])
  useEffect(() => {
    makeRequest("GET","/exam/get-all-exam").then(res => {
      setExams(res.data.response)
    }).catch(err => {
      console.log(err);
    })
  },[])

  function deleteExam(id) {
    makeRequest("DELETE",`/exam/delete-exam/${id}`).then(res => {
      setExams(exams.filter(item => item.id != id))
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div className="card">
      {/* <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>All Exams</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr style={{background:"#212A50"}}>
                  <th className="width80">
                    <strong>Course ID</strong>
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
                    <strong>Exam ID</strong>
                  </th>
                  <th>
                    <strong>Category</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {exams && exams.map(item => <tr>
                  <td>
                    <strong>{item.id}</strong>
                  </td>
                  <td>{item?.course_name}</td>
                  <td>{item?.course_category}</td>
                  <td>{item?.course_description.slice(0,30)}</td>
                  <td>{item?.exam_id}</td>
                  <td>
                    <Button className="me-2" variant="danger btn-icon-xxs" onClick={() => deleteExam(item.exam_id)}>
                      <RiChatDeleteFill />
                    </Button>
                  </td>
                </tr>)}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col> */}
    </div>
  );
};

export default CourseMatrix;
