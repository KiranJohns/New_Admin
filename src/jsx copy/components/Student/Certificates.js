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
import { FaDownload } from "react-icons/fa";
import { Row, Col, Card, Table, Badge, ProgressBar } from "react-bootstrap";


const ViewCertificates = () => {
  // const childRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState([]);
  const makeRequest = fetchData();
  const [unchecked, setUnChecked] = useState(true);


  const [searchString, setSearchString] = useState("");
  const [allRecords, setAllRecords] = useState([]);

  useEffect(() => {
    setChecked(searchString ? allRecords.filter(item => item.user_name.toLowerCase().startsWith(searchString.toLowerCase())) : allRecords)
  },[searchString])

  useEffect(() => {
    makeRequest("GET", "/certificate/get-all-certificates")
      .then((res) => {
        console.log(res.data.Response);
        setAllRecords(res.data.Response);
        setChecked(res.data.Response);
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
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
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
                  <Table responsive id="example-student">
                    <thead>
                      <tr
                        style={{
                          textAlign: "center",
                          background: "#212A50",
                          color: "#fff",
                        }}
                      >
                        <th>
                         Sl No.
                        </th>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Course Name</th>
                        <th>Percentage</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ background: "white" }}>
                      {records.map((item, ind) => (
                        <tr key={ind} style={{ textAlign: "center" }}>
                          <td style={{ textAlign: "center" }}>
                           {++ind}
                          </td>
                          <td>
                            <span className="text-primary font-w600">
                              {item.sl}
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
                            <h6 className="mb-0">
                              {item.date}
                            </h6>
                          </td>
                          <td>
                            <a href={item.image} target="_blank" style={{color: 'white'}}>
                              <Button
                              title="View"
                                className="me-2"
                                variant="success btn-icon-xxs"
                              >
                                <FaEye />
                              </Button>
                            </a>
                            {/* <a href={item.image} download style={{color: 'white'}}>
                              <Button
                                className="me-2"
                                variant="primary btn-icon-xxs"
                              >
                               <FaDownload />
                              </Button>
                            </a> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="d-sm-flex text-center justify-content-between align-items-center">
                    <div className="dataTables_info">
                      Showing {lastIndex - recordsPage + 1} to{" "}
                      {records.length < lastIndex
                        ? records.length
                        : lastIndex}{" "}
                      of {allRecords && allRecords?.length} entries
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
