import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, Tab, Dropdown} from 'react-bootstrap';
import { IMAGES, SVGICON } from './Dashboard/Content';
import { FaEye } from "react-icons/fa";
import {  Button,  ButtonGroup,  } from "react-bootstrap";

import PageTitle from '../layouts/PageTitle';
import {
    Row,
    Col,
    Card,
    Table,
    Badge,
    ProgressBar,
  } from "react-bootstrap";
  
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
    { image: IMAGES.food1, title:'Beef Steak with Fried Potato', subtitle:'Dinner', rating:'5.0', sales:'1,210', intrest:'20%' },
    { image: IMAGES.food2, title:'Pancake with Honey', subtitle:'Breakfast', rating:'4.9', sales:'1,110', intrest:'13&' },
    { image: IMAGES.food3, title:'Japanese Beef Ramen', subtitle:'Lunch', rating:'4.8', sales:'1,050', intrest:'18%' },
    { image: IMAGES.food4, title:'Mixed Salad', subtitle:'Lunch', rating:'5.0', sales:'1,400', intrest:'17%' },
    { image: IMAGES.food5, title:'Snack Beef Meatball with Vegetable', subtitle:'Snack', rating:'4.8', sales:'1,456', intrest:'15%' },
];
const tabledata2 = [
    { image: IMAGES.food5, title:'Beef Steak with Fried Potato', subtitle:'Breakfast', rating:'5.0', sales:'1,210', intrest:'20%' },
    { image: IMAGES.food2, title:'Pancake with Honey', subtitle:'Breakfast', rating:'4.9', sales:'1,110', intrest:'13&' },
    { image: IMAGES.food3, title:'Japanese Beef Ramen', subtitle:'Breakfast', rating:'4.8', sales:'1,050', intrest:'18%' }
];
const tabledata3 = [
    { image: IMAGES.food2, title:'Beef Steak with Fried Potato', subtitle:'Lunch', rating:'5.0', sales:'1,210', intrest:'20%' },
    { image: IMAGES.food2, title:'Pancake with Honey', subtitle:'Lunch', rating:'4.9', sales:'1,110', intrest:'13&' },
    { image: IMAGES.food3, title:'Japanese Beef Ramen', subtitle:'Lunch', rating:'4.8', sales:'1,050', intrest:'18%' },
    { image: IMAGES.food4, title:'Mixed Salad', subtitle:'Lunch', rating:'5.0', sales:'1,400', intrest:'17%' }
];
const tabledata4 = [
    { image: IMAGES.food3, title:'Mixed Salad', subtitle:'Snack', rating:'5.0', sales:'1,400', intrest:'17%' },
    { image: IMAGES.food5, title:'Snack Beef Meatball with Vegetable', subtitle:'Snack', rating:'4.8', sales:'1,456', intrest:'15%' },
];

const ViewReports = () => {
    return (
        <div className="card">
                 <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>All Reports</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="width80">
                      <strong>ID</strong>
                    </th>
                    <th>
                      <strong>Amount</strong>
                    </th>
                    <th>
                      <strong>Date</strong>
                    </th>
                    <th>
                      <strong>Customer</strong>
                    </th>
                    <th>
                      <strong>Place</strong>
                    </th>
                    <th>
                      <strong>Customer Type</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>01</strong>
                    </td>
                    <td>Adhd Awareness</td>
                    <td>11</td>
                    <td>Image</td>
                    <td>
                        London
                      {/* <Badge bg="" className="light badge-success">Active</Badge> */}
                    </td>
                    <td>Individual</td>
                    <td>
                    <Button className="me-2" variant="success btn-icon-xxs">
                    <FaEye />
                  </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>02</strong>
                    </td>
                    <td>Understanding Autism</td>
                    <td>12</td>
                    <td>Image</td>
                    <td>
                      {/* <Badge bg="" className="light badge-success">Active</Badge> */}
                    </td>
                    <td>Company</td>
                    <td>
                      <Dropdown>
                      <Button className="me-2" variant="success btn-icon-xxs">
                    <FaEye />
                  </Button>
                      </Dropdown>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>03</strong>
                    </td>
                    <td>ADHD Awareness</td>
                    <td>13</td>
                    <td>Image</td>
                    <td>
                      
                    </td>
                    <td>Individual</td>
                    <td>
                      <Dropdown>
                      <Button className="me-2" variant="success btn-icon-xxs">
                    <FaEye />
                  </Button>
                      </Dropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
       
        
        </div>
    );
};

export default ViewReports;