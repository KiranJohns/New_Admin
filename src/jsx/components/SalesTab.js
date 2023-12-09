import React from "react";
import { Link } from "react-router-dom";
import { Nav, Tab, Dropdown } from "react-bootstrap";
import { IMAGES, SVGICON } from "./Dashboard/Content";
import { FaEye } from "react-icons/fa";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaTrashRestore } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { FaDeleteLeft } from "react-icons/fa6";
import Tabs from "react-bootstrap/Tabs";
import { ImCross } from "react-icons/im";
import { FaDownload } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { RiChatDeleteFill } from "react-icons/ri";
import "../scss/care.css"

import PageTitle from "../layouts/PageTitle";
import { Row, Col, Card, Badge, ProgressBar } from "react-bootstrap";
import fetchData from "../../axios";
import { useEffect } from "react";
import { useState } from "react"
import { date } from "yup";

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

const SalesTab = () => {
  const [reports, setReports] = useState([]);
  const [groupByDay, setGroupByDay] = useState([]);
  const [filteredGroupByDay, setFilteredGroupByDay] = useState([]);
  const [daily, setDaily] = useState([]);
  const [groupByYear, setGroupByYear] = useState([]);
  const [filteredGroupByYear, setFilteredGroupByYear] = useState([]);
  const [type, setType] = useState("day");
  var monthNames = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    12: "November",
    12: "December",
  };
  const makeRequest = fetchData();
  useEffect(() => {
    makeRequest("GET", "/course/get-all-purchased-course-group-by")
      .then((res) => {
        setFilteredGroupByDay(res.data.response.groupByDay.reverse());
        setDaily(res.data.response.dailyReport.reverse());
        setGroupByDay(res.data.response.groupByDay.reverse());
        setFilteredGroupByYear(res.data.response.groupByYear.reverse());
        setGroupByYear(res.data.response.groupByYear.reverse());
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    setFilteredGroupByDay(() => {
      if (month != "" && year != "") {
        return groupByDay.filter((data) => {
          if (data.month == month && data.year == year) {
            return data
          }
        });
      } else if (month != "") {
        return groupByDay.filter((data) => data.month == month);
      } else if (year != "") {
        return groupByDay.filter((data) => data.year == year);
      } else {
        return groupByDay
      }
    });
  }, [month, year]);
  return (
    <div className="card">
      <Col xl={12}>
        <Tabs
          defaultActiveKey="daily"
          id="fill-tab-example"
          className="mb-3 mt-2"
          fill
        >
          <Tab eventKey="daily" title="Daily">
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title></Card.Title>
                </Card.Header>
                
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr style={{ background: "#212a50", color: "#fff" }}>
                        <th style={{ color: "#fff" }} className="width80">
                          <strong>SL</strong>
                        </th>
                        <th style={{ textAlign: "center", color: "#fff" }}>
                          <strong>User</strong>
                        </th>
                        <th style={{ textAlign: "center", color: "#fff" }}>
                          <strong>Course Count</strong>
                        </th>
                        <th style={{ textAlign: "center", color: "#fff" }}>
                          <strong>Time</strong>
                        </th>
                        <th style={{ textAlign: "center", color: "#fff" }}>
                          <strong>Date</strong>
                        </th>
                        <th style={{ textAlign: "center", color: "#fff" }}>
                          <strong>Amount</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {daily &&
                        daily.map((item, i) => {
                          return (
                            <tr>
                              <td>
                                <strong>{++i}</strong>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.first_name + " " + item.last_name}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.fake_course_count}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {new Date(item.date).toLocaleTimeString()}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {new Date(item.date).toLocaleDateString()}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                £ {item.amount}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Tab>

          <Tab eventKey="qualification" title="Monthly">
            <Col lg={12}>
              <Card>
                {/* <Card.Header>
                  <Card.Title></Card.Title>
               
              
                </Card.Header> */}
                
                <div  className="row">
                   <div className="col-7"></div>
                    <div className="col-2 mb-md-0 mb-3 form-group ">
                      <select
                       style={{backgroundColor:"#5a9676", color:"white", textAlign:"center"}}
                        onChange={(e) => setMonth(e.target.value)}
                        className="form-control mr-2"
                        aria-label="Default select example"
                      >
                        <option  value="">Select Month </option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">Sepetember</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                      </div>
                      <div className="col-2">
                      <select
                       style={{backgroundColor:"#5a9676", color:"white", textAlign:"center"}}
                        onChange={(e) => setYear(e.target.value)}
                        className="form-control"
                        aria-label="Default select example"
                      >
                        <option value="">Select Year</option>
                        {groupByYear &&
                          groupByYear.map((item) => (
                            <option value={item.year}>{item.year}</option>
                          ))}
                      </select>
                      </div>
                    </div>
                <Card.Body>

                  
                  <Table responsive>
                    <thead>
                      <tr style={{ color: "#fff", background: "#212a50" }}>
                        <th className="width80" style={{ color: "#fff" }}>
                          <strong>SL No</strong>
                        </th>
                        <th style={{ textAlign: "center", color: "#fff" }}>
                          <strong>Course Count</strong>
                        </th>
                        <th style={{ textAlign: "center", color: "#fff" }}>
                          <strong>Date</strong>
                        </th>
                        <th style={{ textAlign: "center", color: "#fff" }}>
                          <strong>Amount</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGroupByDay &&
                        filteredGroupByDay.map((item, i) => {
                          return (
                            <tr>
                              <td>
                                <strong>{++i}</strong>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.total_course_count}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.day + "/" + item.month + "/" + item.year}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                £ {parseInt(item.total_amount)}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Tab>

          <Tab eventKey="Work" title="Yearly">
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title></Card.Title>

                  <div>
                    {" "}
                    <div className="form-group  mb-md-0 mb-3">
                      <select
                       style={{backgroundColor:"#5a9676", color:"white"}}
                        onChange={(e) =>
                          setFilteredGroupByYear(
                            e.target.value
                              ? groupByYear.filter(
                                  (data) => data.year == e.target.value
                                )
                              : groupByYear
                          )
                        }
                        className="form-control"
                        aria-label="Default select example"
                      >
                        <option value="">Select Year</option>
                        {groupByYear &&
                          groupByYear.map((item) => (
                            <option value={item.year}>{item.year}</option>
                          ))}
                      </select>
                
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr style={{ background: "#212a50" }}>
                        <th className="width80">
                          <strong>SL No</strong>
                        </th>
                        <th style={{ textAlign: "center" }}>
                          <strong>Course Count</strong>
                        </th>
                        <th style={{ textAlign: "center" }}>
                          <strong>Month</strong>
                        </th>
                        <th style={{ textAlign: "center" }}>
                          <strong>Year</strong>
                        </th>
                        <th style={{ textAlign: "center" }}>
                          <strong>Amount</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGroupByYear &&
                        filteredGroupByYear.map((item, i) => {
                          return (
                            <tr>
                              <td>
                                <strong>{++i}</strong>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.total_course_count}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {monthNames[item.month]}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.year}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                £ {item.total_amount}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Tab>
        </Tabs>
      </Col>
    </div>
  );
};

export default SalesTab;
