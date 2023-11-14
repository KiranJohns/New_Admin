import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IMAGES, SVGICON } from "../Dashboard/Content";
import { Dropdown } from "react-bootstrap";
import PaymentHistoryTable from "./PaymentHistoryTable";

import profile from "./../../../images/profile.svg";
import location from "./../../../images/svg/location.svg";
import phone from "./../../../images/svg/phone.svg";
import email from "./../../../images/svg/email.svg";
import WalletBar from "../../layouts/WalletBar";
import fetchData from "../../../axios";

const StudentDetails = () => {
  let { state } = useLocation();
  const [userData, setUserData] = useState({});
  const [basicDetail, setBasicDetail] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  
  const makeRequest = fetchData();

  console.log(state);
  useEffect(() => {
    makeRequest("GET", `/info/get-user-data-by-id/${state.id}`)
      .then((res) => {
        console.log(res);
        setUserData(res.data.response[0]);
        setBasicDetail([
            { title: "ID", subtitle: res.data.response[0]?.id, image: profile },
            { title: "City", subtitle: res.data.response[0].city, image: location },
            { title: "Phone", subtitle: res.data.response[0].phone, image: phone },
            { title: "Email", subtitle: res.data.response[0].email, image: email },
        ])
        setScheduleList(
            [
                { title: "Number of Courses", image: IMAGES.avat1, color: "schedule-card" },
                { title: "Number of certificates",image: IMAGES.avat2, color: "schedule-card-1", },
                { title: "Date of Join", image: IMAGES.avat3, color: "schedule-card-2" },
            ]
        )
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
                    src={IMAGES.avat9}
                    alt=""
                    className="avatar avatar-xxl"
                  />
                </div>
                <div>
                  <h2 className="mb-0">
                    {userData.first_name + " " + userData.last_name}
                  </h2>
                  <p className="text-primary font-w600">
                    {userData.type_of_account}
                  </p>
                </div>
              </div>
              <Dropdown className="custom-dropdown">
                <Dropdown.Toggle as="div" className="i-false btn sharp tp-btn ">
                  {SVGICON.dots}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end" align="end">
                  <Dropdown.Item>Disable</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
        <div className="card h-auto">
          <div className="card-header border-0 p-3">
            <h4 className="heading mb-0">Courses</h4>
          </div>
          <div className="card-body p-0">
            <PaymentHistoryTable />
          </div>
        </div>
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
                        <li className="mb-2">
                          Purchased Courses
                        </li>
                        <li> 22</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="col-xl-12">
                        <Link to={"#"} className="btn btn-primary btn-block light btn-rounded mb-5">View More</Link>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
