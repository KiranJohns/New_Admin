import React, { useState } from "react";

import { IMAGES, SVGICON } from "../Dashboard/Content";
import circle from "./../../../images/circle.svg";
import { Row, Col, Card, Button, ButtonGroup,Table } from "react-bootstrap";
import quotes from "./../../../images/quotes.svg";
import { RiChatDeleteFill } from "react-icons/ri";
import fetchData from "../../../axios";
import swal from "sweetalert";



const cardBlog = [
  { image: IMAGES.avatarpng1, title: "Samantha W." },
  { image: IMAGES.avatarpng2, title: "Karen Hope." },
  { image: IMAGES.avatarpng3, title: "Tony Soap" },
];



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
 
             <div className="row">
              <div className="col-4" style={{  }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                     Bundle Name:
                  </h4>
                  <div className=" mb-3 ">
                    <input
                      type="text"
                      name="name"
                      value={course.name}
                      onChange={handleChange}
                      className="form-control input-default "
                      placeholder="bundle name"
                    />
                  </div>
                </div>
              </div>

              <div className="col-4" style={{ }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Bundle Price:
                  </h4>
                  <div className=" mb-3 ">
                    <input
                      name="price"
                      value={course.price}
                      onChange={handleChange}
                      type="number"
                      className="form-control input-default "
                      placeholder="bundle price"
                    />
                  </div>
                </div>
              </div>

              <div className="col-4" style={{  }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Select Course Category:
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

              
            <div className="col-8 mt-4 ">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Card>
                  <Card.Body>
                    <Table responsive>
                      <thead>
                        <tr style={{background:'#212a50'}}>
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
                       
                            <tr>
                              <td style={{ textAlign: "center" }}>
                                <strong></strong>
                              </td>

                              <td style={{ textAlign: "center" }}>
                               
                              </td>
                              <td style={{ textAlign: "center" }}>
                                
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
                                  <RiChatDeleteFill />
                                </Button>
                              </td>
                            </tr>
                       
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div className="col-4" style={{  }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Add Course:
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
                      
                    </select>
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
                      value={course.description}
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
              <div  style={{ }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Upload Bundle Image:
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

export default AddBundle;
