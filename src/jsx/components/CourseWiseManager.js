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


const  CourseWiseManager = () => {
  const makeRequest = fetchData();
  const [exams, setExams] = useState([]);
  useEffect(() => {
    makeRequest("GET", "/info/get-course-wise-individual-manager-reports")
      .then((res) => {
        console.log(res.data.response);
        setExams(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deleteExam(id) {
    makeRequest("DELETE", `/exam/delete-exam/${id}`)
      .then((res) => {
        setExams(exams.filter((item) => item.id != id));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="card">
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title></Card.Title>
            <div className="input-group search-area mb-md-0 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search here..."
              />
              <span className="input-group-text">
                <Link to={"#"}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5605 15.4395L13.7527 11.6317C14.5395 10.446 15 9.02625 15 7.5C15 3.3645 11.6355 0 7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C9.02625 15 10.446 14.5395 11.6317 13.7527L15.4395 17.5605C16.0245 18.1462 16.9755 18.1462 17.5605 17.5605C18.1462 16.9747 18.1462 16.0252 17.5605 15.4395V15.4395ZM2.25 7.5C2.25 4.605 4.605 2.25 7.5 2.25C10.395 2.25 12.75 4.605 12.75 7.5C12.75 10.395 10.395 12.75 7.5 12.75C4.605 12.75 2.25 10.395 2.25 7.5V7.5Z"
                      fill="#01A3FF"
                    />
                  </svg>
                </Link>
              </span>
            </div>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr style={{ textAlign: "center", background: "#212A50", color:"#fff" }}>
                  <th className="width80">
                    <strong>Sl No</strong>
                  </th>
                  <th>
                    <strong>Course Name</strong>
                  </th>
                  <th>
                    <strong>Managers Count</strong>
                  </th>               
                  {/* <th>
                    <strong>Quantity</strong>
                  </th> */}
                  <th>
                    <strong>Status</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {exams && exams.map((item,id) => <tr style={{textAlign:'center'}}>
                  <td>
                    <strong>{id}</strong>
                  </td>
                  <td>{item?.course_name}</td>
                  <td>{item?.managers_count}</td>
                 
                  {/* <td>{item?.certificates}</td> */}
                  <td>Active</td>
                </tr>)}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default CourseWiseManager;