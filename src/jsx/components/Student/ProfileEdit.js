import React, { useEffect, useState } from "react";
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
    employee_id: "",
    employee_name: "",
    email: "",
    designation: "",
    department: "",
    phone: "",
    contact_no: "",
    gender: "",
    date_of_birth: "",
    next_to_kin: "",
    payroll_reference_number: "",
    medical_details: "",
    national_insurance_number: "",
    contract_type: "",
    date_of_joining: "",
    correspondence_address: "",
    brief_profile: "",
    bank_holder_name: "",
    bank_name: "",
    account_no: "",
    sort_code: "",
    roll_number: "",
    recent_qualification: "",
    next_to_kin_number: "",
    permanent_address: "",
  });
  const [staffCV, setStaffCV] = useState(null);
  function handleOnchange(e) {
    setUserData((prev) => {
      console.log([e.target.name], e.target.value);
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleStaffCVSubmit() {
    if (staffCV) {
      const file = new FormData();
      file.append("pdf", staffCV);
      makeRequest("POST", "/info/set-staff-cv", file)
        .then((res) => {
          // swal("Done!", "staff successfully updated", "success");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    makeRequest("GET", "/info/get-admin-info")
      .then((res) => {
        if (res?.data?.response[0]) {
          console.log(res?.data?.response[0]);

          if (res.data.response[0].date_of_joining) {
            let date_of_joining =
              res.data.response[0].date_of_joining.split("/");
            let date_of_birth = res.data.response[0].date_of_birth.split("/");

            let dateOfJoining =
              date_of_joining[2] +
              "-" +
              date_of_joining[1] +
              "-" +
              date_of_joining[0];
            let dateOfBirth =
              date_of_birth[2] +
              "-" +
              date_of_birth[1] +
              "-" +
              date_of_birth[0];

              console.log(dateOfJoining, dateOfBirth);
            setUserData({
              ...res.data.response[0],
              date_of_joining: dateOfJoining,
              date_of_birth: dateOfBirth,
            });
          } else {
            setUserData({ ...res.data.response[0] });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function submit(e) {
    e.preventDefault();
    let employee_id = Number(userData.employee_id);
    let contact_no = Number(userData.contact_no);
    let payroll_reference_number = Number(userData.payroll_reference_number);
    let national_insurance_number = Number(userData.national_insurance_number);
    makeRequest("PUT", "/info/set-admin-info", {
      ...userData,
      employee_id,
      contact_no,
      payroll_reference_number,
      national_insurance_number,
    })
      .then((res) => {
        handleStaffCVSubmit()
        swal("Done!", "Data successfully updated", "success");
      })
      .catch((err) => {
        swal("Oops!", err.data.errors[0].error, "error");
        console.log(err);
      });
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
                          name="employee_name"
                          value={userData.employee_name}
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
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label text-primary"
                        >
                          Employee Id<span className="required">*</span>
                        </label>
                        <input
                          type="number"
                          name="employee_id"
                          value={userData.employee_id}
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
                          name="designation"
                          value={userData.designation}
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
                          name="department"
                          value={userData.department}
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
                          Gender <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="gender"
                          value={userData.gender}
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
                            type="date"
                            name="date_of_birth"
                            value={userData.date_of_birth}
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
                          Next to Kin Name<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="next_to_kin"
                          value={userData.next_to_kin}
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
                          name="brief_profile"
                          value={userData.brief_profile}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput4"
                          placeholder="Brief Profile"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput4"
                          className="form-label text-primary"
                        >
                          Sort Code<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="sort_code"
                          value={userData.sort_code}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput4"
                          placeholder="Sort Code"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput4"
                          className="form-label text-primary"
                        >
                          Roll Number<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="roll_number"
                          value={userData.roll_number}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput4"
                          placeholder="Roll Number"
                        />
                      </div>

                      <div className="mb-3">
                        staff CV
                        <div class="input-group mb-3">
                          {/* <div class="input-group-prepend"></div> */}
                          <label
                            style={{ visibility: "hidden" }}
                            htmlFor="exampleFormControlInput4"
                            className="form-label text-primary"
                          >
                            staff CV
                            <span className="required">*</span>
                          </label>
                          <input
                          style={{width: '100%'}}
                            type="file"
                            class="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => setStaffCV(e.target.files[0])}
                          />
                          {/* <button
                            onClick={handleStaffCVSubmit}
                            class=" btn btn-primary input-group-text"
                            id="basic-addon1"
                          >
                            upload
                          </button> */}
                        </div>
                        <label
                          htmlFor="exampleFormControlInput4"
                          className="form-label text-primary"
                        >
                          Recent Qualification
                          <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="recent_qualification"
                          value={userData.recent_qualification}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput4"
                          placeholder="Recent Qualification"
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
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Phone"
                          name="phone"
                          value={userData.phone}
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
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Contact No"
                          name="contact_no"
                          value={userData.contact_no}
                          onChange={handleOnchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                          Correspondence Address
                          <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Correspondence Address"
                          name="correspondence_address"
                          value={userData.correspondence_address}
                          onChange={handleOnchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                          Payroll Reference Number
                          <span className="required">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Payroll Reference number"
                          name="payroll_reference_number"
                          value={userData.payroll_reference_number}
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
                          type="date"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="dd/mm/yy"
                          name="date_of_joining"
                          value={userData.date_of_joining}
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
                          value={userData.medical_details}
                          onChange={handleOnchange}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                          National Insurance Number
                          <span className="required">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="National Insurance Number"
                          name="national_insurance_number"
                          value={userData.national_insurance_number}
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
                          value={userData.contract_type}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput4"
                          placeholder="Contract Type"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                          Bank Holder Name
                          <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Bank Holder Name"
                          name="bank_holder_name"
                          value={userData.bank_holder_name}
                          onChange={handleOnchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput4"
                          className="form-label text-primary"
                        >
                          Bank Name<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="bank_name"
                          value={userData.bank_name}
                          onChange={handleOnchange}
                          className="form-control"
                          id="exampleFormControlInput4"
                          placeholder="Bank Name"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                          Account No
                          <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Account No"
                          name="account_no"
                          value={userData.account_no}
                          onChange={handleOnchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                          Next To Kin Number
                          <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Next To Kin Number"
                          name="next_to_kin_number"
                          value={userData.next_to_kin_number}
                          onChange={handleOnchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label text-primary"
                        >
                          Permanent Address
                          <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="Permanent Address"
                          name="permanent_address"
                          value={userData.permanent_address}
                          onChange={handleOnchange}
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
