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


const BundleModal = ({setOpenModalForWorkExp,openModalForWorkExp}) => {

    const [selectUserForAssignCourse, setSelectUserForAssignCourse] =
    useState("individual");
    const [records, setRecords] = useState([]);
    const [allManagers, setAllManagers] = useState([]);
    const [filteredManagers, setFilteredManagers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBundleCount, setSelectedBundleCount] = useState(0);
    const [assignData, setAssignData] = useState({
      course_id: null, // purchased course id (purchased course table id)
      userId: null,
      count: null,
    });
  
    const [filteredCompanyIndividuals, setFilteredCompanyIndividuals] = useState(
      []
    );
  
    const [companyIndividuals, setCompanyIndividuals] = useState([]);

     const  makeRequest = fetchData();

    function assignCourseToManager(id) {
        let form = new FormData();
        form.append("course_id", assignData.course_id);
        form.append("userId", id);
        form.append("count", assignData.count);
    
        makeRequest("POST", "/info/assign-course-to-manager", form)
          .then((res) => {
            getData();
            console.log(res);
            // toast("course assigned");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      function getData() {
        makeRequest("GET", "/info/get-purchased-bundles")
          .then((res) => {
            setRecords(res.data.response.filter((item) => item.course_count >= 1));
          })
          .catch((err) => {
            console.log(err);
          });
    
        makeRequest("GET", "/info/get-all-manager-individual")
          .then((res) => {
            setFilteredCompanyIndividuals(res.data.response);
            setCompanyIndividuals(res.data.response);
          })
          .catch((err) => {
            console.log(err);
          });
    
        makeRequest("GET", "/info/get-all-managers")
          .then((res) => {
            setAllManagers(res.data.response);
            setFilteredManagers(res.data.response);
          })
          .catch((err) => {
            console.log(err);
          });
      }


      function assignCourseToManagerIndividual(id) {
        let form = new FormData();
        form.append("course_id", assignData.course_id);
        form.append("userId", id);
        form.append("count", 1);
    
        console.log(assignData);
        makeRequest("POST", "/info/assign-course-to-manager-individual", form)
          .then((res) => {
            getData();
            console.log(res);
            // toast("course assigned");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      useEffect(() => {
        getData();
      }, []);

  return (
 
      <Modal
        styles={{ padding: "2rem" }}
        onHide={() => setOpenModalForWorkExp(false)}
        show={openModalForWorkExp}
      >
        <div style={{ maxHeight: "100rem" }}>
          <div className="modal-header d-flex">
            <strong
              className={`btn ${
                selectUserForAssignCourse == "individual" ? "btn-success" : ""
              }`}
              onClick={() => {
                setSelectUserForAssignCourse("individual");
                setAssignData((prev) => {
                  return {
                    ...prev,
                    count: 1,
                  };
                });
              }}
            >
              Individual
            </strong>
            <strong
              className={`btn ${
                selectUserForAssignCourse == "manager" ? "btn-success" : ""
              }`}
              onClick={() => {
                setAssignData((prev) => {
                  return {
                    ...prev,
                    count: 1,
                  };
                });
                setSelectUserForAssignCourse("manager");
              }}
            >
              Manager
            </strong>
          </div>
          {selectUserForAssignCourse === "individual" ? (
            <div>
              <div
                className="form-control d-flex gap-3"
                style={{ height: "fit-content" }}
              >
                <div className="form-group">
                  <input
                    disabled
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="1"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={(e) =>
                      setFilteredCompanyIndividuals(
                        companyIndividuals.filter((item) =>
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
                    placeholder="enter course name"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={(e) =>
                      setFilteredCompanyIndividuals(
                        companyIndividuals.filter((item) =>
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
                    placeholder="enter course name"
                  />
                </div>
              </div>
              <div className="list-group bg-white">
                <ul class="list-group">
                  {filteredCompanyIndividuals &&
                    filteredCompanyIndividuals.map((item) => {
                      return (
                        <li class="list-group-item bg-white text-black d-flex justify-content-between">
                          <span style={{ width: "fit-content" }}>
                            {item.first_name + " " + item.last_name}
                          </span>
                          <span>{item.email}</span>
                          <span
                            onClick={() =>
                              assignCourseToManagerIndividual(item.id)
                            }
                            style={{ width: "fit-content" }}
                            className="btn btn-success"
                          >
                            Assign
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <div className="form-control d-flex gap-3">
                <div className="form-group">
                  <label for="exampleInputEmail1">Course Count</label>
                  <input
                    onChange={(e) => {
                      if (Number(e.target.value) <= selectedBundleCount) {
                        setAssignData((prev) => {
                          return {
                            ...prev,
                            count: e.target.value,
                          };
                        });
                      }
                    }}
                    type="number"
                    value={assignData.count}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="0"
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">manager name</label>
                  <input
                    onChange={(e) =>
                      setFilteredManagers(
                        allManagers.filter((item) =>
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
                    placeholder="enter user name"
                  />
                </div>
              </div>
              <div className="list-group bg-white">
                <ul class="list-group">
                  {filteredManagers &&
                    filteredManagers.map((item) => {
                      return (
                        <li class="list-group-item bg-white text-black d-flex justify-content-between">
                          <span style={{ width: "fit-content" }}>
                            {item.first_name + " " + item.last_name}
                          </span>
                          <span>{item.email}</span>
                          <span
                            style={{ width: "fit-content" }}
                            className="btn btn-success"
                            onClick={() => assignCourseToManager(item.id)}
                          >
                            Assign
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Modal>

  );
};

export default BundleModal;
