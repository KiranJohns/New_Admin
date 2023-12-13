import React, { useState } from "react";
import { IMAGES, SVGICON } from "../Dashboard/Content";
import circle from "./../../../images/circle.svg";
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import quotes from "./../../../images/quotes.svg";
import fetchData from "../../../axios";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    aims: [],
    who_should_attend: [],
    objectives_point: [],
    what_you_will_learn_point: [],
    RRP: "",
    course_type: "",
    duration: "",
    course_level: "",
    certificate_line: "",
    course_code: "",
  });

  const [aims, setAims] = useState("");
  const [who_should_attend, setWhoShouldSttend] = useState("");
  const [objectives_point, setObjectivesPoint] = useState("");
  const [what_you_will_learn, setWhatYouWillLearn] = useState("");

  const { state } = useLocation();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPpt, setLoadingPpt] = useState(false);
  const [loadingRes, setLoadingRes] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [loadingThumb, setLoadingThumb] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [resource, setResource] = useState(null);
  const [ppt, setPpt] = useState(null);
  const navigate = useNavigate;

  const makeRequest = fetchData();

  function handleThumbnailSubmitHandler() {
    let form = new FormData();
    form.append("course_id", state.id);
    form.append("thumbnail", thumbnail);
    setThumbnail(true);
    makeRequest("POST", "/course/update-course-thumbnail", form)
      .then((res) => {
        setThumbnail(false);
        console.log(res);
      })
      .catch((err) => {
        setThumbnail(false);
        console.log(err);
      });
  }

  function handleCourseInfoSubmit() {
    let form = new FormData();
    let updatedCourse = {
      ...course,
      aims: JSON.stringify(aims.split("#")),
      who_should_attend: JSON.stringify(who_should_attend.split("#")),
      objectives_point: JSON.stringify(objectives_point.split("#")),
      what_you_will_learn_point: JSON.stringify(what_you_will_learn.split("#")),
    };

    console.log(updatedCourse);

    form.append("RRP", parseFloat(updatedCourse.RRP).toFixed(2));
    form.append("course_id", state.id);
    form.append("name", updatedCourse.name);
    form.append("description", updatedCourse.description);
    form.append("category", updatedCourse.category);
    form.append("thumbnail", updatedCourse.thumbnail);
    form.append("assessment", updatedCourse.assessment);
    form.append("certificate", updatedCourse.certificate);
    form.append("objective_define", updatedCourse.objective_define);
    form.append("What_you_will_learn", updatedCourse.What_you_will_learn);
    form.append("aims", updatedCourse.aims);
    form.append("who_should_attend", updatedCourse.who_should_attend);
    form.append("objectives_point", updatedCourse.objectives_point);
    form.append(
      "what_you_will_learn_point",
      updatedCourse.what_you_will_learn_point
    );
    form.append("price", parseFloat(updatedCourse.price).toFixed(2));
    form.append("course_type", updatedCourse.course_type);
    form.append("duration", updatedCourse.duration);
    form.append("course_level", updatedCourse.course_level);
    form.append("course_code", updatedCourse.course_code);
    form.append("certificate_line", updatedCourse.certificate_line);

    setLoading(true);
    makeRequest("POST", "/course/update-course-data", form)
      .then((res) => {
        navigate("/view-course");
        setLoading(false);
        swal("course text fields updated");
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
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
    for (let i = 0; i < ppt?.length; i++) {
      form.append("image", ppt[i]);
    }
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

    console.log(course);
    //
  }

  useEffect(() => {
    console.clear();
    makeRequest("GET", `/course/get-single-course/${state.id}`)
      .then((res) => {
        console.log(typeof res.data.response[0].aims);
        let course = res.data.response[0];
        console.log(course);

        setAims(course.aims.join("#"));
        setWhoShouldSttend(course.who_should_attend.join("#"));
        setObjectivesPoint(course.objectives_point.join("#"));
        setWhatYouWillLearn(course.what_you_will_learn_point.join("#"));

        setCourse({
          ...course,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleChange(e) {
    setCourse((prev) => {
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
                        placeholder="course name"
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
                        <option value={course.category}>
                          {course.category}
                        </option>
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
                      <input
                        type="text"
                        name="course_type"
                        value={course.course_type}
                        onChange={handleChange}
                        className="form-control input-default "
                        placeholder="Online"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Duration:
                    </h4>
                    <div className=" mb-3 ">
                      <input
                        type="text"
                        name="duration"
                        value={course.duration}
                        onChange={handleChange}
                        className="form-control input-default "
                        placeholder="Time for completion"
                      />
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
                      <input
                        type="text"
                        name="course_level"
                        value={course.course_level}
                        onChange={handleChange}
                        className="form-control input-default "
                        placeholder="Advanced/Intermediate"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-4" style={{}}>
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Certificate
                    </h4>
                    <div className=" mb-3 ">
                      <input
                        type="text"
                        name="certificate_line"
                        value={course.certificate_line}
                        onChange={handleChange}
                        className="form-control input-default "
                        placeholder="Details"
                      />
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
                          value={aims}
                          onChange={(e) => {
                            setAims(e.target.value);
                          }}
                          className="form-control"
                          rows="4"
                          id="comment"
                          placeholder="Content"
                        ></textarea>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="m-2 p-2 "
                      ></div>
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
                          value={objectives_point}
                          onChange={(e) => {
                            setObjectivesPoint(e.target.value);
                          }}
                          className="form-control"
                          rows="4"
                          id="comment"
                          placeholder="Content"
                        ></textarea>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="m-2 p-2 "
                      ></div>
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
                          value={who_should_attend}
                          name="who_should_attend"
                          onChange={(e) => {
                            setWhoShouldSttend(e.target.value);
                          }}
                          className="form-control"
                          rows="4"
                          id="comment"
                          placeholder="Content"
                        ></textarea>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="m-2 p-2 "
                      ></div>
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
                          value={what_you_will_learn}
                          name="what_you_will_learn"
                          onChange={(e) => {
                            setWhatYouWillLearn(e.target.value);
                          }}
                          className="form-control"
                          rows="4"
                          id="comment"
                          placeholder="Content"
                        ></textarea>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="m-2 p-2 "
                      ></div>
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
              <div
                classNAme="row"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {!loading ? (
                  <Button
                    class="btn btn-primary"
                    type="button"
                    variant="primary"
                    onClick={handleCourseInfoSubmit}
                  >
                    submit
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

              <div className="row">
                <div className="col-6">
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
                          onChange={(e) => setThumbnail(e.target.files[0])}
                        />
                      </div>
                      {!thumbnail || loadingThumb ? (
                        <Button
                          class="btn btn-primary"
                          type="button"
                          variant="primary"
                          onClick={handleThumbnailSubmitHandler}
                        >
                          submit
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
                          onChange={(e) => {
                            setVideo(e.target.files[0]);
                          }}
                          id="formFile"
                        />
                        {!video || loadingVideo ? (
                          <Button
                            class="btn btn-primary"
                            type="button"
                            variant="primary"
                            onClick={handleVideoSubmitHandler}
                          >
                            submit
                          </Button>
                        ) : (
                          <button
                            class="btn btn-primary"
                            type="button"
                            disabled
                          >
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
                <div className="col-6">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card-body">
                      <h4 className="" style={{ textAlign: "center" }}>
                        Upload Course ppt:
                      </h4>
                      <span>*images</span>
                      <div className="">
                        <label
                          htmlFor="formFile"
                          className="form-label"
                        ></label>
                        <input
                          className="form-control"
                          multiple={true}
                          onChange={(e) => setPpt(e.target.files)}
                          type="file"
                          id="formFile"
                        />
                        {!ppt || loadingPpt ? (
                          <Button
                            class="btn btn-primary"
                            type="button"
                            variant="primary"
                            onClick={handlePptSubmitHandler}
                          >
                            submit
                          </Button>
                        ) : (
                          <button
                            class="btn btn-primary"
                            type="button"
                            disabled
                          >
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

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card-body">
                      <h4 className="" style={{ textAlign: "center" }}>
                        Upload Course Resource:
                      </h4>
                      <span>*ppt *video *images</span>
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
                      </div>
                      {!resource || loadingRes ? (
                        <Button
                          class="btn btn-primary"
                          type="button"
                          variant="primary"
                          onClick={handleResourceSubmitHandler}
                        >
                          submit
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

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="m-2 p-2 ">
                  <Button
                    className=""
                    variant="primary"
                    type="button"
                    // onClick={submit}
                  >
                    Submit
                  </Button>
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
