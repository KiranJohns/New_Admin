import React, { useRef, useState } from "react";

import { IMAGES, SVGICON } from "../Dashboard/Content";
import circle from "./../../../images/circle.svg";
import { Row, Col, Card, Button, ButtonGroup, Table } from "react-bootstrap";
import quotes from "./../../../images/quotes.svg";
import { RiChatDeleteFill } from "react-icons/ri";
import fetchData from "../../../axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const AddBundle = () => {
  const [course, setCourse] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    video: "",
    intro_video: "",
    thumbnail: "",
    resource: "",
    ppt: "",
  });
  const [filteredCourse, setFilteredCourse] = useState([]);
  const [allCourse, setAllCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const categoryRef = useRef();
  const courseRef = useRef();
  const navigate = useNavigate();
  const [category, setCAtegory] = useState(null);
  const [bundle, setBundle] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [sub, setSub] = useState(false);

  const makeRequest = fetchData();
  function handleChange(e) {
    setBundle((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleSubmit() {
    if (!bundle.name) {
      swal("please provide name");
      return;
    }
    if (!bundle.price) {
      swal("please provide price");
      return;
    }
    if (!bundle.description) {
      swal("please provide description");
      return;
    }
    if (!bundle.image) {
      swal("please provide image");
      return;
    }
    if (arr.length <= 0) {
      swal("please add courses");
      return;
    }

    let arr = [];
    selectedCourse.forEach((item) => {
      arr.push(item.id);
    });

    console.log(bundle);

    setLoading(true);
    const form = new FormData();
    form.append("name", bundle.name);
    form.append("price", bundle.price);
    form.append("description", bundle.description);
    form.append("courses", arr);
    form.append("image", bundle.image);
    makeRequest("POST", "/bundle/create-bundle", form)
      .then((res) => {
        setLoading(false);
        console.log(res);
        swal("Bundle Added");
        navigate("/view-bundles");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  useState(() => {
    makeRequest("GET", "/course/get-all-course")
      .then((res) => {
        setAllCourse(res?.data?.response);
        console.log(res?.data?.response);
      })
      .catch((err) => {
        console.log(err?.data);
      });
  }, []);
  return (
    <div className="row">
      <div className="col-xl-1"></div>
      <div className="col-xl-10">
        <div
          className="card"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            background: "#f5f5f7",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <form type="button" onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Bundle Name:
                    </h4>
                    <div className=" mb-3 ">
                      <input
                        type="text"
                        name="name"
                        value={bundle.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="bundle name"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Bundle Price:
                    </h4>
                    <div className=" mb-3 ">
                      <input
                        name="price"
                        value={bundle.price}
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                        placeholder="bundle price"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Select Course Category:
                    </h4>
                    <div className="form-group mb-3">
                      <select
                        onChange={(e) => {
                          let course = allCourse.filter((item) => {
                            if (item.category == e.target.value) {
                              return item;
                            }
                          });
                          courseRef.current.selectedIndex = 0;
                          setFilteredCourse(course);
                          setCAtegory(e.target.value);
                        }}
                        ref={categoryRef}
                        name="category"
                        className="form-control form-control"
                      >
                        <option value="">Select</option>
                        <option value="Care Course">Care Course</option>
                        <option value="Mandatory Care Courses">
                          Mandatory Care Course
                        </option>
                        <option value="Specialized Care Course">
                          Specialised Care Courses
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

                <div className="col-8 mt-4 ">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Card>
                      <Card.Body>
                        <Table responsive>
                          <thead>
                            <tr
                              style={{
                                background: "#212a50",
                                textAlign: "center",
                              }}
                            >
                              <th>
                                <strong>Index</strong>
                              </th>
                              <th>
                                <strong>Course Category</strong>
                              </th>
                              <th>
                                <strong>Course Name</strong>
                              </th>
                              <th>
                                <strong>Action</strong>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedCourse.map((item) => (
                              <tr>
                                <td style={{ textAlign: "center" }}>
                                  <strong>{item?.id}</strong>
                                </td>

                                <td style={{ textAlign: "center" }}>
                                  {item?.category}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {item?.name}
                                </td>
                                <td>
                                  {/* <Button
                                  className="me-2"
                                  variant="primary btn-icon-xxs"
                                >
                                  <BiSolidEdit />
                                </Button> */}
                                  <Button
                                    className="me-2"
                                    variant="danger btn-icon-xxs"
                                  >
                                    <RiChatDeleteFill
                                      onClick={() =>
                                        setSelectedCourse(
                                          selectedCourse.filter(
                                            (i) => i.id != item.id
                                          )
                                        )
                                      }
                                    />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </div>
                </div>

                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Add Course:
                    </h4>
                    <div className="form-group mb-3">
                      <select
                        ref={courseRef}
                        onChange={(e) => {
                          setSub(true);
                          if (!e.target.value) return;
                          if (
                            selectedCourse.find(
                              (item) => item.id == e.target.value
                            )
                          )
                            return;
                          setSelectedCourse((prev) => {
                            return [
                              ...prev,
                              filteredCourse.find(
                                (item) => item.id == e.target.value
                              ),
                            ];
                          });
                          categoryRef.current.selectedIndex = 0;
                        }}
                        defaultValue={"option"}
                        name="category"
                        className="form-control form-control"
                      >
                        <option value="">Select</option>
                        {filteredCourse.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>
                      {sub && (
                        <small
                          style={{
                            textAlign: "center",
                            marginLeft: "1.5rem",
                            color: "#5a9676",
                          }}
                        >
                          select again to add more courses
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Bundle Description:
                  </h4>
                  <div className="form-group ">
                    <textarea
                      value={bundle.description}
                      onChange={handleChange}
                      name="description"
                      className="form-control"
                      rows="4"
                      id="comment"
                      placeholder="Descriptiion"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="col-6">
                  <div style={{}}>
                    <div className="card-body">
                      <h4 className="" style={{ textAlign: "center" }}>
                        Upload Bundle Image:
                      </h4>
                      <div className="">
                        <label
                          htmlFor="formFile"
                          className="form-label"
                        ></label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          onChange={(e) =>
                            setBundle((prev) => {
                              return { ...prev, image: e.target.files[0] };
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="m-2 p-2 ">
                  {!loading ? (
                    <Button
                      class="btn btn-primary"
                      type="button"
                      variant="primary"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  ) : (
                    <button class="btn btn-primary" type="button" disabled>
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBundle;
