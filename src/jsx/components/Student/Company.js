import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../Dashboard/Content";
import { Dropdown } from "react-bootstrap";
import BasicModal from "../Dashboard/BasicModal";
import fetchData from "../../../axios";
import { FaEye } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { RiChatDeleteFill } from "react-icons/ri";
import { Button, ButtonGroup } from "react-bootstrap";
import { Row, Col, Card, Table, Badge, ProgressBar } from "react-bootstrap";
import swal from "sweetalert2";

const CompanyTable = () => {
  const childRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  // const [checked, setChecked] = useState(tableData);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const makeRequest = fetchData();
  const navigate = useNavigate();

  // const handleChecked = (id) => {
  //   let temp = checked.map((data) => {
  //     if (id === data.id) {
  //       return { ...data, inputchecked: !data.inputchecked };
  //     }
  //     return data;
  //   });
  //   setChecked(temp);
  // };
  // const handleCheckedAll = (value) => {
  //   let temp = checked.map((data) => {
  //     return { ...data, inputchecked: value };
  //   });
  //   setChecked(temp);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeRequest("GET", "/info/get-all-users");
        console.log(response);
        setUsers(
          response.data.response
            .reverse()
            .filter((item) => !item.block && item.type_of_account == "company")
        );
        setAllUsers(
          response.data.response
            .reverse()
            .filter((item) => !item.block && item.type_of_account == "company")
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  async function blockHandler(id) {
    try {
      const response = await makeRequest("GET", `/info/block-user/${id}`);
      setUsers(users.reverse().filter((item) => item.id != id));
      swal("Done!", "user successfully deleted", "success");
    } catch (error) {
      console.log(error);
    }
  }

  const recordsPage = 15;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordsPage);
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
                    onChange={(e) => {
                      if (e.target.value != "") {
                        return setUsers(
                          allUsers.filter((user) => {
                            return user.first_name.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase());
                          })
                        );
                      } else {
                        return setUsers(allUsers);
                      }
                    }}
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
                  <Button
                    // type="button"
                    className="btn btn-primary"
                    onClick={() => navigate("/add-user")}
                  >
                    + New Company
                  </Button>
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
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkAll"
                            // onClick={()=>handleCheckedAll(unchecked)}
                          />
                        </th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>City</th>
                        <th>Type</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ background: "white" }}>
                      {users.map((item, ind) => {
                        return (
                          <tr key={ind} style={{ textAlign: "center" }}>
                            <td>
                              <div className="checkbox me-0 align-self-center">
                                <div className="custom-control custom-checkbox ">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`stud-${item.id}`}
                                    checked={item.inputchecked}
                                    // onChange={() => handleChecked(item.id)}
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
                                {item?.id}
                              </span>
                            </td>
                            <td>
                              <div className="">
                                {/* <img src={item.image} alt="" className="avatar avatar-sm me-3" /> */}
                                <h4>
                                  {item?.first_name + " " + item?.last_name}
                                </h4>
                              </div>
                            </td>
                            <td>
                              <div className="email">{item?.email}</div>
                            </td>
                            <td>
                              <h6 className="mb-0">{item?.phone}</h6>
                            </td>
                            <td>
                              <h6 className="mb-0">{item?.city}</h6>
                            </td>

                            <td>
                              {item.type_of_account && (
                                <div
                                  className={`badge bg-${
                                    item.type_of_account === "company"
                                      ? "secondary"
                                      : item.type_of_account === "individual"
                                      ? "primary"
                                      : "warning"
                                  }`}
                                >
                                  Company
                                </div>
                              )}
                            </td>
                            <td>
                              <Button
                                onClick={() => {
                                  navigate("/user-detail", {
                                    state: { id: item.id },
                                  });
                                }}
                                className="me-2"
                                variant="success btn-icon-xxs"
                              >
                                <FaEye />
                              </Button>

                              <Button
                                className="me-2"
                                variant="danger btn-icon-xxs"
                                onClick={() => blockHandler(item.id)}
                              >
                                <RiChatDeleteFill />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <div className="d-sm-flex text-center justify-content-between align-items-center">
                    <div className="dataTables_info">
                      Showing {lastIndex - recordsPage + 1} to{" "}
                      {users.length < lastIndex ? users.length : lastIndex} of{" "}
                      {users.length} entries
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
      <BasicModal ref={childRef} />
    </>
  );
};

export default CompanyTable;
