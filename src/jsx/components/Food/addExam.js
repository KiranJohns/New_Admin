import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Dropdown, Tab, Table } from "react-bootstrap";
import { IMAGES, SVGICON } from "../Dashboard/Content";
import circle from "./../../../images/circle.svg";
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import quotes from "./../../../images/quotes.svg";
import { Editor } from "@tinymce/tinymce-react";
import { BiSolidEdit } from "react-icons/bi";
import { RiChatDeleteFill } from "react-icons/ri";
import swal from "sweetalert";
import fetchData from "../../../axios";

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

const AddExam = () => {
  const [text, setText] = useState("");
  const [value, setValue] = useState("<p>TinyMCE editor text</p>");
  const [exam, setExam] = useState([]);
  const [course, setCourse] = useState([]);
  const [courseId, setCourseId] = useState();
  const [filteredCourse, setFilteredCourse] = useState([]);
  const makeRequest = fetchData();
  const [answer, setAnswer] = useState();
  const [data, setData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  function handleOnchange(e) {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleEdit(id) {}
  function handleDelete(id) {}

  function add() {
    let options = [
      data.option1,
      data.option2,
      data.option3,
      data.option4,
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
      answer: "",
    });
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
    makeRequest("POST", "/exam/create-exam", {
      course_id: courseId,
      questions: exam,
    })
      .then((res) => {
        setCourse(res.data);
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
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Course Category:
                  </h4>
                  <div className="form-group mb-3">
                    <select
                      onChange={(e) => {
                        setFilteredCourse(() => {
                          return course.filter((item) => {
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
                      <option value="Mandatory Care Courses">
                        Mandatory Care Course
                      </option>
                      <option value="Specialised Care Courses">
                        Specialised Care Course
                      </option>
                      <option value="Recovery Care Courses">
                        Recovery Care Course
                      </option>
                      <option value="Child Care Courses">
                        Child Care Courses
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card-body">
                  <h4 className="" style={{ textAlign: "center" }}>
                    Course Name:
                  </h4>
                  <div className="form-group mb-3">
                    <select
                      onChange={(e) => setCourseId(e.target.value)}
                      defaultValue={"option"}
                      className="form-control form-control-lg"
                    >
                      <option>Select</option>
                      {course &&
                        filteredCourse.map((item) => (
                          <option key={item.name} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th className="width80">
                        <strong>ID</strong>
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
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {exam &&
                      exam.map((item, id) => (
                        <tr key={id}>
                          <td>
                            <strong>01</strong>
                          </td>
                          <td>{item.question.slice(0, 30)}</td>
                          <td>{item.options.length}</td>
                          <td>{item.answer}</td>
                          <td>
                            <Button
                              className="me-2"
                              variant="primary btn-icon-xxs"
                              onClick={() => handleEdit(item.id)}
                            >
                              <BiSolidEdit />
                            </Button>
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

                  <div className="p-3">
                    <h4 className="" style={{ textAlign: "center" }}>
                      option 1
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        style={{ marginRight: "1.5rem" }}
                        type="checkbox"
                        className="form-check-input"
                        onChange={() => setAnswer("option1")}
                        id="customCheckBox8"
                      />
                      <input
                        value={data.option1}
                        onChange={handleOnchange}
                        name="option1"
                        style={{ width: "80%" }}
                        className="form-control"
                        type="text"
                        placeholder="option 1"
                      />
                    </div>
                  </div>

                  <div className="p-3">
                    <h4 className="" style={{ textAlign: "center" }}>
                      option 2
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        style={{ marginRight: "1.5rem" }}
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckBox8"
                        onChange={() => setAnswer("option2")}
                      />
                      <input
                        value={data.option2}
                        onChange={handleOnchange}
                        name="option2"
                        style={{ width: "80%" }}
                        className="form-control"
                        type="text"
                        placeholder="option 2"
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="" style={{ textAlign: "center" }}>
                      option 3
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        style={{ marginRight: "1.5rem" }}
                        type="checkbox"
                        onChange={() => setAnswer("option3")}
                        className="form-check-input"
                        id="customCheckBox8"
                      />
                      <input
                        value={data.option3}
                        onChange={handleOnchange}
                        name="option3"
                        style={{ width: "80%" }}
                        className="form-control"
                        type="text"
                        placeholder="option 3"
                      />
                    </div>
                  </div>

                  <div className="p-3">
                    <h4 className="" style={{ textAlign: "center" }}>
                      option 4
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        style={{ marginRight: "1.5rem" }}
                        type="checkbox"
                        className="form-check-input"
                        id="customCheckBox8"
                        onChange={() => setAnswer("option4")}
                      />
                      <input
                        value={data.option4}
                        onChange={handleOnchange}
                        name="option4"
                        style={{ width: "80%" }}
                        className="form-control"
                        type="text"
                        placeholder="option 4"
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div className="m-2 p-2 ">
                      <Button className="" variant="primary" onClick={add}>
                        Add question
                      </Button>
                    </div>
                  </div>
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
