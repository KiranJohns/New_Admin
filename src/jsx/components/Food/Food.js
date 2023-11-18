import React, { useState } from "react";
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
  const navigate = useNavigate()

  const [blogs, setBlogs] = useState([]);
  makeRequest("GET", "/blog/get-all-blog")
    .then((res) => {
      setBlogs(res.data.response);
    })
    .catch((err) => {
      console.log(err);
    });

  function deleteHandler(id) {
    console.log(id);
    makeRequest("DELETE", "/blog/delete-blog", {
      blog_id: id,
    })
      .then((res) => {
        console.log(res);
        setBlogs((prev) => {
          return prev.filter((item) => item.id != id);
        });
        swal("Done!", "blog deleted", "success");
      })
      .catch((err) => {
        swal("Done!", err?.errors[0]?.error, "success");
        console.log(err);
      });
  }
  return (
    <div className="card">
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>All Blogs</Card.Title>
            <div className="input-group search-area mb-md-0 mb-3">
                                    <input type="text" className="form-control" placeholder="Search here..." />
                                    <span className="input-group-text"><Link to={"#"}>
                                        <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5605 15.4395L13.7527 11.6317C14.5395 10.446 15 9.02625 15 7.5C15 3.3645 11.6355 0 7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C9.02625 15 10.446 14.5395 11.6317 13.7527L15.4395 17.5605C16.0245 18.1462 16.9755 18.1462 17.5605 17.5605C18.1462 16.9747 18.1462 16.0252 17.5605 15.4395V15.4395ZM2.25 7.5C2.25 4.605 4.605 2.25 7.5 2.25C10.395 2.25 12.75 4.605 12.75 7.5C12.75 10.395 10.395 12.75 7.5 12.75C4.605 12.75 2.25 10.395 2.25 7.5V7.5Z" fill="#01A3FF" />
                                        </svg>
                                    </Link></span>
                                </div>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr style={{background:"#212A50"}}>
                  <th className="width80">
                    <strong>ID</strong>
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
                    <strong>Tags</strong>
                  </th>
                  <th>
                    {" "}
                    <strong>Action</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {blogs &&
                  blogs.map((item) => {
                    let date = new Date(item.date)
                      .toLocaleDateString()
                      .split("/")
                      .map((d) => (d.length <= 1 ? "0" + d : d));
                    date = date[1] + "-" + date[0] + "-" + date[2];
                    return (
                      <tr>
                        <td>
                          <strong>01</strong>
                        </td>
                        <td> <a target="_blank" href={`https://test.learnforcare.co.uk/blog/${item.id}`}>{item.header} </a></td>
                        <td>{item.author}</td>
                        <td>{date}</td>
                        <td>0</td>
                        <td>
                          {item?.tags ? JSON.parse(item.tags).join(",") : ""}
                        </td>
                        <td>
                        <a target="_blank" href={`https://test.learnforcare.co.uk/blog/${item.id}`}>
                          <Button
                            className=""
                            variant="success btn-icon-xxs"
                          >
                            <FaEye />
                          </Button>
                        </a>
                          <Button
                            className=""
                            variant="primary btn-icon-xxs"
                            onClick={() => navigate("/edit-blog",{state:{id:item.id}})}
                          >
                            <BiSolidEdit />
                          </Button>
                          <Button
                            className=""
                            variant="dark btn-icon-xxs"
                          >
                            <FaDownload />
                          </Button>
                          <Button
                            className="btn btn-danger"
                            onClick={() => deleteHandler(item.id)}
                            variant="danger btn-icon-xxs"
                          >
                            <RiChatDeleteFill />
                            {/* <MdDelete
                              onClick={() => deleteHandler(item.id)}
                              title="Delete"
                            /> */}
                          </Button>

                          <Button
                          
                            className=""
                            variant="secondary btn-icon-xxs"
                          >
                          <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
      {/* <Tab.Container defaultActiveKey={'All'}>
                <div className="card-header border-0 pb-0 flex-wrap">
                    <h4 className="mb-0">Blog Menu</h4>
                    <Nav as="ul" className="nav nav-tabs food-tabs">
                        <Nav.Item as="li">
                            <Nav.Link eventKey={'All'} id="home-tab">All Means</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link eventKey={'Break'}>Breakefast</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link eventKey={'Lunch'} >Lunch</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link eventKey={'Snack'} >Snack</Nav.Link>
                        </Nav.Item>
                        
                    </Nav>
                </div>
                <div className="card-body">
                    <Tab.Content id="myTabContent">
                        <Tab.Pane eventKey={'All'}>
                            <div className="table-responsive">
                                <table className="table table-details">
                                    <tbody>
                                        {tabledata.map((item, ind)=>(
                                            <tr key={ind}>
                                                <td style={{width: '100px'}}>
                                                    <div className="food-menu">
                                                        <img className="me-3 rounded avatar avatar-xl"  src={item.image} alt="DexignZone" />
                                                        <div className="food-info">
                                                            <span className=" badge badge-sm badge-primary mb-2">{item.subtitle}</span>
                                                            <h5><Link to={"#"}>{item.title}</Link></h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="food-review">
                                                        <li><i className="fa fa-star"></i></li>
                                                        <li><h5 className="font-w700">{item.rating}</h5></li>
                                                    </ul>
                                                    
                                                </td>
                                                <td>
                                                    <ul className="d-flex">
                                                        <li>
                                                            <svg className="me-3" width="62" height="53" viewBox="0 0 62 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M8 31.7387C8 30.1102 6.20914 28.7901 4 28.7901C1.79086 28.7901 0 30.1102 0 31.7387V50.0515C0 51.6799 1.79086 53 4 53C6.20914 53 8 51.6799 8 50.0515V31.7387Z" fill="var(--primary)"/>
                                                                <path d="M26 21.2318C26 19.6242 24.2091 18.321 22 18.321C19.7909 18.321 18 19.6242 18 21.2318V50.0892C18 51.6968 19.7909 53 22 53C24.2091 53 26 51.6968 26 50.0892V21.2318Z" fill="var(--primary)"/>
                                                                <path d="M44 2.96576C44 1.32781 42.2091 0 40 0C37.7909 0 36 1.32782 36 2.96576V50.0342C36 51.6722 37.7909 53 40 53C42.2091 53 44 51.6722 44 50.0342V2.96576Z" fill="var(--primary)"/>
                                                                <path d="M62 26.5054C62 24.8762 60.2091 23.5556 58 23.5556C55.7909 23.5556 54 24.8762 54 26.5054V50.0502C54 51.6793 55.7909 53 58 53C60.2091 53 62 51.6793 62 50.0502V26.5054Z" fill="var(--primary)"/>
                                                            </svg>
                                                        </li>
                                                        <li>
                                                            <h3 className="mb-0 font-w500 fs-22">{item.sales}</h3>
                                                            <span>Total Sales</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    <ul className="d-flex align-items-center">
                                                        <li><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M39.9411 3.05888C39.9411 1.40202 38.598 0.0588751 36.9411 0.0588751H9.94113C8.28427 0.0588751 6.94113 1.40202 6.94113 3.05888C6.94113 4.71573 8.28427 6.05888 9.94113 6.05888H33.9411V30.0589C33.9411 31.7157 35.2843 33.0589 36.9411 33.0589C38.598 33.0589 39.9411 31.7157 39.9411 30.0589V3.05888ZM5.12132 39.1213L39.0624 5.1802L34.8198 0.937555L0.87868 34.8787L5.12132 39.1213Z" fill="var(--primary)"/>
                                                            </svg>
                                                        </li>
                                                        <li className="ms-3">
                                                            <h3 className="mb-0 font-w500 fs-22">{item.intrest}</h3>
                                                            <span>Interest</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    <img src={circle} alt="" />
                                                </td>
                                                <td className="text-end">
                                                    <Dropdown className="custom-dropdown">
                                                        <Dropdown.Toggle as="div" className="i-false btn sharp  btn-light">
                                                           {SVGICON.dots}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu-end" align="end">
                                                            <Dropdown.Item>Option 1</Dropdown.Item>
                                                            <Dropdown.Item>Option 2</Dropdown.Item>
                                                            <Dropdown.Item>Option 3</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table> 
                            </div>  
                        </Tab.Pane>  
                        <Tab.Pane eventKey={'Break'}>
                            <div className="table-responsive">
                                <table className="table table-details">
                                    <tbody>
                                        {tabledata2.map((item, ind)=>(
                                            <tr key={ind}>
                                                <td style={{width: '100px'}}>
                                                    <div className="food-menu">
                                                        <img className="me-3 rounded avatar avatar-xl"  src={item.image} alt="DexignZone" />
                                                        <div className="food-info">
                                                            <span className=" badge badge-sm badge-primary mb-2">{item.subtitle}</span>
                                                            <h5><Link to={"#"}>{item.title}</Link></h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="food-review">
                                                        <li><i className="fa fa-star"></i></li>
                                                        <li><h5 className="font-w700">{item.rating}</h5></li>
                                                    </ul>
                                                    
                                                </td>
                                                <td>
                                                    <ul className="d-flex">
                                                        <li>
                                                            <svg className="me-3" width="62" height="53" viewBox="0 0 62 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M8 31.7387C8 30.1102 6.20914 28.7901 4 28.7901C1.79086 28.7901 0 30.1102 0 31.7387V50.0515C0 51.6799 1.79086 53 4 53C6.20914 53 8 51.6799 8 50.0515V31.7387Z" fill="var(--primary)"/>
                                                                <path d="M26 21.2318C26 19.6242 24.2091 18.321 22 18.321C19.7909 18.321 18 19.6242 18 21.2318V50.0892C18 51.6968 19.7909 53 22 53C24.2091 53 26 51.6968 26 50.0892V21.2318Z" fill="var(--primary)"/>
                                                                <path d="M44 2.96576C44 1.32781 42.2091 0 40 0C37.7909 0 36 1.32782 36 2.96576V50.0342C36 51.6722 37.7909 53 40 53C42.2091 53 44 51.6722 44 50.0342V2.96576Z" fill="var(--primary)"/>
                                                                <path d="M62 26.5054C62 24.8762 60.2091 23.5556 58 23.5556C55.7909 23.5556 54 24.8762 54 26.5054V50.0502C54 51.6793 55.7909 53 58 53C60.2091 53 62 51.6793 62 50.0502V26.5054Z" fill="var(--primary)"/>
                                                            </svg>
                                                        </li>
                                                        <li>
                                                            <h3 className="mb-0 font-w500 fs-22">{item.sales}</h3>
                                                            <span>Total Sales</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    <ul className="d-flex align-items-center">
                                                        <li><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M39.9411 3.05888C39.9411 1.40202 38.598 0.0588751 36.9411 0.0588751H9.94113C8.28427 0.0588751 6.94113 1.40202 6.94113 3.05888C6.94113 4.71573 8.28427 6.05888 9.94113 6.05888H33.9411V30.0589C33.9411 31.7157 35.2843 33.0589 36.9411 33.0589C38.598 33.0589 39.9411 31.7157 39.9411 30.0589V3.05888ZM5.12132 39.1213L39.0624 5.1802L34.8198 0.937555L0.87868 34.8787L5.12132 39.1213Z" fill="var(--primary)"/>
                                                            </svg>
                                                        </li>
                                                        <li className="ms-3">
                                                            <h3 className="mb-0 font-w500 fs-22">{item.intrest}</h3>
                                                            <span>Interest</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    <img src={circle} alt="" />
                                                </td>
                                                <td className="text-end">
                                                    <Dropdown className="custom-dropdown">
                                                        <Dropdown.Toggle as="div" className="i-false btn sharp  btn-light">
                                                            {SVGICON.dots}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu-end" align="end">
                                                            <Dropdown.Item>Option 1</Dropdown.Item>
                                                            <Dropdown.Item>Option 2</Dropdown.Item>
                                                            <Dropdown.Item>Option 3</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table> 
                            </div>  
                        </Tab.Pane >
                        <Tab.Pane eventKey={'Lunch'}>
                            <div className="table-responsive">
                                <table className="table table-details">
                                    <tbody>
                                        {tabledata3.map((item, ind)=>(
                                            <tr key={ind}>
                                                <td style={{width: '100px'}}>
                                                    <div className="food-menu">
                                                        <img className="me-3 rounded avatar avatar-xl"  src={item.image} alt="DexignZone" />
                                                        <div className="food-info">
                                                            <span className=" badge badge-sm badge-primary mb-2">{item.subtitle}</span>
                                                            <h5><Link to={"#"}>{item.title}</Link></h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="food-review">
                                                        <li><i className="fa fa-star"></i></li>
                                                        <li><h5 className="font-w700">{item.rating}</h5></li>
                                                    </ul>
                                                    
                                                </td>
                                                <td>
                                                    <ul className="d-flex">
                                                        <li>
                                                            <svg className="me-3" width="62" height="53" viewBox="0 0 62 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M8 31.7387C8 30.1102 6.20914 28.7901 4 28.7901C1.79086 28.7901 0 30.1102 0 31.7387V50.0515C0 51.6799 1.79086 53 4 53C6.20914 53 8 51.6799 8 50.0515V31.7387Z" fill="var(--primary)"/>
                                                                <path d="M26 21.2318C26 19.6242 24.2091 18.321 22 18.321C19.7909 18.321 18 19.6242 18 21.2318V50.0892C18 51.6968 19.7909 53 22 53C24.2091 53 26 51.6968 26 50.0892V21.2318Z" fill="var(--primary)"/>
                                                                <path d="M44 2.96576C44 1.32781 42.2091 0 40 0C37.7909 0 36 1.32782 36 2.96576V50.0342C36 51.6722 37.7909 53 40 53C42.2091 53 44 51.6722 44 50.0342V2.96576Z" fill="var(--primary)"/>
                                                                <path d="M62 26.5054C62 24.8762 60.2091 23.5556 58 23.5556C55.7909 23.5556 54 24.8762 54 26.5054V50.0502C54 51.6793 55.7909 53 58 53C60.2091 53 62 51.6793 62 50.0502V26.5054Z" fill="var(--primary)"/>
                                                            </svg>
                                                        </li>
                                                        <li>
                                                            <h3 className="mb-0 font-w500 fs-22">{item.sales}</h3>
                                                            <span>Total Sales</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    <ul className="d-flex align-items-center">
                                                        <li><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M39.9411 3.05888C39.9411 1.40202 38.598 0.0588751 36.9411 0.0588751H9.94113C8.28427 0.0588751 6.94113 1.40202 6.94113 3.05888C6.94113 4.71573 8.28427 6.05888 9.94113 6.05888H33.9411V30.0589C33.9411 31.7157 35.2843 33.0589 36.9411 33.0589C38.598 33.0589 39.9411 31.7157 39.9411 30.0589V3.05888ZM5.12132 39.1213L39.0624 5.1802L34.8198 0.937555L0.87868 34.8787L5.12132 39.1213Z" fill="var(--primary)"/>
                                                            </svg>
                                                        </li>
                                                        <li className="ms-3">
                                                            <h3 className="mb-0 font-w500 fs-22">{item.intrest}</h3>
                                                            <span>Interest</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    <img src={circle} alt="" />
                                                </td>
                                                <td className="text-end">
                                                    <Dropdown className="custom-dropdown">
                                                        <Dropdown.Toggle as="div" className="i-false btn sharp  btn-light">
                                                            {SVGICON.dots}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu-end" align="end">
                                                            <Dropdown.Item>Option 1</Dropdown.Item>
                                                            <Dropdown.Item>Option 2</Dropdown.Item>
                                                            <Dropdown.Item>Option 3</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table> 
                            </div>  
                        </Tab.Pane>
                        <Tab.Pane eventKey={'Snack'}>
                            <div className="table-responsive">
                                <table className="table table-details">
                                    <tbody>
                                        {tabledata4.map((item, ind)=>(
                                            <tr key={ind}>
                                                <td style={{width: '100px'}}>
                                                    <div className="food-menu">
                                                        <img className="me-3 rounded avatar avatar-xl"  src={item.image} alt="DexignZone" />
                                                        <div className="food-info">
                                                            <span className=" badge badge-sm badge-primary mb-2">{item.subtitle}</span>
                                                            <h5><Link to={"#"}>{item.title}</Link></h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="food-review">
                                                        <li><i className="fa fa-star"></i></li>
                                                        <li><h5 className="font-w700">{item.rating}</h5></li>
                                                    </ul>
                                                    
                                                </td>
                                                <td>
                                                    <ul className="d-flex">
                                                        <li>
                                                            <svg className="me-3" width="62" height="53" viewBox="0 0 62 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M8 31.7387C8 30.1102 6.20914 28.7901 4 28.7901C1.79086 28.7901 0 30.1102 0 31.7387V50.0515C0 51.6799 1.79086 53 4 53C6.20914 53 8 51.6799 8 50.0515V31.7387Z" fill="var(--primary)"/>
                                                                <path d="M26 21.2318C26 19.6242 24.2091 18.321 22 18.321C19.7909 18.321 18 19.6242 18 21.2318V50.0892C18 51.6968 19.7909 53 22 53C24.2091 53 26 51.6968 26 50.0892V21.2318Z" fill="var(--primary)"/>
                                                                <path d="M44 2.96576C44 1.32781 42.2091 0 40 0C37.7909 0 36 1.32782 36 2.96576V50.0342C36 51.6722 37.7909 53 40 53C42.2091 53 44 51.6722 44 50.0342V2.96576Z" fill="var(--primary)"/>
                                                                <path d="M62 26.5054C62 24.8762 60.2091 23.5556 58 23.5556C55.7909 23.5556 54 24.8762 54 26.5054V50.0502C54 51.6793 55.7909 53 58 53C60.2091 53 62 51.6793 62 50.0502V26.5054Z" fill="var(--primary)"/>
                                                            </svg>
                                                        </li>
                                                        <li>
                                                            <h3 className="mb-0 font-w500 fs-22">{item.sales}</h3>
                                                            <span>Total Sales</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    <ul className="d-flex align-items-center">
                                                        <li><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M39.9411 3.05888C39.9411 1.40202 38.598 0.0588751 36.9411 0.0588751H9.94113C8.28427 0.0588751 6.94113 1.40202 6.94113 3.05888C6.94113 4.71573 8.28427 6.05888 9.94113 6.05888H33.9411V30.0589C33.9411 31.7157 35.2843 33.0589 36.9411 33.0589C38.598 33.0589 39.9411 31.7157 39.9411 30.0589V3.05888ZM5.12132 39.1213L39.0624 5.1802L34.8198 0.937555L0.87868 34.8787L5.12132 39.1213Z" fill="var(--primary)"/>
                                                            </svg>
                                                        </li>
                                                        <li className="ms-3">
                                                            <h3 className="mb-0 font-w500 fs-22">{item.intrest}</h3>
                                                            <span>Interest</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    <img src={circle} alt="" />
                                                </td>
                                                <td className="text-end">
                                                    <Dropdown className="custom-dropdown">
                                                        <Dropdown.Toggle as="div" className="i-false btn sharp  btn-light">
                                                            {SVGICON.dots}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu-end" align="end">
                                                            <Dropdown.Item>Option 1</Dropdown.Item>

                                                            <Dropdown.Item>Option 2</Dropdown.Item>
                                                            <Dropdown.Item>Option 3</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table> 
                            </div>  
                        </Tab.Pane>
                    </Tab.Content>    
                </div>    
            </Tab.Container> */}
    </div>
  );
};

export default Food;
