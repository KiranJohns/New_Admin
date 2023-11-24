import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiChatDeleteFill } from "react-icons/ri";
import { Nav, Tab, Dropdown } from "react-bootstrap";
import { IMAGES, SVGICON } from "./Dashboard/Content";
import { FaEye } from "react-icons/fa";
import { ButtonGroup } from "react-bootstrap";
import { BiSolidEdit } from "react-icons/bi";
import PageTitle from "../layouts/PageTitle";
import { Row, Col, Card, Table, Badge, ProgressBar } from "react-bootstrap";
import fetchData from "../../axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import swal from "sweetalert";
import { useEffect } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import BundleModal from "./Food/BundleModal";

// const svg1 = (
//   <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
//     <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
//       <rect x="0" y="0" width="24" height="24"></rect>
//       <circle fill="#000000" cx="5" cy="12" r="2"></circle>
//       <circle fill="#000000" cx="12" cy="12" r="2"></circle>
//       <circle fill="#000000" cx="19" cy="12" r="2"></circle>
//     </g>
//   </svg>
// );

const MyBundle = () => {
  const makeRequest = fetchData();
  const navigate = useNavigate();

  const [openModalForWorkExp, setOpenModalForWorkExp] = useState(false);


  const [bundles, setBundles] = useState([]);
  useEffect(() => {
    makeRequest("GET", "/bundle/get-all-course-bundles")
      .then((res) => {
        setBundles(res.data.response);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDelete(id) {
    makeRequest("DELETE", `/bundle/delete-bundle/${id}`)
      .then((res) => {
        swal("Deleted!", "Your bundle has been deleted.", "success");
        setBundles(bundles.filter((item) => item.id != id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
     
     <BundleModal  setOpenModalForWorkExp={setOpenModalForWorkExp} openModalForWorkExp={openModalForWorkExp} />

      <div className="card">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>All Bundles</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr style={{ textAlign: "center", background: "#212A50" }}>
                    <th className="width80">
                      <strong>ID</strong>
                    </th>
                    <th>
                      <strong>Bundle Name</strong>
                    </th>
                    <th>
                      <strong>Number of Courses</strong>
                    </th>
                    <th>
                      <strong>Description</strong>
                    </th>
                    <th>
                      <strong>Price</strong>
                    </th>
                    <th>
                      <strong>Status</strong>
                    </th>
                    <th>
                      <strong>Action</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bundles &&
                    bundles.map((item, id) => (
                      <tr style={{ textAlign: "center" }}>
                        <td>
                          <strong>{++id}</strong>
                        </td>
                        <td>{item.name}</td>
                        <td>{JSON.parse(item.courses).split(",").length}</td>
                        <td>{item.description.slice(0, 30)}</td>
                        <td>{item.price}</td>
                        <td>
                          <Badge bg="" className="light badge-success">
                            Active
                          </Badge>
                        </td>
                        <td>
                          {/* <Button className="me-2" variant="success btn-icon-xxs">
                      <FaEye />
                    </Button> */}
                          <Button
                            className="me-2"
                            variant="primary btn-icon-xxs"
                            onClick={() => setOpenModalForWorkExp(true)}
                          >
                            <MdAssignmentAdd />
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
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default MyBundle;
