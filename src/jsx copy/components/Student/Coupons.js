import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../Dashboard/Content";
import { Dropdown, Modal } from "react-bootstrap";
import BasicModal from "../Dashboard/BasicModal";
import { FaEye } from "react-icons/fa";
import { Button, ButtonGroup } from "react-bootstrap";
import { BiSolidEdit } from "react-icons/bi";
import { RiChatDeleteFill } from "react-icons/ri";
import fetchData from "../../../axios";
import swal from "sweetalert";
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
    type: "Active",
  },
  {
    id: "2",
    image: IMAGES.trans2,
    name: "Tony Soap",
    tabid: "123453254",
    email: "tony@gmail.com",
    phone: "52523652",
    city: "Phoenix",
    type: "Active",
  },
  {
    id: "3",
    image: IMAGES.trans3,
    name: "Karen Hope",
    tabid: "123456452",
    email: "jkaren@hotmail.com",
    phone: "78525265",
    city: "Texas",
    type: "Active",
  },
  {
    id: "4",
    image: IMAGES.trans4,
    name: "Jordan Nico",
    tabid: "123442584",
    email: "jkaren@hotmail.com",
    phone: "98525265",
    city: "Dallas",
    type: "Active",
  },
  {
    id: "5",
    image: IMAGES.trans5,
    name: "Nadila Adja",
    tabid: "654781357",
    email: "nadila@hotmail.com",
    phone: "10125265",
    city: "Houston",
    type: "Active",
  },
  {
    id: "6",
    image: IMAGES.trans6,
    name: "Johnny Ahmad",
    tabid: "123454555",
    email: "johhnny@hotmail.com",
    phone: "22125265",
    city: "Chicago",
    type: "Expired",
  },
  {
    id: "7",
    image: IMAGES.trans7,
    name: "Dakota Farral",
    tabid: "235456789",
    email: "dakota@hotmail.com",
    phone: "55125265",
    city: "Philadelphia",
    type: "Expired",
  },
  {
    id: "8",
    image: IMAGES.trans8,
    name: "Dimitres Viga",
    tabid: "568756789",
    email: "samantha@gmail.com",
    phone: "52523652",
    city: "Sharjah",
    type: "Expired",
  },
  {
    id: "9",
    image: IMAGES.trans9,
    name: "Samantha William",
    tabid: "999956789",
    email: "jkaren@hotmail.com",
    phone: "68523652",
    city: "Ajman",
    type: "Expired",
  },
];

const CouponList = () => {
  const [showModal, setShowModal] = useState(false);
  // const childRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState(tableData);
  const [unchecked, setUnChecked] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState({amount: "", coupon_code: "", coupon_type: "", id: "", minimum_purchase: "", valid_till: ""});
  const navigate = useNavigate();
  const makeRequest = fetchData();

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

  function handleDelete(id) {
    makeRequest("DELETE", `/coupon/delete-coupon/${id}`)
      .then((res) => {
        setCoupons((prev) => {
          return prev.filter((item) => item.id !== id);
        });
        swal("Done!", "coupon deleted", "success");
      })
      .catch((err) => console.log(err));
  }

  makeRequest("GET", "/coupon/list-coupons").then((res) => {
    if (res?.data.response) {
      setCoupons(res?.data.response.reverse());
    }
  }).catch(err => {
    console.log(err);
  });

  function handelEdit(id) {
    makeRequest("PATCH", `/coupon/edit-coupon`,{
      ...coupon,
      coupon_id: coupon.id
    })
      .then((res) => {
        setShowModal(false)
        setCoupons((prev) => {
          return prev.filter((item) => item.id !== id);
        });
        swal("Done!", "Coupon Updated", "success");
      })
      .catch((err) => console.log(err));
  }

  function handleChange(e) {
    setCoupon(prev => {
      return {
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }

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
                    </Dropdown.Menu>
                  </Dropdown>
                  <a href="/create-coupon">  <button
                    type="button"
                    className="btn btn-primary"

                  // onClick={() => childRef.current.openModal()}
                  >
                    + New Coupon
                  </button></a>
                </div>
              </div>
            </div>
            <div className="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">

              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <div className="">
                  <div style={{ background: "#212A50" }} className="">
                    <h4 style={{ color: "#fff", padding: ".6rem" }}>Edit Coupon</h4>
                  </div>
                  <form type="button" action="">
                    <div className="row">
                      <div className="col-6">
                        <div style={{}}>
                          <div className="card-body">
                            <h4 className="">Coupon Code</h4>
                            <div className="mb-3 ">
                              <input
                                type="text"
                                className="form-control  input-default "
                                placeholder="LFC152"
                                name="coupon_code"
                              value={coupon.coupon_code}
                              // onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div style={{}} className="">
                          <div className="card-body">
                            <h4 className="">Coupon Type:</h4>
                            <div className="form-group mb-3">
                              <select
                                // onChange={handleChange}
                                name="coupon_type"
                                className="form-control"
                              onChange={handleChange}
                              >
                                <option value={coupon.coupon_type}>{coupon.coupon_type}</option>
                                <option value="Cash">Cash</option>
                                <option value="Percent">Percent</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-6" style={{}}>
                        <div className="card-body">
                          <h4 className="">Valid Till:</h4>
                          <div className=" mb-3 ">
                            {/* <DatePicker  className="form-control" style={{width:'100%'}}/>  */}

                            <input
                              name="valid_till"
                              value={new Date(coupon.valid_till).toLocaleDateString('en-CA')}
                              onChange={handleChange}
                              type="date"
                              className="form-control input-default "
                            />
                          </div>
                        </div>

                        <div style={{}}>
                          <div className="card-body">
                            <h4 className="">Minimum Purchase(£)</h4>
                            <div className=" mb-3">
                              <input
                                name="minimum_purchase"
                                value={coupon.minimum_purchase}
                                onChange={handleChange}
                                type="number"
                                className="form-control input-default "
                                placeholder=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>  </div>

                    <div style={{}}>
                      <div className="card-body col-6">
                        <h4 style={{ textAlign: "" }} className="">
                          Amount:
                        </h4>
                        <div className="form-group ">
                          <input
                            name="amount"
                            value={coupon.amount}
                            onChange={handleChange}
                            type="number"
                            className="form-control input-default "
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div className="m-2 p-2 ">
                        <Button
                          className=""
                          variant="primary"
                          onClick={handelEdit}
                          type="button"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </form>

                </div>
              </Modal>

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
                      <tr style={{ textAlign: "center", background: "#212A50", color:"#fff", fontWeight:'bold'  }}>
                        <th>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkAll"
                            onClick={() => handleCheckedAll(unchecked)}
                          />
                        </th>

                        <th>Coupon Code</th>
                        <th>Coupon Type</th>
                        <th>Minimum Purchased</th>
                        <th>Amount</th>
                        <th>Valid till</th>
                        <th>Status</th>

                        <th className="">Action</th>
                      </tr>
                    </thead>
                    <tbody style={{background:"white"}}>
                      {coupons &&
                        coupons.map((item, ind) => {
                          return (
                            <tr style={{ textAlign: "center" }} key={ind}>
                              <td >
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
                                <div className="">
                                  <h4>{item?.coupon_code}</h4>
                                </div>
                              </td>
                              <td>
                                <span className="text-primary font-w600">
                                  {item?.coupon_type}
                                </span>
                              </td>
                              <td>
                                <div className="email">
                                  {item?.minimum_purchase}
                                </div>
                              </td>
                              <td>
                                <h6 className="mb-0">{item?.amount}</h6>
                              </td>
                              <td>
                                <h6 className="mb-0">
                                  {new Date(
                                    item?.valid_till
                                  ).toLocaleDateString()}
                                </h6>
                              </td>

                              <td>
                                <div
                                  className={`badge bg-${new Date(item?.valid_till) > new Date()
                                    ? "success"
                                    : "warning"
                                    }`}
                                >
                                  {new Date(item?.valid_till) > new Date()
                                    ? "Active"
                                    : "Inactive"}
                                </div>
                              </td>
                              <td>
                                <Button
                                  className="me-2"
                                  variant="primary btn-icon-xxs"
                                  onClick={() =>{
                                    setCoupon(coupons.find(c => c.id === item.id))
                                    setShowModal(true)
                                  }}
                                >
                                  <BiSolidEdit />
                                </Button>
                                <Button
                                  onClick={() => handleDelete(item.id)}
                                  className="me-2"
                                  variant="danger btn-icon-xxs"
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
                            className={`paginate_button ${currentPage === n ? "current" : ""
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

export default CouponList;
