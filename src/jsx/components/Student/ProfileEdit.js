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

const ProfileEdit = () => {
  const makeRequest = fetchData();
  const [userData, setUserData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
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
                          Name<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="employee"
                        //   value={userData.employee}
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
                          name="first_name"
                        //   value={}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Email"
                        />
                      </div>

           

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label text-primary"
                        >
                         Employee Id<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="employee"
                        //   value={userData.employee}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Id"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label text-primary"
                        >
                          Designation<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="desination"
                        //   value={}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Designation"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label text-primary"
                        >
                          Department<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="desination"
                        //   value={}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Department"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label text-primary"
                        >
                        Gender  <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="gender"
                        //   value={}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Gender "
                        />
                      </div>
                      <div className="mb-3">
                        <div className="form-group mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label text-primary"
                          >
                           Date of Birth<span className="required">*</span>
                          </label>
                          <input
                          type="text"
                          name="gender"
                        //   value={}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="dd/mm/yy"
                        />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput6"
                          className="form-label text-primary"
                        >
                          Next to Kin<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                        //   value={}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput6"
                          placeholder="Next to Kin"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="pas"
                          className="form-label text-primary"
                        >
                          Brief Profile<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name=""
                        //   value={}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput4"
                          placeholder="Brief Profile"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-sm-6">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                        Phone <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Phone"
                          name="phone"
                          value={userData.last_name}
                          onChange={handleOnchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                         Contact No<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Contact No"
                          name="contact"
                          value={userData.last_name}
                          onChange={handleOnchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                          Correspondence Address<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder=" Correspondence Address"
                          name=" correspondence_address"
                          // value={}
                          onChange={handleOnchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                         Payroll Reference Number<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Payroll Reference number"
                          name="last_name"
                          value={userData.last_name}
                          onChange={handleOnchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                          Date of Joining<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="dd/mm/yy"
                          name="last_name"
                          value={userData.last_name}
                          onChange={handleOnchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                          Medical Details<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Medical Details"
                          name="medical_details"
                          value={userData.last_name}
                          onChange={handleOnchange}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                          National Insurance Number<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="National Insurance Number"
                          name="last_name"
                          // value={}
                          onChange={handleOnchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput4"
                          className="form-label text-primary"
                        >
                          Contract Type<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="contract_type"
                          // value={}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput4"
                          placeholder="Contract Type"
                        />
                      </div>
               
                      <div className="mb-3 d-flex justify-content-center mt-5 ml-4">
                        <Button
                          className=""
                          variant="primary"
                          type="button"
                          onClick={submit}
                        >
                        Update
                        </Button>
                      </div>
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

export default ProfileEdit;
