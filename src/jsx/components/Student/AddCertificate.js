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

const AddCertificate = () => {
  const makeRequest = fetchData();
  const [userData, setUserData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    country: "",
    city: "",
  });
  function handleOnchange(e) {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function submit(e) {
    e.preventDefault();
    makeRequest("POST","/info/create-user",userData).then(res => {
        swal("Done!","user successfully created","success")
    }).catch(err => {
        swal("Oops!",err.data.errors[0].error,"error")
        console.log(err);
    })
    console.log(userData);
  }

  return (
    <>
      <div className="row">
        <div className="col-xl-10">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">User Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-9 col-lg-8">
                  <div className="row">
                    <div className="col-xl-6 col-sm-6">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label text-primary"
                        >
                          First Name<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          value={userData.first_name}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label text-primary"
                        >
                          Email<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={userData.email}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Email"
                        />
                      </div>
                      <div className="mb-3">
                        <div className="form-group mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label text-primary"
                          >
                            Country<span className="required">*</span>
                          </label>
                          <select
                          name="country"
                            onChange={handleOnchange}
                            className="form-control "
                          >
                            <option>Select</option>
                            <option value="United Kingdom">
                              United Kingdom
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
                          Last Name<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Last Name"
                          name="last_name"
                          value={userData.last_name}
                          onChange={handleOnchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput4"
                          className="form-label text-primary"
                        >
                          Phone<span className="required">*</span>
                        </label>
                        <input
                          type="number"
                          name="phone"
                          value={userData.phone}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput4"
                          placeholder="Phone"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput6"
                          className="form-label text-primary"
                        >
                          City<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={userData.city}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput6"
                          placeholder="City"
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
                          Submit
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
