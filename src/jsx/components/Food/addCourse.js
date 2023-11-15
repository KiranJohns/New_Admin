import React, { useState } from "react";

import { IMAGES, SVGICON } from "../Dashboard/Content";
import circle from "./../../../images/circle.svg";
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import quotes from "./../../../images/quotes.svg";
import fetchData from "../../../axios";
import swal from "sweetalert";

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

const AddCourse = () => {
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
  const makeRequest = fetchData();
  function handleChange(e) {
    setCourse((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function submit() {
    console.log(course);
    makeRequest("POST", "/course/create-course", {
      ...course,
      price: Number(course.price),
    })
      .then((res) => {
        swal("Success", "course created", "success");
      })
      .catch((err) => {
        console.log(err.data);
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
              <div style={{ display: "flex", justifyContent: "center" }}>
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

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Course Price:
                  </h4>
                  <div className=" mb-3 ">
                    <input
                      name="price"
                      value={course.price}
                      onChange={handleChange}
                      type="number"
                      className="form-control input-default "
                      placeholder="course price"
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Course Category:
                  </h4>
                  <div className="form-group mb-3">
                    <select
                      onChange={handleChange}
                      defaultValue={"option"}
                      name="category"
                      className="form-control form-control-lg"
                    >
                      <option>Select</option>
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

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Upload Course Image:
                  </h4>
                  <div className="">
                    <label htmlFor="formFile" className="form-label"></label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={(e) =>
                        setCourse({ ...course, thumbnail: e.target.files[0] })
                      }
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Upload Course Video:
                  </h4>
                  <div className="">
                    <label htmlFor="formFile" className="form-label"></label>
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) =>
                        setCourse({ ...course, video: e.target.files[0] })
                      }
                      id="formFile"
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Upload Course ppt:
                  </h4>
                  <div className="">
                    <label htmlFor="formFile" className="form-label"></label>
                    <input
                      className="form-control"
                      onChange={(e) =>
                        setCourse({ ...course, ppt: e.target.files[0] })
                      }
                      type="file"
                      id="formFile"
                    />
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
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="m-2 p-2 ">
                  <Button
                    className=""
                    variant="primary"
                    type="button"
                    onClick={submit}
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

export default AddCourse;
