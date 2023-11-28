import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../Dashboard/Content";
import { Dropdown } from "react-bootstrap";
import BasicModal from "../Dashboard/BasicModal";
import { FaEye } from "react-icons/fa";
import { Button, ButtonGroup } from "react-bootstrap";
import { BiSolidEdit } from "react-icons/bi";
import { RiChatDeleteFill } from "react-icons/ri";
import fetchData from "../../../axios/index";
import { Row, Col, Card, Table, Badge, ProgressBar } from "react-bootstrap";


const tableData = [
  {
    id: "1",
    image: IMAGES.trans1,
    name: "Samantha William",
    tabid: "123456789",
    email: "samantha@gmail.com",
    phone: "68523652",
    city: "Jakarta",
    type: "Individual",
  },
  {
    id: "2",
    image: IMAGES.trans2,
    name: "Tony Soap",
    tabid: "123453254",
    email: "tony@gmail.com",
    phone: "52523652",
    city: "Phoenix",
    type: "Individual",
  },
  {
    id: "3",
    image: IMAGES.trans3,
    name: "Karen Hope",
    tabid: "123456452",
    email: "jkaren@hotmail.com",
    phone: "78525265",
    city: "Texas",
    type: "Company",
  },
  {
    id: "4",
    image: IMAGES.trans4,
    name: "Jordan Nico",
    tabid: "123442584",
    email: "jkaren@hotmail.com",
    phone: "98525265",
    city: "Dallas",
    type: "Individual",
  },
  {
    id: "5",
    image: IMAGES.trans5,
    name: "Nadila Adja",
    tabid: "654781357",
    email: "nadila@hotmail.com",
    phone: "10125265",
    city: "Houston",
    type: "Individual",
  },
  {
    id: "6",
    image: IMAGES.trans6,
    name: "Johnny Ahmad",
    tabid: "123454555",
    email: "johhnny@hotmail.com",
    phone: "22125265",
    city: "Chicago",
    type: "Individual",
  },
  {
    id: "7",
    image: IMAGES.trans7,
    name: "Dakota Farral",
    tabid: "235456789",
    email: "dakota@hotmail.com",
    phone: "55125265",
    city: "Philadelphia",
    type: "Company",
  },
  {
    id: "8",
    image: IMAGES.trans8,
    name: "Dimitres Viga",
    tabid: "568756789",
    email: "samantha@gmail.com",
    phone: "52523652",
    city: "Sharjah",
    type: "Individual",
  },
  {
    id: "9",
    image: IMAGES.trans9,
    name: "Samantha William",
    tabid: "999956789",
    email: "jkaren@hotmail.com",
    phone: "68523652",
    city: "Ajman",
    type: "Company",
  },
  {
    id: "10",
    image: IMAGES.trans5,
    name: "Samantha William",
    tabid: "882356789",
    email: "Aug 25, 2023",
    phone: "10125265",
    city: "Umm",
    type: "Individual",
  },
  {
    id: "11",
    image: IMAGES.trans2,
    name: "Samantha William",
    tabid: "123456789",
    email: "samantha@gmail.com",
    phone: "68523652",
    city: "Jakarta",
    type: "Individual",
  },
  {
    id: "12",
    image: IMAGES.trans1,
    name: "Tony Soap",
    tabid: "123453254",
    email: "tony@gmail.com",
    phone: "52523652",
    city: "Phoenix",
    type: "Individual",
  },
  {
    id: "13",
    image: IMAGES.trans5,
    name: "Karen Hope",
    tabid: "123456452",
    email: "jkaren@hotmail.com",
    phone: "78525265",
    city: "Texas",
    type: "Company",
  },
  {
    id: "14",
    image: IMAGES.trans3,
    name: "Jordan Nico",
    tabid: "123442584",
    email: "jkaren@hotmail.com",
    phone: "98525265",
    city: "Dallas",
    type: "Individual",
  },
  {
    id: "15",
    image: IMAGES.trans5,
    name: "Nadila Adja",
    tabid: "654781357",
    email: "nadila@hotmail.com",
    phone: "10125265",
    city: "Houston",
    type: "Individual",
  },
  {
    id: "16",
    image: IMAGES.trans6,
    name: "Johnny Ahmad",
    tabid: "123454555",
    email: "johhnny@hotmail.com",
    phone: "22125265",
    city: "Chicago",
    type: "Individual",
  },
  {
    id: "17",
    image: IMAGES.trans7,
    name: "Dakota Farral",
    tabid: "235456789",
    email: "dakota@hotmail.com",
    phone: "55125265",
    city: "Philadelphia",
    type: "Company",
  },
  {
    id: "18",
    image: IMAGES.trans8,
    name: "Dimitres Viga",
    tabid: "568756789",
    email: "samantha@gmail.com",
    phone: "52523652",
    city: "Sharjah",
    type: "Individual",
  },
  {
    id: "19",
    image: IMAGES.trans9,
    name: "Samantha William",
    tabid: "999956789",
    email: "jkaren@hotmail.com",
    phone: "68523652",
    city: "Ajman",
    type: "Company",
  },
  {
    id: "20",
    image: IMAGES.trans1,
    name: "Samantha William",
    tabid: "882356789",
    email: "Aug 25, 2023",
    phone: "10125265",
    city: "Umm",
    type: "Individual",
  },
  {
    id: "15",
    image: IMAGES.trans9,
    name: "Samantha William",
    tabid: "999956789",
    email: "jkaren@hotmail.com",
    phone: "68523652",
    city: "Ajman",
    type: "Company",
  },
  {
    id: "16",
    image: IMAGES.trans5,
    name: "Samantha William",
    tabid: "882356789",
    email: "Aug 25, 2023",
    phone: "10125265",
    city: "Umm",
    type: "Individual",
  },
  {
    id: "17",
    image: IMAGES.trans2,
    name: "Samantha William",
    tabid: "123456789",
    email: "samantha@gmail.com",
    phone: "68523652",
    city: "Jakarta",
    type: "Individual",
  },
  {
    id: "18",
    image: IMAGES.trans1,
    name: "Tony Soap",
    tabid: "123453254",
    email: "tony@gmail.com",
    phone: "52523652",
    city: "Phoenix",
    type: "Individual",
  },
];

const ViewCertificates = () => {
  // const childRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState([]);
  const makeRequest = fetchData();
  const [unchecked, setUnChecked] = useState(true);

  const handleChecked = (id) => {
    let temp = checked.map((data) => {
      if (id === data.id) {
        return { ...data, inputchecked: !data.inputchecked };
      }
      return data;
    });
    setChecked(temp);
  };
  const handleCheckedAll = (value) => {
    let temp = checked.map((data) => {
      return { ...data, inputchecked: value };
    });
    setChecked(temp);
    setUnChecked(!unchecked);
  };

  useEffect(() => {
    console.log("hi");
    makeRequest("GET", "/certificate/get-all-certificates")
      .then((res) => {
        setChecked(res.data.Response.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const recordsPage = 15;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = checked.slice(firstIndex, lastIndex);
  const npage = Math.ceil(checked.length / recordsPage);
  const number = [...Array(npage + 1).keys()].slice(1);
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="page-title flex-wrap">
                <div className="input-group search-area mb-md-0 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here..."
                  />
                  <span className="input-group-text">
                    <Link to={"#"}>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5605 15.4395L13.7527 11.6317C14.5395 10.446 15 9.02625 15 7.5C15 3.3645 11.6355 0 7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C9.02625 15 10.446 14.5395 11.6317 13.7527L15.4395 17.5605C16.0245 18.1462 16.9755 18.1462 17.5605 17.5605C18.1462 16.9747 18.1462 16.0252 17.5605 15.4395V15.4395ZM2.25 7.5C2.25 4.605 4.605 2.25 7.5 2.25C10.395 2.25 12.75 4.605 12.75 7.5C12.75 10.395 10.395 12.75 7.5 12.75C4.605 12.75 2.25 10.395 2.25 7.5V7.5Z"
                          fill="#01A3FF"
                        />
                      </svg>
                    </Link>
                  </span>
                </div>
                <div className="d-flex">
                  <Dropdown className="drop-select me-3">
                    <Dropdown.Toggle as="div" className="drop-select-btn ">
                      Newest
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Newest</Dropdown.Item>
                      {/* <Dropdown.Item>Oldest</Dropdown.Item>
                                            <Dropdown.Item>Recent</Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                  <a href="/create-certificate">
                    {" "}
                    <button
                      type="button"
                      className="btn btn-primary"

                      // onClick={() => childRef.current.openModal()}
                    >
                      + Assign Certificate
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
              <div className="table-responsive full-data">
                <div
                  id="example-student_wrapper"
                  className="dataTables_wrapper no-footer"
                >
                  <Table
                    responsive
                    id="example-student"
                  >
                    <thead>
                      <tr style={{ textAlign: "center", background: "#212A50", color:"#fff" }}>
                        <th>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkAll"
                            onClick={() => handleCheckedAll(unchecked)}
                          />
                        </th>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Course ID</th>
                        <th>Percentage</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((item, ind) => (
                        <tr key={ind} style={{ textAlign: "center" }}>
                          <td style={{ textAlign: "center" }}>
                            <div className="checkbox me-0 align-self-center">
                              <div className="custom-control custom-checkbox ">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`stud-${item.id}`}
                                  checked={item.inputchecked}
                                  onChange={() => handleChecked(item.id)}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`stud-${item.id}`}
                                ></label>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="text-primary font-w600">
                              ID {item.id}
                            </span>
                          </td>
                          <td>
                            <div className="">
                              <h4>{item.user_name}</h4>
                            </div>
                          </td>
                          <td>
                            <div className="email">{item.course_name}</div>
                            {/* user_id
                                user_name */}
                          </td>
                          <td>
                            <h6 className="mb-0">{item.percentage}</h6>
                          </td>
                          <td>
                            <h6 className="mb-0">{new Date(item.date).toLocaleDateString()}</h6>
                          </td>
                          <td>
                            <Button
                              className="me-2"
                              variant="success btn-icon-xxs"
                            >
                              <FaEye />
                            </Button>
                            <Button
                              className="me-2"
                              variant="danger btn-icon-xxs"
                            >
                              <RiChatDeleteFill />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="d-sm-flex text-center justify-content-between align-items-center">
                    <div className="dataTables_info">
                      Showing {lastIndex - recordsPage + 1} to{" "}
                      {tableData.length < lastIndex
                        ? tableData.length
                        : lastIndex}{" "}
                      of {tableData.length} entries
                    </div>
                    <div
                      className="dataTables_paginate paging_simple_numbers justify-content-center"
                      id="example-student_wrapper"
                    >
                      <Link
                        className="paginate_button previous disabled"
                        to="#"
                        onClick={prePage}
                      >
                        <i className="fa-solid fa-angle-left" />
                      </Link>
                      <span>
                        {number.map((n, i) => (
                          <Link
                            className={`paginate_button ${
                              currentPage === n ? "current" : ""
                            } `}
                            key={i}
                            onClick={() => changeCPage(n)}
                          >
                            {n}
                          </Link>
                        ))}
                      </span>
                      <Link
                        className="paginate_button next"
                        to="#"
                        onClick={nextPage}
                      >
                        <i className="fa-solid fa-angle-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <BasicModal ref={childRef} /> */}
    </>
  );
};

export default ViewCertificates;
