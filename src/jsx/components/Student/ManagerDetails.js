import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IMAGES, SVGICON } from "../Dashboard/Content";
import { Button, Dropdown } from "react-bootstrap";
import PaymentHistoryTable from "./PaymentHistoryTable";
import { Row, Col, Card, Table, Badge, ProgressBar } from "react-bootstrap";

import profile from "./../../../images/profile.svg";
import location from "./../../../images/svg/location.svg";
import phone from "./../../../images/svg/phone.svg";
import email from "./../../../images/svg/email.svg";
import WalletBar from "../../layouts/WalletBar";
import fetchData from "../../../axios";
import { FaEye } from "react-icons/fa";

const ManagerDetails = () => {
  let { state } = useLocation();
  const [userData, setUserData] = useState({});
  const [basicDetail, setBasicDetail] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [invoice, setInvoice] = useState([]);

  const makeRequest = fetchData();
  const navigate = useNavigate();

  function compareDates(a, b) {
    var dateA = a.date.split("/").reverse().join("/");
    var dateB = b.date.split("/").reverse().join("/");
    return dateB.localeCompare(dateA); // Reverse the comparison
  }
  useEffect(() => {
    makeRequest("GET", `/info/get-user-data-by-id/${state.id}`)
      .then((res) => {
        console.log(res.data.response);
        setUserData(res.data.response[0]);
        setBasicDetail([
          { title: "ID", subtitle: res.data.response[0]?.id, image: profile },
          {
            title: "City",
            subtitle: res.data.response[0].city,
            image: location,
          },
          {
            title: "Phone",
            subtitle: res.data.response[0].phone,
            image: phone,
          },
          {
            title: "Email",
            subtitle: res.data.response[0].email,
            image: email,
          },
        ]);
        setScheduleList([
          {
            title: "Total Number of Courses",
            image: IMAGES.avat1,
            color: "schedule-card",
            count: res.data.response[0].course_count,
          },
          {
            title: "Number of certificates",
            image: IMAGES.avat2,
            color: "schedule-card-1",
            count: res.data.response[0].certificate_count,
          },
          {
            title: "Date of Join",
            image: IMAGES.avat3,
            color: "schedule-card-2",
            count: res.data.response[0].joined,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });

    makeRequest("GET", `/course/assigned-items/${state.id}`)
      .then((res) => {
        setUsers(res.data.response.result.reverse());
        setNewUsers(res.data.response.res);
      })
      .catch((err) => {});
    makeRequest("GET", `/invoice/get-invoice/${state.id}`)
      .then((res) => {
        console.log(res);
        let date = res.data.response
        date.sort(compareDates)
        setInvoice(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="row">
      <div className="col-xl-9">
        <div className="card h-auto">
          <div className="card-header p-0">
            <div className="user-bg w-100">
              <div className="user-svg">
                <svg
                  width="264"
                  height="109"
                  viewBox="0 0 264 109"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.0107422"
                    y="0.6521"
                    width="263.592"
                    height="275.13"
                    rx="20"
                    fill="#FCC43E"
                  />
                </svg>
              </div>
              <div className="user-svg-1">
                <svg
                  width="264"
                  height="59"
                  viewBox="0 0 264 59"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="0.564056"
                    width="263.592"
                    height="275.13"
                    rx="20"
                    fill="#e07051"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="user">
                <div className="user-media">
                  <img
                    src={userData.profile_image || profile}
                    alt=""
                    className="avatar avatar-xxl"
                  />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <h2 className="mb-0">
                      {userData.first_name &&
                        userData.last_name &&
                        userData.first_name + " " + userData.last_name}
                    </h2>
                    <p
                      className="text-primary font-w600"
                      style={{ textTransform: "capitalize" }}
                    >
                      {userData.type_of_account}
                    </p>
                  </div>
                  <div style={{ marginLeft: "23rem" }}>
                    {userData?.created_by && (
                      <h3 className="mb-0">
                        Created by:{" "}
                        {(userData?.created_by?.first_name || "") +
                          " " +
                          (userData?.created_by?.last_name || "")}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
              {/* <Dropdown className="custom-dropdown">
                <Dropdown.Toggle as="div" className="i-false btn sharp tp-btn ">
                  {SVGICON.dots}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end" align="end">
                  <Dropdown.Item>Disable</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
            <div className="row mt-2">
              {basicDetail.map((item, ind) => (
                <div className="col-xl-3 col-xxl-6 col-sm-6" key={ind}>
                  <ul className="student-details">
                    <li className="me-2">
                      <Link to={"#"} className="icon-box bg-secondary">
                        <img src={item.image} alt="" />
                      </Link>
                    </li>
                    <li>
                      <span>{item.title}:</span>
                      <h5 className="mb-0">{item.subtitle}</h5>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="card h-auto">
          <div className="card-header border-0 p-3">
            <h4 className="heading mb-0">Courses</h4>
          </div>
          <div className="card-body p-0">
            <PaymentHistoryTable />
          </div>
        </div> */}
      </div>
      <div className="col-xl-3">
        <div className="row">
          <div className="col-xl-12"></div>
          {scheduleList.map((data, index) => (
            <div className="col-xl-12 col-sm-6" key={index}>
              <div className={`card h-auto ${data.color}`}>
                <div className="card-body">
                  <h4 className="mb-0">{data.title}</h4>
                  <p>{data.subtitle}</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <ul>
                        <li className="mb-2"></li>
                        <li> {data.count}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Users</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr style={{ background: "#212a50" }}>
                    <th style={{ textAlign: "center" }} className="width80">
                      <strong>SL No</strong>
                    </th>
                    <th className="width80">
                      <strong>Id</strong>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      <strong>Name</strong>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      <strong>Type</strong>
                    </th>
                    {/* <th style={{ textAlign: "center" }}>
                    <strong>Code</strong>
                  </th> */}
                    <th style={{ textAlign: "center" }}>
                      <strong>Email</strong>
                    </th>
                    <th className="width80">
                      <strong>Phone</strong>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      {" "}
                      <strong>Action</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {newUsers.map((item, idx) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <strong>{++idx}</strong>
                      </td>
                      <td>
                        <strong>{item.id}</strong>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {item.first_name + " " + item.last_name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {item.type_of_account}
                      </td>
                      <td style={{ textAlign: "center" }}>{item.email}</td>
                      {/* <td style={{ textAlign: "center" }}>
                        {item.corse_Count + item.man_corse_Count}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {item.bundle_Count + item.man_bundle_Count}
                      </td> */}
                      <td style={{ textAlign: "center" }}>{item.phone}</td>
                      <td style={{ textAlign: "center" }}>
                        <Button
                          title="View"
                          onClick={() => {
                            let url = "";
                            if (item.type_of_account == "individual") {
                              url = "/user-detail";
                            } else {
                              url = "/manager-detail";
                            }
                            navigate(url, {
                              state: { id: item.id },
                            });
                          }}
                          className="me-2"
                          variant="success btn-icon-xxs"
                        >
                          <FaEye />
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

      <div className="card">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Assigned Course</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr style={{ background: "#212a50" }}>
                    <th style={{ textAlign: "center" }} className="width80">
                      <strong>SL No</strong>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      <strong>Name</strong>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      <strong>Course Name</strong>
                    </th>
                    {/* <th style={{ textAlign: "center" }}>
                    <strong>Code</strong>
                  </th> */}
                    {/* <th style={{ textAlign: "center" }}>
                      <strong>Email</strong>
                    </th> */}
                    <th style={{ textAlign: "center" }}>
                      <strong>Count</strong>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      <strong>Date</strong>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      <strong>Time</strong>
                    </th>
                    {/* <th className="width80">
                      <strong>Assigned Bundles</strong>
                    </th> */}
                    <th style={{ textAlign: "center" }}>
                      {" "}
                      <strong>Action</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, idx) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <strong>{++idx}</strong>
                      </td>
                      <td style={{ textAlign: "center" }}>{item.user_name}</td>
                      <td style={{ textAlign: "center" }}>
                        {item.course_name}
                      </td>
                      {/* <td style={{ textAlign: "center" }}>{item.email}</td> */}
                      <td style={{ textAlign: "center" }}>
                        {item.course_count}
                      </td>
                      <td style={{ textAlign: "center" }}>{item.date}</td>
                      {/* <td style={{ textAlign: "center" }}>{item.email}</td> */}
                      <td style={{ textAlign: "center" }}>{item.time}</td>
                      {/* <td style={{ textAlign: "center" }}>
                      {item.bundle_Count + item.man_bundle_Count}
                    </td> */}
                      <td style={{ textAlign: "center" }}>
                        <a
                          target="_blank"
                          href={`https://learnforcare.co.uk/course/${item.course_id}`}
                        >
                          <Button
                            title="View"
                            onClick={() => {
                              let url = "/company-detail";
                              if (item.user_type == "company") {
                                url = "/company-detail";
                              }
                              if (item.user_type == "manager") {
                                url = "/manager-detail";
                              }
                              if (item.user_type == "individual") {
                                url = "/user-detail";
                              }
                              navigate(url, {
                                state: { id: item.user_id },
                              });
                            }}
                            // onClick={() => {
                            // let url = "";
                            // if (item.type_of_account == "individual") {
                            //   url = "/user-detail";
                            // } else {
                            //   url = "/manager-detail";
                            // }
                            // navigate(url, {
                            //   state: { id: item.id },
                            // });
                            // }}
                            className="me-2"
                            variant="success btn-icon-xxs"
                          >
                            <FaEye />
                          </Button>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </div>
      <div className="card">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Invoices</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr style={{ background: "#212a50" }}>
                    <th style={{ textAlign: "center" }} className="width80">
                      <strong>SL No</strong>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      <strong>Invoice No</strong>
                    </th>
                    {/* <th style={{ textAlign: "center" }}>
                    <strong>Code</strong>
                  </th> */}
                    <th style={{ textAlign: "center" }}>
                      <strong>Date</strong>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      <strong>Time</strong>
                    </th>
                    <th className="width80">
                      <strong>Transaction ID</strong>
                    </th>
                    <th className="width80">
                      <strong>Amount</strong>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      {" "}
                      <strong>Action</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.map((item, idx) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <strong>{++idx}</strong>
                      </td>
                      <td style={{ textAlign: "center" }}>{item.id}</td>
                      <td style={{ textAlign: "center" }}>{item.date}</td>
                      <td style={{ textAlign: "center" }}>{item.time}</td>
                      <td style={{ textAlign: "center" }}>
                        {item.transaction_id}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {parseFloat(item.total_price).toFixed(2)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <a target="_blank" href={item.img}>
                          <Button
                            className="me-2"
                            variant="success btn-icon-xxs"
                          >
                            <FaEye />
                          </Button>
                        </a>
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

export default ManagerDetails;
