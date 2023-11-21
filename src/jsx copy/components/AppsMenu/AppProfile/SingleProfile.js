import React, {
  Fragment,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Button, Dropdown, Modal, Nav } from "react-bootstrap";
import ReactModal from "react-modal";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ImCross } from "react-icons/im";
import { FaDownload } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { Link } from "react-router-dom";
import LightGallery from "lightgallery/react";
import Highlight from "react-highlight";
import { BiSolidEdit } from "react-icons/bi";
import swal from "sweetalert";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

//** Import Image */
//** Import Image */
import profile01 from "../../../../images/profile/1.jpg";
import profile02 from "../../../../images/profile/2.jpg";
import profile03 from "../../../../images/profile/3.jpg";
import profile04 from "../../../../images/profile/4.jpg";
import profile05 from "../../../../images/profile/5.jpg";
import profile06 from "../../../../images/profile/6.jpg";
import profile07 from "../../../../images/profile/7.jpg";
import profile08 from "../../../../images/profile/8.jpg";
import profile09 from "../../../../images/profile/9.jpg";
import tempProfile from "../../../../images/profile/profile.png";
import PageTitle from "../../../layouts/PageTitle";
import { Row, Col, Card } from "react-bootstrap";
import fetchData from "../../../../axios";
import axios from "axios";
const sidebarLink = [
  { to: "default-tab", title: "Default Tab" },
  { to: "custom-tab", title: "Custom Tab" },
  { to: "nav-pills", title: "Nav Pills Tabs" },
  { to: "nav-pills-tabs", title: "Nav Pills Tabs-2" },
  { to: "vertical-nav", title: "Vertical Nav Pill" },
  { to: "vertical-nav-pill", title: "Vertical Nav Pill-2" },
  { to: "tab-icon", title: "Tab with Icon" },
];

const tabData = [
  {
    name: "Home",
    icon: "home",
    content:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
  },
  {
    name: "Profile",
    icon: "user",
    content:
      "Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor.      ",
  },
  {
    name: "Contact",
    icon: "phone",
    content:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
  },

  {
    name: "Message",
    icon: "envelope",
    content:
      "Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor.      ",
  },
];

const galleryBlog = [
  { image: profile03 },
  { image: profile04 },
  { image: profile02 },
  { image: profile04 },
  { image: profile03 },
  { image: profile02 },
];
const initialState = false;
const reducer = (state, action) => {
  switch (action.type) {
    case "sendMessage":
      return { ...state, sendMessage: !state.sendMessage };
    case "postModal":
      return { ...state, post: !state.post };
    case "linkModal":
      return { ...state, link: !state.link };
    case "cameraModal":
      return { ...state, camera: !state.camera };
    case "replyModal":
      return { ...state, reply: !state.reply };
    default:
      return state;
  }
};

const SingleProfile = () => {
  const [activeLink, setActiveLink] = useState(0);
  const onInit = () => {
    //console.log('lightGallery has been initialized');
  };
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
    account_on: "",
    sort_code: "",
    roll_number: "",
    staff_cv: "",
    recent_qualification: "",
    next_to_kin_number: "",
    permanent_address: "",
  });
  const options = {
    settings: {
      overlayColor: "#000000",
    },
  };

  const [openModalForQualification, setOpenModalForQualification] =
    useState(false);
  const [openModalForWorkExp, setOpenModalForWorkExp] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const makeRequest = fetchData();

  const [banner, setBanner] = useState(null);
  const [profile, setProfile] = useState(null);
  const [changeBanner, setChangeBanner] = useState(false);
  const [changeProfile, setChangeProfile] = useState(false);
  const profileRef = useRef();
  const bannerRef = useRef();
  const [qualificationInfo, setQualificationInfo] = useState({
    course_name: "",
    university: "",
    content: "",
  });

  const [experienceInfo, setExperienceInfo] = useState({
    organization: "",
    designation: "",
    no_of_years: "",
    content: "",
  });

  function handleExperienceInfoChange(e) {
    console.log(e.target);
    setExperienceInfo({
      ...experienceInfo,
      [e.target.name]: e.target.value,
    });
  }

  function handleQualificationInfoChange(e) {
    setQualificationInfo({
      ...qualificationInfo,
      [e.target.name]: e.target.value,
    });
  }
  const [showEditProfileBtn, setShowEditProfileBtn] = useState(false);
  const [qualification, setQualification] = useState();
  const [qualifications, setQualifications] = useState([]);

  const [experience, setExperience] = useState();
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    makeRequest("GET", "/info/get-admin-info")
      .then((res) => {
        if (res?.data?.response[0]) {
          console.log(res.data.response[0]);
          setUserData(res.data.response[0]);
          setProfile(res.data.response[0].profile_image);
          setBanner(res.data.response[0].profile_banner);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    makeRequest("GET", "/info/get-qualification")
      .then((res) => {
        setQualifications(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });

    makeRequest("GET", "/info/get-experience")
      .then((res) => {
        setExperiences(res.data.response);
        console.log(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function updateProfile(image) {
    const file = new FormData();
    file.append("image", image);
    makeRequest("PATCH", "/info/update-admin-profile-image", file)
      .then((res) => {
        console.log(res);
        swal("Done!", "Profile image updated", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateBanner(image) {
    const file = new FormData();
    file.append("image", image);
    makeRequest("POST", "/info/update-admin-profile-banner", file)
      .then((res) => {
        console.log(res);
        swal("Done!", "banner image updated", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function submitQualification() {
    console.log(qualificationInfo);
    const file = new FormData();
    file.append("doc", qualification);
    file.append("course_name", qualificationInfo.course_name);
    file.append("university", qualificationInfo.university);
    file.append("content", qualificationInfo.content);

    makeRequest("POST", "/info/set-qualification", file)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function submitExperience() {
    console.log(experienceInfo);
    const file = new FormData();
    file.append("doc", experience);
    file.append("organization", experienceInfo.organization);
    file.append("designation", experienceInfo.designation);
    file.append("no_of_years", experienceInfo.no_of_years);
    file.append("content", experienceInfo.content);

    makeRequest("POST", "/info/set-experience", file)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleQualificationDelete(id) {
    makeRequest("DELETE", `/info/delete-qualification/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleExperienceDelete(id) {
    makeRequest("DELETE", `/info/delete-experience/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function profileOnChange(e) {
    setProfile(e.target.files[0]);
    setTimeout(() => {
      updateProfile(e.target.files[0])
    }, 3000);
    setChangeProfile(true);
  }
  function bannerOnChange(e) {
    setBanner(e.target.files[0]);
    setChangeBanner(true);
    setTimeout(() => {
      updateBanner(e.target.files[0])
    }, 3000);
  }

  // function profileOnMouse
  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />
      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content ">
                <div
                  className="cover-photo rounded "
                  style={{
                    backgroundImage: changeBanner
                      ? `url(${URL.createObjectURL(banner)})`
                      : banner
                  }}
                >
                  <Button
                    className="me-2"
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                    }}
                    variant="primary btn-icon-xxs"
                    onClick={() => bannerRef.current.click()}
                  >
                    <BiSolidEdit />
                  </Button>
                  <input
                    ref={bannerRef}
                    style={{ display: "none" }}
                    type="file"
                    onChange={(e) => {
                      bannerOnChange(e);
                    }}
                  />
                </div>
              </div>
              <div className="profile-info">
                <div
                  className="profile-photo "
                  onMouseOver={() => setShowEditProfileBtn(true)}
                  onMouseLeave={() => setShowEditProfileBtn(false)}
                >
                  <img
                    style={{ width: "8rem", height: "7rem" }}
                    src={changeProfile ? URL.createObjectURL(profile) : profile}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                  <input
                    type="file"
                    ref={profileRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      profileOnChange(e);
                    }}
                  />
                  <Button
                    className="me-2"
                    style={{
                      opacity: showEditProfileBtn ? "1" : "-1",
                      transition: "0.5s",
                      position: "absolute",
                      top: "35px",
                      left: "30px",
                    }}
                    variant="primary btn-icon-xxs"
                    onClick={() => profileRef.current.click()}
                  >
                    <BiSolidEdit />
                  </Button>
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">
                      {userData?.employee_name}
                    </h4>
                    {/* <p style={{ visibility: "hidden" }}>{userData.designation}</p> */}
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">{userData.email}</h4>
                    {/* <p style={{ visibility: "hidden" }}>Email</p> */}
                  </div>
                </div>
              </div>
              <Col xl={12}>
                <Tabs
                  defaultActiveKey="profile"
                  id="fill-tab-example"
                  className="mb-3 mt-2"
                  fill
                >
                  <Tab eventKey="profile" title="Profile">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <a href="/edit-profile">
                          {" "}
                          {/* <Button className="me-2" variant=" btn-icon-xxs"> */}
                          <BiSolidEdit
                            style={{
                              fontSize: "1.7rem",
                              border: "solid 1px #212a50",
                            }}
                          />
                          {/* </Button> */}
                        </a>
                      </div>
                    </div>
                    <Table bordered hover>
                      <thead>
                        {/* <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr> */}
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: "700" }} className="col-5">
                            Employee ID
                          </td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.employee_id}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Employee Name</td>
                          <td style={{ fontWeight: "600" }}>
                            {userData?.employee_name}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Designation</td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.designation}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Department</td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.department}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Phone</td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.phone}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Email</td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.email}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Contact No</td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.contact_no}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Gender</td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.gender}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Date of Birth</td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.date_of_birth}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>
                            Next to Kin Name
                          </td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.next_to_kin}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>
                            Next to Kin Number
                          </td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.next_to_kin_number}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>
                            Payroll Reference number
                          </td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.payroll_reference_number}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Medical Details</td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.medical_details}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>
                            National Insurance Number
                          </td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.national_insurance_number}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Contract Type</td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.contract_type}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>
                            Date of joining
                          </td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.date_of_joining}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>
                            Correspondence Address
                          </td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.correspondence_address}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Brief Profile</td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.brief_profile}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>
                            Permanent Address
                          </td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.brief_profile}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>
                            Recent Qualification
                          </td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.recent_qualification}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>
                            Permanent Address
                          </td>
                          <td style={{ fontWeight: "600" }}>
                            {userData.permanent_address}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Staff CV</td>
                          <td style={{ fontWeight: "600" }}>
                            <a
                              target="_blank"
                              href="userData.staff_cv"
                              download="staff-cv"
                              style={{ color: "blue" }}
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Agreement</td>
                          <td style={{ fontWeight: "600" }}>
                            I have read and agree to Learning Ltd
                            <a href="#" style={{ color: "blue" }}>
                              {" "}
                              terms and Conditions
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <div style={{ padding: "2rem", background: "" }}>
                      <h3>Bank Details</h3>
                      <Table bordered hover>
                        <thead>
                          {/* <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr> */}
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ fontWeight: "700" }} className="col-5">
                              Bank Holder Name
                            </td>
                            <td style={{ fontWeight: "600" }}></td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: "700" }}>Bank Name</td>
                            <td style={{ fontWeight: "600" }}></td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: "700" }}>Accoount No</td>
                            <td style={{ fontWeight: "600" }}></td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: "700" }}>Sort Code</td>
                            <td style={{ fontWeight: "600" }}></td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: "700" }}>Roll Number</td>
                            <td style={{ fontWeight: "600" }}>0</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </Tab>

                  <Tab eventKey="qualification" title="Qualification">
                    <Modal
                      onHide={() => setOpenModalForQualification(false)}
                      show={openModalForQualification}
                    >
                      <div className="">
                        <div style={{ background: "#212A50" }} className="">
                          <h4 style={{ color: "#fff", padding: ".6rem" }}>
                            Add Qualification
                          </h4>
                        </div>
                        <form type="button" action="">
                          <div className="row p-2" style={{ display: "flex" }}>
                            <div className="col-6 form-group mb-3 ">
                              <input
                                className="form-control"
                                name="course_name"
                                value={qualificationInfo.course_name}
                                type="text"
                                onChange={handleQualificationInfoChange}
                                placeholder="Course Name"
                              />
                            </div>
                            <div className="col-6 form-group mb-3 ">
                              <input
                                className="form-control "
                                name="university"
                                value={qualificationInfo.university}
                                onChange={handleQualificationInfoChange}
                                type="text"
                                placeholder="University/Institute Name"
                              />
                            </div>

                            <div className="col-12 form-group mb-3 ">
                              <label htmlFor="">Select Document</label>
                              <input
                                className="form-control"
                                onChange={(e) =>
                                  setQualification(e.target.files[0])
                                }
                                type="file"
                                id="formFile"
                              />
                            </div>

                            <div className="col-12 form-group mb-3 mt-3">
                              <textarea
                                name="content"
                                value={qualificationInfo.content}
                                onChange={handleQualificationInfoChange}
                                className="form-control"
                                rows="2"
                                id="qnote"
                                placeholder="Content"
                              ></textarea>
                            </div>
                            <div>
                              <Button
                                className=""
                                variant="primary"
                                type="button"
                                onClick={submitQualification}
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </Modal>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        style={{ marginTop: "1rem", marginRight: "1rem" }}
                        variant="primary"
                        size="md"
                        active
                        onClick={() => setOpenModalForQualification(true)}
                      >
                        Upload Document
                      </Button>
                    </div>
                    <Table striped style={{ marginTop: "1rem" }}>
                      <thead style={{ backgroundColor: "gray" }}>
                        <tr>
                          <th>Course Name</th>
                          <th>University Name</th>
                          <th>Note</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {qualifications &&
                          qualifications.map((item) => (
                            <tr>
                              <td>{item.course_name}</td>
                              <td>{item.university}</td>
                              <td>{item.content}</td>
                              <td>
                                <a href={item.doc}>
                                  <Button
                                    variant="success"
                                    size="sm"
                                    style={{ marginRight: ".3rem" }}
                                  >
                                    <FaDownload style={{ fontSize: "1rem" }} />
                                  </Button>
                                </a>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() =>
                                    handleQualificationDelete(item.id)
                                  }
                                >
                                  <ImCross style={{ fontSize: "1rem" }} />
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Tab>

                  <Tab eventKey="Work" title="Work Experience">
                    <Modal
                      onHide={() => setOpenModalForWorkExp(false)}
                      show={openModalForWorkExp}
                    >
                      <div className="">
                        <div style={{ background: "#212A50" }} className="">
                          <h4 style={{ color: "#fff", padding: ".6rem" }}>
                            Add Experience
                          </h4>
                        </div>
                        <form type="button" action="">
                          <div className="row p-2" style={{ display: "flex" }}>
                            <div className="col-6 form-group mb-3 ">
                              <input
                                className="form-control"
                                name="organization"
                                type="text"
                                value={experienceInfo.organization}
                                onChange={handleExperienceInfoChange}
                                placeholder="Organisation"
                              />
                            </div>
                            <div className="col-6 form-group mb-3 ">
                              <input
                                className="form-control "
                                name="designation"
                                type="text"
                                placeholder="Designation"
                                value={experienceInfo.designation}
                                onChange={handleExperienceInfoChange}
                              />
                            </div>

                            <div className="col-6 form-group mb-3 ">
                              <label htmlFor="">Select Document</label>
                              <input
                                className="form-control"
                                onChange={(e) =>
                                  setExperience(e.target.files[0])
                                }
                                type="file"
                                id="formFile"
                              />
                            </div>

                            <div className="col-6 form-group mb-3 ">
                              <label
                                style={{ visibility: "hidden" }}
                                htmlFor=""
                              >
                                No. of Years
                              </label>
                              <input
                                className="form-control"
                                value={experienceInfo.no_of_years}
                                name="no_of_years"
                                type="text"
                                placeholder="No. of Years"
                                onChange={handleExperienceInfoChange}
                              />
                            </div>

                            <div className="col-12 form-group mb-3 mt-3">
                              <textarea
                                value={experienceInfo.content}
                                onChange={handleExperienceInfoChange}
                                name="content"
                                className="form-control"
                                rows="2"
                                id="qnote"
                                placeholder="Content"
                              ></textarea>
                            </div>
                            <div>
                              <Button
                                className=""
                                variant="primary"
                                type="button"
                                onClick={submitExperience}
                              >
                                Upload
                              </Button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </Modal>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        style={{ marginTop: "1rem", marginRight: "1rem" }}
                        variant="primary"
                        size="md"
                        active
                        onClick={() => setOpenModalForWorkExp(true)}
                      >
                        Upload Document
                      </Button>
                    </div>
                    <Table striped style={{ marginTop: "1rem" }}>
                      <thead style={{ backgroundColor: "gray" }}>
                        <tr>
                          <th>Organization Name</th>
                          <th>Position</th>
                          <th>No. of Years</th>
                          <th>Note</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {experiences &&
                          experiences.map((item) => (
                            <tr>
                              <td>{item.organization_name}</td>
                              <td>{item.designation}</td>
                              <td>{item.no_of_years}</td>
                              <td>{item.content}</td>
                              <td>
                                <a href={item.doc} target="_blank">
                                  <Button
                                    variant="success"
                                    size="sm"
                                    style={{ marginRight: ".3rem" }}
                                  >
                                    <FaDownload style={{ fontSize: "1rem" }} />
                                  </Button>
                                </a>
                                <Button
                                  onClick={() =>
                                    handleExperienceDelete(item.id)
                                  }
                                  variant="secondary"
                                  size="sm"
                                >
                                  <ImCross style={{ fontSize: "1rem" }} />
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Tab>

                  {/* <Tab eventKey="documents" title="Documents" disabled >

                  </Tab> */}
                </Tabs>
              </Col>
            </div>
          </div>
        </div>
      </div>

      {/* Link Modal */}
      <Modal
        show={state.link}
        className="modal fade post-input"
        id="linkModal"
        onHide={() => dispatch({ type: "linkModal" })}
        centered
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Social Links</h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={() => dispatch({ type: "linkModal" })}
            ></button>
          </div>
          <div className="modal-body">
            <Link className="btn-social me-1 facebook" to="/app-profile">
              <i className="fab fa-facebook-f" />
            </Link>
            <Link className="btn-social me-1 google-plus" to="/app-profile">
              {" "}
              <i className="fab fa-google-plus" />
            </Link>
            <Link className="btn-social me-1 linkedin" to="/app-profile">
              <i className="fab fa-linkedin" />
            </Link>
            <Link className="btn-social me-1 instagram" to="/app-profile">
              {" "}
              <i className="fab fa-instagram" />
            </Link>
            <Link className="btn-social me-1 twitter" to="/app-profile">
              <i className="fab fa-twitter" />
            </Link>
            <Link className="btn-social me-1 youtube" to="/app-profile">
              <i className="fab fa-youtube" />
            </Link>
            <Link className="btn-social whatsapp" to="/app-profile">
              <i className="fab fa-whatsapp" />
            </Link>
          </div>
        </div>
      </Modal>
      {/* Camera Modal */}
      <Modal
        show={state.camera}
        className="modal fade"
        id="cameraModal"
        onHide={() => dispatch({ type: "cameraModal" })}
        centered
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Upload images</h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={() => dispatch({ type: "cameraModal" })}
            ></button>
          </div>
          <div className="modal-body">
            <div className="input-group custom_file_input mb-3">
              <span className="input-group-text">Upload</span>
              <div className="form-file">
                <input type="file" className="form-file-input form-control" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default SingleProfile;
