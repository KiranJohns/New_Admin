import React, { useState } from "react";

import { IMAGES, SVGICON } from "../Dashboard/Content";
import circle from "./../../../images/circle.svg";
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import quotes from "./../../../images/quotes.svg";
import fetchData from "../../../axios";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const inputBlog = [
  {
    inputid: "1234",
    lable: "Calories: 217.",
    inputid2: "23456",
    lable2: "2 tablespoons butter, softened, divided",
  },
  {
    inputid: "1235",
    lable: "Water: 61%",
    inputid2: "23457",
    lable2: "1 teaspoon minced fresh parsley",
  },
  {
    inputid: "1236",
    lable: "Protein: 26.1 grams.",
    inputid2: "23458",
    lable2: "1/2 teaspoon minced garlic",
  },
  {
    inputid: "1237",
    lable: "Carbs: 0 grams.",
    inputid2: "23459",
    lable2: "1/4 teaspoon reduced-sodium soy sauce",
  },
  {
    inputid: "1238",
    lable: "Sugar: 0 grams.",
    inputid2: "23460",
    lable2: "1 beef flat iron steak or boneless top sirloin steak (3/4 pound)",
  },
  {
    inputid: "1239",
    lable: "Fiber: 0 grams.",
    inputid2: "23461",
    lable2: "1/8 teaspoon salt",
  },
  {
    inputid: "1240",
    lable: "Vitamin: 10 grams.",
    inputid2: "23462",
    lable2: "1/8 teaspoon pepper",
  },
];

const cardBlog = [
  { image: IMAGES.avatarpng1, title: "Samantha W." },
  { image: IMAGES.avatarpng2, title: "Karen Hope." },
  { image: IMAGES.avatarpng3, title: "Tony Soap" },
];

const tabledata = [
  {
    image: IMAGES.food3,
    title: "Beef Steak with Fried Potato",
    subtitle: "Snack",
    rating: "5.0",
    sales: "1,400",
    intrest: "17%",
  },
  {
    image: IMAGES.food5,
    title: "Pancake with Honey",
    subtitle: "Snack",
    rating: "4.8",
    sales: "1,456",
    intrest: "15%",
  },
];

const EditCourse = () => {
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    thumbnail: "",
  });

  const { state } = useLocation();

  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [resource, setResource] = useState(null);
  const [ppt, setPpt] = useState(null);

  function handleThumbnailSubmitHandler() {
    let form = new FormData();
    form.append("course_id", state.id);
    form.append("thumbnail", thumbnail);
    makeRequest("POST", "/course/update-course-thumbnail", form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleVideoSubmitHandler() {
    let form = new FormData();
    form.append("course_id", state.id);
    form.append("video", video);
    makeRequest("POST", "/course/update-course-video", form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handlePptSubmitHandler() {
    let form = new FormData();
    form.append("course_id", state.id);
    form.append("ppt", ppt);
    makeRequest("POST", "/course/update-course-ppt", form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleResourceSubmitHandler() {
    let form = new FormData();
    form.append("course_id", state.id);
    let res = []
    for (let i = 0; i < resource?.length; i++) {
      form.append("resource", resource[i]);
    }

    makeRequest("POST", "/course/update-course-resource", form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateCourseData() {
    let form = new FormData();
    form.append("course_id", state.id);
    form.append("name", courseInfo.name);
    form.append("description", courseInfo.description);
    form.append("category", courseInfo.category);
    form.append("price", courseInfo.price);
    form.append("thumbnail", courseInfo.thumbnail);


    makeRequest("POST", "/course/update-course-resource", form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    makeRequest("GET", `/course/get-single-course/${state.id}`)
      .then((res) => {
        console.log(res);
        let course = res.data.response[0];
        setCourseInfo({ ...course });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const makeRequest = fetchData();

  function handleChange(e) {
    setCourseInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <div className="row">
      <div className="col-xl-11">
        <div
          className="card"
          style={{
            padding: "3rem 1rem",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            background: "#f5f5f7",
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
                      Course Name:
                    </h4>
                    <div className=" mb-3 ">
                      <input
                        type="text"
                        name="name"
                        value={courseInfo.name}
                        onChange={handleChange}
                        className="form-control input-default "
                        placeholder="course name"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Course Price:
                    </h4>
                    <div className=" mb-3 ">
                      <input
                        name="price"
                        value={courseInfo.price}
                        onChange={handleChange}
                        type="number"
                        className="form-control input-default "
                        placeholder="course price"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Course Category:
                    </h4>
                    <div className="form-group mb-3">
                      <select
                        onChange={handleChange}
                        name="category"
                        className="form-control form-control"
                      >
                        <option>{courseInfo.category}</option>
                        <option value="Care Course">Care Course</option>
                        <option value="Mandatory Care Course">
                          Mandatory Care Course
                        </option>
                        <option value="Specialized Care Course">
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
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Course Introduction:
                  </h4>
                  <div className="form-group ">
                    <textarea
                      value={courseInfo.description}
                      onChange={handleChange}
                      name="description"
                      className="form-control"
                      rows="4"
                      id="comment"
                      placeholder="Content"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="m-2 p-2 ">
                  <Button
                    className=""
                    variant="primary"
                    type="button"
                    onClick={updateCourseData}
                  >
                    Submit
                  </Button>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div style={{}}>
                    <div className="card-body">
                      <h4 className="" style={{ textAlign: "center" }}>
                        Upload Course Image:
                      </h4>
                      <div className="" style={{ position: "relative" }}>
                        <label
                          htmlFor="formFile"
                          className="form-label"
                        ></label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          onChange={(e) => setThumbnail(e.target.files[0])}
                        />
                        <img
                          style={{ width: "6rem", position: "absolute" }}
                          src={
                            thumbnail
                              ? URL.createObjectURL(thumbnail)
                              : courseInfo.thumbnail
                          }
                        />
                        {thumbnail && (
                          <a
                            onClick={handleThumbnailSubmitHandler}
                            style={{
                              position: "absolute",
                              right: "0",
                              top: "4.6rem",
                            }}
                            className="btn btn-primary"
                          >
                            upload
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card-body" style={{ position: "relative" }}>
                      <h4 className="" style={{ textAlign: "center" }}>
                        Upload Course Video:
                      </h4>
                      <div className="">
                        <label
                          htmlFor="formFile"
                          className="form-label"
                        ></label>
                        <input
                          className="form-control"
                          type="file"
                          onChange={(e) => setVideo(e.target.files[0])}
                          id="formFile"
                        />
                        {video && (
                          <a
                            onClick={handleVideoSubmitHandler}
                            style={{
                              right: "2rem",
                              top: "9rem",
                              position: "absolute",
                            }}
                            className="btn btn-primary"
                          >
                            upload
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card-body" style={{ position: "relative" }}>
                      <h4 className="" style={{ textAlign: "center" }}>
                        Upload Course ppt:
                      </h4>
                      <div className="">
                        <label
                          htmlFor="formFile"
                          className="form-label"
                        ></label>
                        <input
                          className="form-control"
                          onChange={(e) => setPpt(e.target.files[0])}
                          type="file"
                          id="formFile"
                        />
                        {ppt && (
                          <a
                            onClick={handlePptSubmitHandler}
                            style={{
                              right: "2rem",
                              top: "9rem",
                              position: "absolute",
                            }}
                            className="btn btn-primary"
                          >
                            upload
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card-body" style={{ position: "relative" }}>
                      <h4 className="" style={{ textAlign: "center" }}>
                        Upload Course Resource:
                      </h4>
                      <div className="">
                        <label
                          htmlFor="formFileMultiple"
                          className="form-label"
                        ></label>
                        <input
                          onChange={(e) => setResource(e.target.files)}
                          className="form-control"
                          type="file"
                          id="formFileMultiple"
                          multiple
                        />
                        {resource && (
                          <a
                            onClick={handleResourceSubmitHandler}
                            style={{
                              right: "2rem",
                              top: "9rem",
                              position: "absolute",
                            }}
                            className="btn btn-primary"
                          >
                            upload
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
