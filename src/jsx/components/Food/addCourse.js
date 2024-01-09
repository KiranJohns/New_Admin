import React, { useState } from "react";

import { IMAGES, SVGICON } from "../Dashboard/Content";
import circle from "./../../../images/circle.svg";
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import quotes from "./../../../images/quotes.svg";
import fetchData from "../../../axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const cardBlog = [
  { image: IMAGES.avatarpng1, title: "Samantha W." },
  { image: IMAGES.avatarpng2, title: "Karen Hope." },
  { image: IMAGES.avatarpng3, title: "Tony Soap" },
];

const AddCourse = () => {
  const makeRequest = fetchData();
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
    assessment: "",
    certificate: "",
    objective_define: "",
    What_you_will_learn: "",
    aims: "",
    who_should_attend: "",
    objectives_point: "",
    what_you_will_learn_point: "",
    selling_price: "",
    RRP: "",
    course_type: "",
    duration: "",
    course_level: "",
    certificate_line: "",
    course_code: "",
  });
  const navigate = useNavigate();
  const [courseInfo, setCourseInfo] = useState({
    aims: "",
    who_should_attend: "",
    objectives_point: "",
    what_you_will_learn_point: "",
  });
  const [aims, setAims] = useState([]);
  const [who_should_attend, setWhoShouldSttend] = useState([]);
  const [objectives_point, setObjectivesPoint] = useState([]);
  const [what_you_will_learn, setWhatYouWillLearn] = useState([]);
  const [loading, setLoading] = useState(false);

  function handlePointsChange(e) {
    setCourseInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleChange(e) {
    setCourse((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function submit() {
    let newData = {
      ...course,
      aims: JSON.stringify(aims),
      who_should_attend: JSON.stringify(who_should_attend),
      what_you_will_learn_point: JSON.stringify(what_you_will_learn),
      objectives_point: JSON.stringify(objectives_point),
    };
    console.log(who_should_attend);
    console.log(what_you_will_learn);
    console.log(objectives_point);
    console.log(aims);
    setCourse({ ...newData });

    setLoading(true);
    makeRequest("POST", "/course/create-course", {
      ...course,
      aims: JSON.stringify(aims),
      who_should_attend: JSON.stringify(who_should_attend),
      what_you_will_learn_point: JSON.stringify(what_you_will_learn),
      objectives_point: JSON.stringify(objectives_point),
      price: parseFloat(course.price).toFixed(2),
      RRP: parseFloat(course.RRP).toFixed(2),
    })
      .then((res) => {
        setLoading(false);
        swal("Success", "Course Created", "success");
        navigate("/view-course");
      })
      .catch((err) => {
        setLoading(false);
        let message = err?.data?.errors[0]?.error || "Please check your inputs"
        swal("Oops!",`${typeof message === "string" ? message : "Please check your inputs"}`, "error");
      });
  }
  return (
    <div className="row">
      <div className="col-xl-11">
        <div
          className="card"
          style={{
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
                        value={course.name}
                        onChange={handleChange}
                        className="form-control input-default "
                        placeholder="Course Name"
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
                        defaultValue={"option"}
                        name="category"
                        className="form-control form-control"
                      >
                        <option>Select</option>
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

                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Selling Price:
                    </h4>
                    <div className="input-group mb-3 ">
                      <span
                        style={{ background: "#212A50", color: "white" }}
                        className="input-group-text"
                      >
                        £
                      </span>
                      <input
                        name="price"
                        value={course.price}
                        onChange={(e) => {
                          setCourse((prev) => {
                            console.log(e.target.name);
                            return {
                              ...prev,
                              [e.target.name]: e.target.value,
                            };
                          });
                        }}
                        type="text"
                        className="form-control input-default "
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      RRP
                    </h4>
                    <div className="input-group mb-3 ">
                      <span
                        style={{ background: "#212A50", color: "white" }}
                        className="input-group-text"
                      >
                        £
                      </span>
                      <input
                        name="RRP"
                        value={course.RRP}
                        onChange={(e) => {
                          setCourse((prev) => {
                            console.log(e.target.name);
                            return {
                              ...prev,
                              [e.target.name]: e.target.value,
                            };
                          });
                        }}
                        type="text"
                        className="form-control input-default "
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Course Type:
                    </h4>
                    <div className=" mb-3 ">
                      <select
                        onChange={handleChange}
                        defaultValue={"option"}
                        name="course_type"
                        className="form-control form-control"
                      >
                        <option>Select</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Duration:
                    </h4>
                    <div className=" mb-3 ">
                      {/* <input
                        type="text"
                        name="duration"
                        value={course.duration}
                        onChange={handleChange}
                        className="form-control input-default "
                        placeholder="Time for completion"
                      /> */}
                      <select
                        onChange={handleChange}
                        defaultValue={"option"}
                        name="duration"
                        className="form-control form-control"
                      >
                        <option>Select</option>
                        <option value="variable">Variable</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Course Level:
                    </h4>
                    <div className=" mb-3 ">
                      {/* <input
                        type="text"
                        name="course_level"
                        value={course.course_level}
                        onChange={handleChange}
                        className="form-control input-default "
                        placeholder="Advanced/Intermediate"
                      /> */}
                      <select
                        onChange={handleChange}
                        defaultValue={"option"}
                        name="course_level"
                        className="form-control form-control"
                      >
                        <option>Select</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Certificate
                    </h4>
                    <div className=" mb-3 ">
                      <select
                        onChange={handleChange}
                        defaultValue={"option"}
                        name="certificate_line"
                        className="form-control form-control"
                      >
                        <option>Select</option>
                        <option value="certificate of completion">
                          Certificate of completion
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Course Code:
                    </h4>
                    <div className=" mb-3 ">
                      <input
                        type="text"
                        name="course_code"
                        value={course.course_code}
                        onChange={handleChange}
                        className="form-control input-default "
                        placeholder="LFC01"
                      />
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
                      value={course.description}
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

              <div className="row">
                <div className="col-6">
                  <div style={{}}>
                    <div className="card-body">
                      <h4 className="" style={{ textAlign: "center" }}>
                        Aims:
                      </h4>
                      <div className="">
                        <label
                          htmlFor="formFile"
                          className="form-label"
                        ></label>
                        <textarea
                          name="aims"
                          value={courseInfo.aims}
                          onChange={handlePointsChange}
                          className="form-control"
                          rows="4"
                          id="comment"
                          placeholder="Content"
                        ></textarea>
                        <small style={{ padding: ".1rem" }}>
                          Press add button after adding each point
                        </small>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="m-2 p-2 "
                      >
                        <Button
                          className=""
                          variant="primary"
                          onClick={() => {
                            if (!courseInfo.aims) return;
                            setAims((prev) => {
                              return [...prev, courseInfo.aims];
                            });
                            setCourseInfo((prev) => {
                              return {
                                ...prev,
                                aims: "",
                              };
                            });
                          }}
                        >
                          ADD
                        </Button>
                        {aims.length > 0 && (
                          <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => {
                              setCourseInfo((prev) => {
                                return {
                                  ...prev,
                                  aims: "",
                                };
                              });
                              setAims([]);
                            }}
                          >
                            CLEAR {aims.length}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{}}>
                    <div className="card-body">
                      <h4 className="" style={{ textAlign: "center" }}>
                        Objectives(points)
                      </h4>
                      <div className="">
                        <label
                          htmlFor="formFile"
                          className="form-label"
                        ></label>
                        <textarea
                          name="objectives_point"
                          value={courseInfo.objectives_point}
                          onChange={handlePointsChange}
                          className="form-control"
                          rows="4"
                          id="comment"
                          placeholder="Content"
                        ></textarea>
                        <small style={{ padding: ".1rem" }}>
                          Press add button after adding each point
                        </small>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="m-2 p-2 "
                      >
                        <Button
                          className=""
                          variant="primary"
                          onClick={() => {
                            if (!courseInfo.objectives_point) return;
                            setObjectivesPoint((prev) => {
                              return [...prev, courseInfo.objectives_point];
                            });
                            setCourseInfo((prev) => {
                              return {
                                ...prev,
                                objectives_point: "",
                              };
                            });
                          }}
                        >
                          ADD
                        </Button>
                        {objectives_point.length > 0 && (
                          <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => {
                              setCourseInfo((prev) => {
                                return {
                                  ...prev,
                                  objectives_point: "",
                                };
                              });
                              setObjectivesPoint([]);
                            }}
                          >
                            CLEAR {objectives_point.length}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{}}>
                    <div className="card-body">
                      <h4 className="" style={{ textAlign: "center" }}>
                        Objectives(define)
                      </h4>
                      <div className="">
                        <label
                          htmlFor="formFile"
                          className="form-label"
                        ></label>
                        <textarea
                          value={course.objective_define}
                          onChange={handleChange}
                          name="objective_define"
                          className="form-control"
                          rows="4"
                          id="comment"
                          placeholder="Content"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div style={{}}>
                    <div className="card-body">
                      <h4 className="" style={{ textAlign: "center" }}>
                        Upload Course Image:
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
                            setCourse({
                              ...course,
                              thumbnail: e.target.files[0],
                            })
                          }
                        />
                        <small>Width*Height-760*460, size{"<"}100kb, format-jpg, png, jpeg, webp*(preffered)</small>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card-body">
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
                          onChange={(e) =>
                            setCourse({ ...course, video: e.target.files[0] })
                          }
                          id="formFile"
                        />
                        <small>Format-mp4, mkv, webm</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div style={{}}>
                    <div className="card-body">
                      <h4 className="" style={{ textAlign: "center" }}>
                        Who should attend?
                      </h4>
                      <div className="">
                        <label
                          htmlFor="formFile"
                          className="form-label"
                        ></label>
                        <textarea
                          value={courseInfo.who_should_attend}
                          name="who_should_attend"
                          onChange={handlePointsChange}
                          className="form-control"
                          rows="4"
                          id="comment"
                          placeholder="Content"
                        ></textarea>
                        <small style={{ padding: ".1rem" }}>
                          Press add button after adding each point
                        </small>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="m-2 p-2 "
                      >
                        <Button
                          className=""
                          variant="primary"
                          onClick={() => {
                            if (!courseInfo.who_should_attend) return;
                            setWhoShouldSttend((prev) => {
                              return [...prev, courseInfo.who_should_attend];
                            });
                            setCourseInfo((prev) => {
                              return {
                                ...prev,
                                who_should_attend: "",
                              };
                            });
                          }}
                        >
                          ADD
                        </Button>
                        {who_should_attend.length > 0 && (
                          <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => {
                              setCourseInfo((prev) => {
                                return {
                                  ...prev,
                                  who_should_attend: "",
                                };
                              });
                              setWhoShouldSttend([]);
                            }}
                          >
                            CLEAR {who_should_attend.length}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{}}>
                    <div className="card-body">
                      <h4 className="" style={{ textAlign: "center" }}>
                        What you will learn?(points)
                      </h4>
                      <div className="">
                        <label
                          htmlFor="formFile"
                          className="form-label"
                        ></label>
                        <textarea
                          value={courseInfo.what_you_will_learn}
                          name="what_you_will_learn"
                          onChange={handlePointsChange}
                          className="form-control"
                          rows="4"
                          id="comment"
                          placeholder="Content"
                        ></textarea>
                        <small style={{ padding: ".1rem" }}>
                          Press add button after adding each point
                        </small>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="m-2 p-2 "
                      >
                        <Button
                          className=""
                          variant="primary"
                          onClick={() => {
                            if (!courseInfo.what_you_will_learn) return;
                            setWhatYouWillLearn((prev) => {
                              return [...prev, courseInfo.what_you_will_learn];
                            });
                            setCourseInfo((prev) => {
                              return {
                                ...prev,
                                what_you_will_learn: "",
                              };
                            });
                          }}
                        >
                          ADD
                        </Button>
                        {what_you_will_learn.length > 0 && (
                          <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => {
                              setCourseInfo((prev) => {
                                return {
                                  ...prev,
                                  what_you_will_learn: "",
                                };
                              });
                              setWhatYouWillLearn([]);
                            }}
                          >
                            CLEAR {what_you_will_learn.length}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{}}>
                    <div className="card-body">
                      <h4 className="" style={{ textAlign: "center" }}>
                        What you will learn?(define)
                      </h4>
                      <div className="">
                        <label
                          htmlFor="formFile"
                          className="form-label"
                        ></label>
                        <textarea
                          value={course.What_you_will_learn}
                          onChange={handleChange}
                          name="What_you_will_learn"
                          className="form-control"
                          rows="4"
                          id="comment"
                          placeholder="Content"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card-body">
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
                          multiple={true}
                          onChange={(e) =>
                            setCourse({ ...course, ppt: e.target.files })
                          }
                          type="file"
                          id="formFile"
                        />
                        <small>Size{"<"}100kb, format-jpg, png, jpeg, webp*(preffered)</small>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card-body">
                      <h4 className="" style={{ textAlign: "center" }}>
                        Upload Course Resource:
                      </h4>
                      <div className="">
                        <label
                          htmlFor="formFileMultiple"
                          className="form-label"
                        ></label>
                        <input
                          onChange={(e) =>
                            setCourse({ ...course, resource: e.target.files })
                          }
                          className="form-control"
                          type="file"
                          id="formFileMultiple"
                          multiple
                        />
                          <small>Format-pdf, mp4, mkv, webm, txt, docx, jpg, jpeg, webp, png</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Assessment:
                  </h4>
                  <div className="form-group ">
                    <textarea
                      value={course.assessment}
                      onChange={handleChange}
                      name="assessment"
                      className="form-control"
                      rows="4"
                      id="comment"
                      placeholder="Content"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Certificate:
                  </h4>
                  <div className="form-group ">
                    <textarea
                      value={course.certificate}
                      onChange={handleChange}
                      name="certificate"
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
                  {!loading ? (
                    <Button
                      class="btn btn-primary"
                      type="button"
                      variant="primary"
                      onClick={submit}
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

export default AddCourse;
