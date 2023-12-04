import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Tab, Dropdown } from "react-bootstrap";
import { IMAGES, SVGICON } from "./Dashboard/Content";
import { FaEye } from "react-icons/fa";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaDeleteLeft } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";

import PageTitle from "../layouts/PageTitle";
import { Row, Col, Card, Table, Badge, ProgressBar } from "react-bootstrap";
import fetchData from "../../axios";

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

const ViewInvoice = () => {
  const makeRequest = fetchData();
  const [invoice, setInvoice] = useState([]);
  useEffect(() => {
    makeRequest("GET", "/invoice/get-all-invoice")
      .then((res) => {
        console.log(res);
        setInvoice(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="card">
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>All Invoices</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr style={{ background: "#212a50" }}>
                  <th className="width80">
                    <strong>ID</strong>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <strong>Code</strong>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <strong>Time</strong>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <strong>Date</strong>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    {" "}
                    <strong>Action</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice &&
                  invoice.map((item, id) => (
                    <tr>
                      <td>
                        <strong>{id}</strong>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {id}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {new Date(item.date).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </td>
                      <td style={{ textAlign: "center" }}>{new Date(item.date).toLocaleDateString()}</td>
                      <td style={{ textAlign: "center" }}>
                      <a target="_blank" href={item.img}>  
                      <Button className="me-2" variant="success btn-icon-xxs">
                          <FaEye />
                        </Button></a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default ViewInvoice;
