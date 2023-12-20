import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Dropdown, Tab, Table } from "react-bootstrap";
import { IMAGES, SVGICON } from "../Dashboard/Content";
import circle from "./../../../images/circle.svg";
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import quotes from "./../../../images/quotes.svg";
import { Editor } from "@tinymce/tinymce-react";
import { BiSolidEdit } from "react-icons/bi";
import { RiChatDeleteFill } from "react-icons/ri";
import swal from "sweetalert";
import { FaPlus } from "react-icons/fa6";
import fetchData from "../../../axios";

const AddExam = () => {
  const [text, setText] = useState("");
  const [value, setValue] = useState("<p>TinyMCE editor text</p>");
  const [exam, setExam] = useState([]);
  const [course, setCourse] = useState([]);
  const [courseId, setCourseId] = useState();
  const [courseCode, setCourseCode] = useState(null);
  const [filteredCourse, setFilteredCourse] = useState([]);
  const makeRequest = fetchData();
  const [answer, setAnswer] = useState();
  const [optionCount, setOptionCount] = useState(0);
  let navigate = useNavigate()

  const [data, setData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
    option6: "",
  });

  function handleOnchange(e) {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleDelete(id) {
    setExam(prev => prev.filter(item => item.id != id))
  }

  function add() {
    let options = [
      data.option1,
      data.option2,
      data.option3,
      data.option4,
      data.option5,
      data.option6,
    ].filter((opt) => opt.length >= 1);
    let question = {
      question: data.question,
      options: options,
      answer: data[answer],
    };
    if (!question.question) {
      return;
    }
    if (!question.options.length >= 2) {
      swal(
        "Oops!",
        "Please provide at least two options for the question",
        "warning"
      );
      return;
    }
    if (!question.answer) {
      swal("Oops!", "please provide valid answer", "warning");
      return;
    }
    setExam((prev) => {
      return [...prev, question];
    });


    setData({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      option5: "",
      option6: "",
      answer: "",
    });

    setOptionCount(0);
  }

  useEffect(() => {
    makeRequest("GET", "/course/get-all-course")
      .then((res) => {
        setCourse(res.data.response);
        console.log(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function submit() {
    console.log(exam,courseId);
    let form = new FormData()
    form.append("course_id",courseId.slice(3,courseId.length))
    form.append("questions",JSON.stringify([...exam]))
    makeRequest("POST", "/exam/create-exam", form)
      .then((res) => {
        setCourse(res.data);
        setExam([])
        swal("Done!", "New Exam Created", "success")
        navigate('/view-exam')
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", err.data.errors[0].error, "warning");
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
                      Course Category:
                    </h4>
                    <div className="form-group mb-3">
                      <select
                        onChange={(e) => {
                          console.log(course);
                          setFilteredCourse(() => {
                            return course.filter((item) => {
                              console.log(item.category,e.target.value);
                              if (item.category == e.target.value) {
                                return item;
                              }
                            });
                          });
                        }}
                        defaultValue={"option"}
                        className="form-control form-control-lg"
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
                      Course Name:
                    </h4>
                    <div className="form-group mb-3">
                      <select
                        onChange={(e) => {
                          setCourseId("LFC"+e.target.value?.id)
                          setCourseCode(e.target.value?.course_code)
                        }}
                        defaultValue={"option"}
                        className="form-control form-control-lg"
                      >
                        <option>Select</option>
                        {course &&
                          filteredCourse.map((item) => (
                            <option key={item.name} value={item}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="card-body">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Course ID:
                    </h4>
                    <div className="form-group mb-3">
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder=""
                        value={courseId}
                        disabled
                        />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "1rem" }}>
                <div
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    paddingBottom: ".5rem",
                    borderRadius: ".7rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card-body">
                      <h4 className="" style={{ textAlign: "center" }}>
                        Question :
                      </h4>
                      <div className="">
                        <textarea
                          value={data.question}
                          onChange={handleOnchange}
                          name="question"
                          className="form-control"
                          rows="4"
                          id="comment"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="p-3">
                        <h4 className="" style={{ textAlign: "center" }}>
                          Option A
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {/* <input
                        style={{ marginRight: "1.5rem" }}
                        type="checkbox"
                        className="form-check-input"
                        onChange={() => setAnswer("option1")}
                        id="customCheckBox8"
                      /> */}
                          <input
                            value={data.option1}
                            onChange={handleOnchange}
                            name="option1"
                            style={{ width: "80%" }}
                            className="form-control"
                            type="text"
                            placeholder="Option A"
                          />
                        </div>
                      </div>

                      <div className="p-3">
                        <h4 className="" style={{ textAlign: "center" }}>
                          Option C
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {/* <input
                        style={{ marginRight: "1.5rem" }}
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckBox8"
                        onChange={() => setAnswer("option2")}
                      /> */}
                          <input
                            value={data.option3}
                            onChange={handleOnchange}
                            name="option3"
                            style={{ width: "80%" }}
                            className="form-control"
                            type="text"
                            placeholder="Option C"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-3">
                        <h4 className="" style={{ textAlign: "center" }}>
                          Option B
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <input
                            value={data.option2}
                            onChange={handleOnchange}
                            name="option2"
                            style={{ width: "80%" }}
                            className="form-control"
                            type="text"
                            placeholder="Option B"
                          />
                        </div>
                      </div>

                      <div className="p-3">
                        <h4 className="" style={{ textAlign: "center" }}>
                          Option D
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <input
                            value={data.option4}
                            onChange={handleOnchange}
                            name="option4"
                            style={{ width: "80%" }}
                            className="form-control"
                            type="text"
                            placeholder="Option D"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ display: "flex" }}>
                    {optionCount >= 1 && <div className="col-6">
                      <div className="p-3">
                        <h4 className="" style={{ textAlign: "center" }}>
                        Option E
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <input
                            value={data.option5}
                            onChange={handleOnchange}
                            name="option5"
                            style={{ width: "80%" }}
                            className="form-control"
                            type="text"
                            placeholder="Option E"
                          />
                        </div>
                      </div>
                    </div>}
                    {optionCount >= 2 &&<div className="col-6">
                      <div className="p-3">
                        <h4 className="" style={{ textAlign: "center" }}>
                          Option F
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <input
                            value={data.option6}
                            onChange={handleOnchange}
                            name="option6"
                            style={{ width: "80%" }}
                            className="form-control"
                            type="text"
                            placeholder="Option F"
                          />
                        </div>
                      </div>
                    </div>}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "1rem 0",
                    }}
                  >
                    <Button className="me-2" variant="primary btn-icon-xxs" onClick={() => setOptionCount(prev => ++prev)}>
                      Add Option
                    </Button>
                  </div>

                  <div className="p-3">
                    <h4 className="" style={{ textAlign: "center" }}>
                      Select Answer
                    </h4>
                    <div
                      style={{ display: "flex", justifyContent: "center" }}
                      className="form-group mb-3"
                    >
                      <select
                        defaultValue={"option"}
                        className="form-control"
                        style={{ width: "50%" }}
                        onChange={(e) => setAnswer(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="option1">Option A</option>
                        <option value="option2">Option B</option>
                        <option value="option3">Option C</option>
                        <option value="option4">Option D</option>
                        <option value="option5">Option E</option>
                        <option value="option6">Option F</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div className="m-2 p-2 ">
                      <Button className="" variant="primary" onClick={add}>
                        Next Question
                      </Button>
                    </div>
                  </div>

                  <Card.Body>
                    <Table responsive>
                      <thead>
                        <tr style={{background:"#212A50"}}>
                          <th className="width80">
                            <strong>No</strong>
                          </th>
                          <th>
                            <strong>Question</strong>
                          </th>
                          <th>
                            <strong>Options</strong>
                          </th>
                          <th>
                            <strong>Answer</strong>
                          </th>
                          <th>
                            <strong>Action</strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {exam &&
                          exam.map((item, id) => (
                            <tr key={id}>
                              <td>
                                <strong>{++id}</strong>
                              </td>
                              <td>{item.question.slice(0, 30)}</td>
                              <td>{item.options.length}</td>
                              <td>{String.fromCharCode(65 + item.options.indexOf(item.answer))}</td>
                              <td>
                                <Button
                                  className="me-2"
                                  variant="danger btn-icon-xxs"
                                >
                                  <RiChatDeleteFill
                                    onClick={() => handleDelete(item.id)}
                                  />
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </div>
              </div>

              {/*                         
                            <Editor apiKey="enk9sksvp1tt5f2u075ef5jfjrff9e37ahpv80zdk3734qh4" onEditorChange={(newValue, editor)=>{
                                                setValue(newValue);
                                               setText(editor.getContent({format:'text'}))
                                            }}/> */}

              {/* <div style={{ padding: '1rem' }}>
                                <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", paddingBottom: '.5rem', borderRadius: '.7rem', }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', }}>
                                        <div className='card-body'>
                                            <h4 className='' style={{ textAlign: 'center' }}>
                                                Question 10:
                                            </h4>
                                            <div className="  ">
                                                <input
                                                    type="text"
                                                    className="form-control input-default "
                                                    placeholder="question"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='p-3'>
                                        <div className='row d-flex  justify-content-center '>
                                            <div className="form-group col-2 ">
                                                <label>option a</label>
                                                <input
                                                    type="text"
                                                    className="form-control input-default "
                                                    placeholder="a"
                                                />
                                            </div>
                                            <div className="form-group col-2 ">
                                                <label>option b</label>
                                                <input
                                                    type="text"
                                                    className="form-control input-default "
                                                    placeholder="b"
                                                />
                                            </div>
                                            <div className="form-group col-2 ">
                                                <label>option c</label>
                                                <input
                                                    type="text"
                                                    className="form-control input-default "
                                                    placeholder="c"
                                                />
                                            </div>
                                            <div className="form-group col-2">
                                                <label>option d</label>
                                                <input
                                                    type="text"
                                                    className="form-control input-default "
                                                    placeholder="d"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

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

export default AddExam;
