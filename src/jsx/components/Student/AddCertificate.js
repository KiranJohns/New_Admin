import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { IMAGES } from "../Dashboard/Content";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import {
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  ButtonGroup,
  Tab,
  Nav,
} from "react-bootstrap";
import fetchData from "../../../axios";
import { useEffect } from "react";

const AddCertificate = () => {
  const makeRequest = fetchData();
  const [userData, setUserData] = useState({
    user_id: "",
    course_name: "",
    user_name: "",
    percentage: "",
    date: ""
  });
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  function handleOnchange(e) {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  useEffect(() => {
    makeRequest("GET", "/course/get-all-course")
      .then((res) => {
        console.log(res.data.response);
        setCourses(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function submit(e) {
    e.preventDefault();
    console.log(userData);
    let form = new FormData()
    form.append("user_id", userData.user_id)
    form.append("course_name", userData.course_name)
    form.append("user_name", userData.user_name)
    form.append("percentage", Number(userData.percentage))
    form.append("category", category)
    form.append("date", userData.date)
    makeRequest("POST", "/certificate/create-certificate", form)
      .then((res) => {
        swal("Done!", "user successfully created", "success");
      })
      .catch((err) => {
        swal("Oops!", err.data.errors[0].error, "error");
        console.log(err);
      });
  }

  return (
    <>
      <div className="row">
        <div className="col-xl-9">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">User Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-11 col-lg-11">
                  <div className="row">
                    <div className="col-xl-6 col-sm-6">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label text-primary"
                        >
                          Name<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="user_name"
                          value={userData.first_name}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Name"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label text-primary"
                        >
                          User ID<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="user_id"
                          onChange={handleOnchange}
                          value={userData.user_id}
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="ID"
                        />
                      </div>
                      <div className="mb-3">
                        <div className="form-group mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label text-primary"
                          >
                            Category<span className="required">*</span>
                          </label>
                          <select
                            name="category"
                            onChange={(e) => {
                              setFilteredCourses(() => {
                                return courses.filter(c => c.category == e.target.value)
                              })
                              setCategory(e.target.value)
                            }}
                            className="form-control"
                          >
                            <option value="">Select</option>
                            <option value="Care Course">Care Course</option>
                            <option value="Mandatory Care Course">
                              Mandatory Care Course
                            </option>
                            <option value="Specialized Care Course">
                              Specialised Care Course
                            </option>
                            <option value="Recovery Care Course">
                              Recovery Care Course
                            </option>
                            <option value="Child Care Course">
                              Child Care Courses
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-sm-6">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                          Date<span className="required">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Date"
                          name="date"
                          value={userData.date}
                          onChange={handleOnchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput4"
                          className="form-label text-primary"
                        >
                          Course<span className="required">*</span>
                        </label>
                        <select
                          name="course_name"
                          onChange={handleOnchange}
                          className="form-control "
                        >
                          <option>Select</option>
                          {courses &&
                          filteredCourses.map((item) => (
                            <option key={item.name} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput6"
                          className="form-label text-primary"
                        >
                          Percentage<span className="required">*</span>
                        </label>
                        <input
                          type="number"
                          name="percentage"
                          value={userData.percentage}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput6"
                          placeholder="percentage"
                        />
                      </div>
                    </div>
                    <div className="mb-3 d-flex justify-content-center mt-5 ml-4">
                      <Button
                        className=""
                        variant="primary"
                        type="button"
                        onClick={submit}
                      >
                        Generate Certificate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Parents Details</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-6 col-sm-6">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput8" className="form-label text-primary">First Name<span className="required">*</span></label>
                                    <input type="text" className="form-control" id="exampleFormControlInput8" placeholder="Mana" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput9" className="form-label text-primary">Email<span className="required">*</span></label>
                                    <input type="email" className="form-control" id="exampleFormControlInput9" placeholder="hello@example.com" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea2" className="form-label text-primary">Address<span className="required">*</span></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea2" rows="6" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-sm-6">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput10" className="form-label text-primary">Last Name<span className="required">*</span></label>
                                    <input type="text" className="form-control" id="exampleFormControlInput10" placeholder="Wick" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput11" className="form-label text-primary">Phone Number<span className="required">*</span></label>
                                    <input type="number" className="form-control" id="exampleFormControlInput11" placeholder="+123456789" />
                                </div>
                                <label className="form-label text-primary">Payments<span className="required">*</span></label>
                                <div className="d-flex align-items-center">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label font-w500" htmlFor="flexCheckDefault">Cash</label>
                                    </div>
                                    <div className="form-check ms-3">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                                        <label className="form-check-label font-w500" htmlFor="flexCheckDefault1">Online</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <button className="btn btn-outline-primary me-3">Save as Draft</button>
                            <button className="btn btn-primary" type="button">Save</button>
                        </div>
                    </div>
                </div>
            </div> */}
    </>
  );
};

export default AddCertificate;
