import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Tab, Dropdown } from "react-bootstrap";
import { IMAGES, SVGICON } from "../Dashboard/Content";
import circle from "./../../../images/circle.svg";
import PageTitle from "../../layouts/PageTitle";
import { Row, Col, Card, Table, Badge, ProgressBar } from "react-bootstrap";
import fetchData from "../../../axios";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import { RiChatDeleteFill } from "react-icons/ri";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import PublishedBlog from "./PublishedBlog";
import BlogTrash from "./TrashBlog";
import BlogDraft from "./DraftBlog";

import Tabs from "react-bootstrap/Tabs";

const svg1 = (
  <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <rect x="0" y="0" width="24" height="24"></rect>
      <circle fill="#000000" cx="5" cy="12" r="2"></circle>
      <circle fill="#000000" cx="12" cy="12" r="2"></circle>
      <circle fill="#000000" cx="19" cy="12" r="2"></circle>
    </g>
  </svg>
);

const tabledata = [
  {
    image: IMAGES.food1,
    title: "Beef Steak with Fried Potato",
    subtitle: "Dinner",
    rating: "5.0",
    sales: "1,210",
    intrest: "20%",
  },
  {
    image: IMAGES.food2,
    title: "Pancake with Honey",
    subtitle: "Breakfast",
    rating: "4.9",
    sales: "1,110",
    intrest: "13&",
  },
  {
    image: IMAGES.food3,
    title: "Japanese Beef Ramen",
    subtitle: "Lunch",
    rating: "4.8",
    sales: "1,050",
    intrest: "18%",
  },
  {
    image: IMAGES.food4,
    title: "Mixed Salad",
    subtitle: "Lunch",
    rating: "5.0",
    sales: "1,400",
    intrest: "17%",
  },
  {
    image: IMAGES.food5,
    title: "Snack Beef Meatball with Vegetable",
    subtitle: "Snack",
    rating: "4.8",
    sales: "1,456",
    intrest: "15%",
  },
];
const tabledata2 = [
  {
    image: IMAGES.food5,
    title: "Beef Steak with Fried Potato",
    subtitle: "Breakfast",
    rating: "5.0",
    sales: "1,210",
    intrest: "20%",
  },
  {
    image: IMAGES.food2,
    title: "Pancake with Honey",
    subtitle: "Breakfast",
    rating: "4.9",
    sales: "1,110",
    intrest: "13&",
  },
  {
    image: IMAGES.food3,
    title: "Japanese Beef Ramen",
    subtitle: "Breakfast",
    rating: "4.8",
    sales: "1,050",
    intrest: "18%",
  },
];
const tabledata3 = [
  {
    image: IMAGES.food2,
    title: "Beef Steak with Fried Potato",
    subtitle: "Lunch",
    rating: "5.0",
    sales: "1,210",
    intrest: "20%",
  },
  {
    image: IMAGES.food2,
    title: "Pancake with Honey",
    subtitle: "Lunch",
    rating: "4.9",
    sales: "1,110",
    intrest: "13&",
  },
  {
    image: IMAGES.food3,
    title: "Japanese Beef Ramen",
    subtitle: "Lunch",
    rating: "4.8",
    sales: "1,050",
    intrest: "18%",
  },
  {
    image: IMAGES.food4,
    title: "Mixed Salad",
    subtitle: "Lunch",
    rating: "5.0",
    sales: "1,400",
    intrest: "17%",
  },
];
const tabledata4 = [
  {
    image: IMAGES.food3,
    title: "Mixed Salad",
    subtitle: "Snack",
    rating: "5.0",
    sales: "1,400",
    intrest: "17%",
  },
  {
    image: IMAGES.food5,
    title: "Snack Beef Meatball with Vegetable",
    subtitle: "Snack",
    rating: "4.8",
    sales: "1,456",
    intrest: "15%",
  },
];

const Food = () => {
  const makeRequest = fetchData();
  const navigate = useNavigate();
  const [publishedBlog, setPublishedBlog] = useState([]);
  const [trashedBlogs, setTrashedBlog] = useState([]);
  const [draftedBlogs, setDraftedBlog] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const [blogs, setBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  useEffect(() => {
    getBlogs();
  }, []);

  function getBlogs() {
    console.log("res.data.response");
    makeRequest("GET", "/blog/get-all-blog")
      .then((res) => {
        console.log("res.data.response");
        console.log(res.data.response);
        setBlogs(res.data.response.reverse());
        setAllBlogs(res.data.response.reverse());
        setPublishedBlog(
          res.data.response.filter((blog) => blog.state == "published")
        );
        setTrashedBlog(
          res.data.response.filter((blog) => blog.state == "trash")
        );
        setDraftedBlog(
          res.data.response.filter((blog) => blog.state == "draft")
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setBlogs(
      searchString
        ? allBlogs.filter((item) =>
            item.header.toLowerCase().startsWith(searchString)
          )
        : allBlogs
    );
  }, [searchString]);

  function deleteHandler(id) {
    console.log(id);
    makeRequest("DELETE", "/blog/delete-blog", {
      blog_id: id,
    })
      .then((res) => {
        getBlogs();
        // navigate("/view-blog");
        swal("Done!", "Blog Deleted", "success");
      })
      .catch((err) => {
        swal("Done!", err?.errors[0]?.error, "success");
        console.log(err);
      });
  }

  function blogStatusHandler(id, status) {
    makeRequest("POST", "/blog/update-blog-status", {
      id,
      status,
    })
      .then((res) => {
        getBlogs();
        console.log(res);
        swal("Done!", `Blog Moved to ${status.toUpperCase()}`, "success");
      })
      .catch((err) => {
        swal("Oops!", err?.errors[0]?.error, "error");
        console.log(err);
      });
  }
  return (
    <div className="card">
      <Col lg={12}>
        <Tabs
          defaultActiveKey="blogs"
          id="uncontrolled-tab-example"
          className="mb-3 mt-5"
        >
          <Tab eventKey="blogs" title={`All Blogs(${blogs.length})`}>
            <Card>
              <Card.Header>
                <Card.Title></Card.Title>
                <div className="input-group search-area mb-md-0 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here..."
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
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
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr style={{ background: "#212A50", textAlign: "center" }}>
                      <th className="width80">
                        <strong>Sl. No.</strong>
                      </th>
                      <th>
                        <strong>Heading</strong>
                      </th>
                      <th>
                        <strong>Author Name</strong>
                      </th>
                      <th>
                        <strong>Date</strong>
                      </th>
                      <th>
                        <strong>Views</strong>
                      </th>
                      <th>
                        <strong>Status</strong>
                      </th>
                      <th>
                        {" "}
                        <strong>Action</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs &&
                      blogs.map((item, idx) => {
                        return (
                          <tr style={{ textAlign: "center" }}>
                            <td>
                              <strong>{++idx}</strong>
                            </td>
                            <td>
                              {" "}
                              <a
                                target="_blank"
                                href={`https://test.learnforcare.co.uk/blog/${item.id}`}
                              >
                                {item.header.slice(0, 60)}..{" "}
                              </a>
                            </td>
                            <td>{item.author}</td>
                            <td>{item.date}</td>
                            <td>{item.views}</td>
                            <td>
                              <span className="badge badge-primary" style={{textTransform: 'capitalize'}}>
                                {item.state}
                              </span>
                            </td>
                            <td>
                              <a
                                target="_blank"
                                href={`https://test.learnforcare.co.uk/blog/${item.id}`}
                              >
                                <Button
                                  className="me-2"
                                  variant="success btn-icon-xxs"
                                  title="View"
                                >
                                  <FaEye />
                                </Button>
                              </a>
                              <Button
                                className="me-2"
                                variant="primary btn-icon-xxs"
                                title="Edit"
                                onClick={() =>
                                  navigate("/edit-blog", {
                                    state: { id: item.id },
                                  })
                                }
                              >
                                <BiSolidEdit />
                              </Button>
                              <Button
                                className="me-2"
                                variant="dark btn-icon-xxs"
                                title="Draft"
                                onClick={() =>
                                  blogStatusHandler(item.id, "draft")
                                }
                              >
                                <FaDownload />
                              </Button>
                              <Button
                                className="me-2"
                                variant="secondary btn-icon-xxs"
                                title="Trash"
                                onClick={() =>
                                  blogStatusHandler(item.id, "trash")
                                }
                              >
                                <FaTrash />
                              </Button>
                              <Button
                                className="btn btn-danger"
                                title="Delete"
                                onClick={() => deleteHandler(item.id)}
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
              </Card.Body>
            </Card>
          </Tab>

          <Tab
            eventKey="published"
            title={`Published(${publishedBlog.length})`}
          >
            <PublishedBlog publishedBlog={publishedBlog} getBlogs={getBlogs} />
          </Tab>

          <Tab eventKey="draft" title={`Draft(${draftedBlogs.length})`}>
            <BlogDraft draftedBlogs={draftedBlogs} getBlogs={getBlogs} />
          </Tab>

          <Tab eventKey="trash" title={`Trash(${trashedBlogs.length})`}>
            <BlogTrash trashedBlogs={trashedBlogs} getBlogs={getBlogs} />
          </Tab>
        </Tabs>
      </Col>
    </div>
  );
};

export default Food;

{
  /* <div style={{ display: "flex", marginLeft: "10rem" }}>
            <a
              className="blog-head"
              href="/view-blog"
              style={{
                fontSize: "1rem",
                padding: ".2rem",
                borderRadius: ".1rem",
              }}
            >
              All (1)
            </a>
            <div
              style={{
                borderLeft: ".1rem solid #5a9676",
                height: "1.3rem",
                marginTop: ".45rem",
              }}
            ></div>
            <a
              className="blog-non"
              href="/published"
              style={{ fontSize: "1rem", padding: ".3rem" }}
            >
              Published(0)
            </a>
            <div
              style={{
                borderLeft: ".1rem solid #5a9676",
                height: "1.3rem",
                marginTop: ".45rem",
              }}
            ></div>
            <a
              className="blog-non"
              href="/draft"
              style={{ fontSize: "1rem", padding: ".3rem" }}
            >
              Draft(0)
            </a>
            <div
              style={{
                borderLeft: ".1rem solid #5a9676",
                height: "1.3rem",
                marginTop: ".45rem",
              }}
            ></div>
            <a
              className="blog-non"
              href="/trash"
              style={{ fontSize: "1rem", padding: ".3rem" }}
            >
              Trash(0)
            </a>
            <div
              style={{
                borderLeft: ".1rem solid #5a9676",
                height: "1.3rem",
                marginTop: ".45rem",
              }}
            ></div>
          </div> */
}
