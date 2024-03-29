import React, { useRef, useState } from "react";

import { IMAGES, SVGICON } from "../Dashboard/Content";
import circle from "./../../../images/circle.svg";
import { Row, Col, Card, Button, ButtonGroup, Table } from "react-bootstrap";
import quotes from "./../../../images/quotes.svg";
import { RiChatDeleteFill } from "react-icons/ri";
import fetchData from "../../../axios";
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router-dom";

const EditBundle = () => {
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
  const [selectBundle, setSelectBundle] = useState({});
  const [image, setImage] = useState({});
  
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const categoryRef = useRef();
  const courseRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCAtegory] = useState(null);
  const [bundle, setBundle] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    id: ""
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
    let arr = [];
    selectedCourse.forEach((item) => {
      arr.push(item.id);
    });
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
    if (arr?.length <= 0) {
      swal("please add courses");
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("name", bundle.name);
    form.append("price", bundle.price);
    form.append("description", bundle.description);
    form.append("courses", JSON.stringify(arr));
    form.append("id", bundle.id);
    makeRequest("POST", "/bundle/update-bundle-data", form)
      .then((res) => {
        setLoading(false);
        console.log(res);
        swal("Bundle Updated");
        // navigate("/view-bundles");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  function updatedImage() {
    if (!image) {
      swal("please add courses");
      return;
    }

    setImageLoading(true);
    const form = new FormData();
    form.append("id", bundle.id);
    form.append("image", image);
    makeRequest("POST", "/bundle/update-bundle-image", form)
      .then((res) => {
        setImageLoading(false);
        console.log(res);
        swal("Bundle Updated");
        navigate("/view-bundles");
      })
      .catch((err) => {
        setImageLoading(false);
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

    console.log(location.state);
    makeRequest("GET", `/bundle/get-bundle-by-id/${location.state.id}`)
      .then((res) => {
        console.log(res.data.response[0]);
        setBundle({
          id: res.data.response[0].id,
          name: res.data.response[0].name,
          price: res.data.response[0].price,
          description: res.data.response[0].description,
        });
        setSelectBundle(res.data.response[0] || {});
        setSelectedCourse(res.data.response[0].courses);
      })
      .catch((err) => {
        console.log(err);
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
                      {/* <input
                        type="text"
                        value={bundle.name}
                        className="form-control"
                        placeholder="bundle name"
                      /> */}
                      <select
                        name="name"
                        value={bundle.name}
                        onChange={(e) =>
                          setBundle((prev) => {
                            return {
                              ...prev,
                              name: e.target.value,
                            };
                          })
                        }
                        className="form-control form-control"
                      >
                        <option value="">Name</option>
                        <option value="Care Bundle">Care Bundle</option>
                        <option value="Mandatory Care Bundle">
                          Mandatory Care Bundle
                        </option>
                        <option value="Specialised Care Bundle">
                          Specialised Care Bundle
                        </option>
                        <option value="Recovery Care Bundle">
                          Recovery Care Bundle
                        </option>
                        <option value="Child Care Bundle">
                          Child Care Bundle
                        </option>
                        <option value="Online Care Bundle">
                          Online Care Bundle
                        </option>
                      </select>
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
                        <option value="Mandatory Care Course">
                          Mandatory Care Course
                        </option>
                        <option value="Specialised Care Course">
                          Specialized Care Course
                        </option>
                        <option value="Recovery Care Course">
                          Recovery Care Course
                        </option>
                        <option value="Child Care Course">
                          Child Care Course
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-4"></div>

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

                <div className="col-12 mt-4 ">
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
                            {selectedCourse.map((item, idx) => (
                              <tr>
                                <td style={{ textAlign: "center" }}>
                                  <strong>{++idx}</strong>
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
                            setImage(e.target.files[0] || {})
                          }
                        />
                        <small>
                          Width*Height-760*460, size{"<"}100kb, format-jpg, png,
                          jpeg, webp*(preffered)
                        </small>
                        {!imageLoading ? (
                    <Button
                      class="btn btn-primary"
                      type="button"
                      variant="primary"
                      onClick={updatedImage}
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

export default EditBundle;
