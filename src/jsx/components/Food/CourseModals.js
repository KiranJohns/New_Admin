import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, Dropdown, Tab } from "react-bootstrap";
import { IMAGES, SVGICON } from "../Dashboard/Content";
import circle from "./../../../images/circle.svg";
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import quotes from "./../../../images/quotes.svg";
import fetchData from "../../../axios";
import { useState } from "react";
import swal from "sweetalert";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";

const CourseModal = ({ setOpenModalForWorkExp, openModalForWorkExp, assignBundle }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [courseCount, setCourseCount] = useState(1);
  const [assignData, setAssignData] = useState({
    course_id: null, // purchased course id (purchased course table id)
    userId: null,
    count: null,
  });
  
  const makeRequest = fetchData();

  useEffect(() => {
    makeRequest("GET", "/info/get-individuals-and-managers")
      .then((res) => {
        console.log(res.data.response);
        setUsers(res.data.response);
        setFilteredUsers(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <Modal
      style={{ padding: "1rem", }}
      onHide={() => setOpenModalForWorkExp(false)}
      show={openModalForWorkExp}
    >
      <div style={{ maxHeight: "100rem", }}>
          <div>
            <div>
              <h4 style={{textAlign:'center', padding:'.5rem', background:"#5a9676",color:"#fff"}}>Assign Course</h4>
            </div>
            <div
              className="form-control d-flex gap-3"
              style={{ height: "fit-content" }}
            >
              <div className="form-group" style={{ width: "20%" }}>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="1"
                  onChange={e => {
                    if(Number(e.target.value) > 0) {
                      setCourseCount(Number(e.target.value))
                    }
                  }}
                />
              </div>
              <div className="form-group" style={{ width: "40%" }}>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setFilteredUsers(
                      users.filter((item) => {
                        if (e.target.value == "all") {
                          return item;
                        } else if(e.target.value == item.type_of_account) {
                          return item;
                        }
                      })
                    );
                  }}
                >
                  <option selected value="all">
                   Select
                  </option>
                  <option value="individual">Individual</option>
                  <option value="company">Company</option>
                </select>
              </div>
              <div className="form-group" style={{ width: "40%" }}>
                <input
                  onChange={(e) =>
                    setFilteredUsers(
                      users.filter((item) =>
                        item.first_name
                          .toLocaleLowerCase()
                          .startsWith(e.target.value.toLocaleLowerCase())
                      )
                    )
                  }
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                />
              </div>
            </div>
            <div
              className="list-group bg-white"
              style={{ height: "20rem", overflow: "auto" }}
            >
              <ul class="list-group">
                {filteredUsers &&
                  filteredUsers.map((item) => {
                    return (
                      <li className="list-group-item bg-white text-black d-flex justify-content-between">
                        <span style={{ width: "7rem",overflow:'hidden'}}>
                          {item.first_name + " " + item.last_name}
                        </span>
                        <span >{item.email}</span>
                        <span
                          onClick={() =>
                            assignBundle(item.id,courseCount)
                          }
                          style={{ width: "fit-content" }}
                          className="btn btn-success py-2"
                        >
                          Assign
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
      </div>
    </Modal>
  );
};

export default CourseModal;
