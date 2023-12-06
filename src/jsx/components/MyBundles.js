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

const MyBundle = () => {
  const makeRequest = fetchData();
  const navigate = useNavigate();

  const [openModalForWorkExp, setOpenModalForWorkExp] = useState(false);


  const [bundles, setBundles] = useState([]);
  const [bundleId, setBundleId] = useState();
  const [bundleName, setBundleName] = useState("");
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
  function assignBundle(userId,count) {
    console.log(bundleId,userId,count);
    let form = new FormData();
    form.append("type", "bundle");
    form.append("count", count);
    form.append("user_id", userId);
    form.append("bundle_id", bundleId);

    makeRequest("POST", "/info/assign-bundle", form)
      .then((res) => {
        swal("Assigned!", "Bundle assigned", "success");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
     
     <BundleModal  name={bundleName} setOpenModalForWorkExp={setOpenModalForWorkExp} openModalForWorkExp={openModalForWorkExp} assignBundle={assignBundle} />

      <div className="card">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>View & Assign Bundles</Card.Title>
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
                          <a href={`https://test.learnforcare.co.uk/bundle/bundle-all`}>
                            <Button
                              className="me-2"
                              variant="success btn-icon-xxs"
                            >
                              <FaEye />
                            </Button>
                          </a>
                          <Button
                            className="me-2"
                            variant="info btn-icon-xxs"
                            onClick={() => {
                              setBundleId(item.id)
                              setBundleName(item.name)
                              setOpenModalForWorkExp(true)
                            }}
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
