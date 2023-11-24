import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiChatDeleteFill } from "react-icons/ri";
import { Nav, Tab, Dropdown } from "react-bootstrap";
import { IMAGES, SVGICON } from "./Dashboard/Content";
import { FaEye } from "react-icons/fa";
import {  ButtonGroup } from "react-bootstrap";
import { BiSolidEdit } from "react-icons/bi";
import PageTitle from "../layouts/PageTitle";
import { Row, Col, Card, Table, Badge, ProgressBar } from "react-bootstrap";
import fetchData from "../../axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import swal from "sweetalert";
import { useEffect } from "react";
import { MdAssignmentAdd } from "react-icons/md";

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
  const makeRequest = fetchData()
  const navigate = useNavigate()

  const [selectUserForAssignCourse, setSelectUserForAssignCourse] =
  useState("individual");

  const [records, setRecords] = useState([]);
  const [allManagers, setAllManagers] = useState([]);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBundleCount, setSelectedBundleCount] = useState(0);
  const [assignData, setAssignData] = useState({
    course_id: null, // purchased course id (purchased course table id)
    userId: null,
    count: null,
  });

  const [filteredCompanyIndividuals, setFilteredCompanyIndividuals] = useState(
    []
  );
   
  const [companyIndividuals, setCompanyIndividuals] = useState([]);
  const [openModalForWorkExp, setOpenModalForWorkExp] = useState(false);


   function getData() {
    makeRequest("GET", "/info/get-purchased-bundles")
      .then((res) => {
        setRecords(res.data.response.filter((item) => item.course_count >= 1));
      })
      .catch((err) => {
        console.log(err);
      });

    makeRequest("GET", "/info/get-all-manager-individual")
      .then((res) => {
        setFilteredCompanyIndividuals(res.data.response);
        setCompanyIndividuals(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });

    makeRequest("GET", "/info/get-all-managers")
      .then((res) => {
        setAllManagers(res.data.response);
        setFilteredManagers(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  

  
  function assignCourseToManager(id) {
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", assignData.count);

    makeRequest("POST", "/info/assign-course-to-manager", form)
      .then((res) => {
        getData();
        console.log(res);
        // toast("course assigned");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function assignCourseToManagerIndividual(id) {
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", 1);

    console.log(assignData);
    makeRequest("POST", "/info/assign-course-to-manager-individual", form)
      .then((res) => {
        getData();
        console.log(res);
        // toast("course assigned");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);
  

  const [bundles, setBundles] = useState([])
  useEffect(() => {
    makeRequest("GET","/bundle/get-all-course-bundles").then(res => {
      setBundles(res.data.response)
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },[])


  function handleDelete(id) {
    makeRequest("DELETE",`/bundle/delete-bundle/${id}`).then(res => {
      swal("Deleted!", "Your bundle has been deleted.", "success");
      setBundles(bundles.filter(item => item.id != id))
    }).catch(err => {
      console.log(err);
    })
  }
  
  return (
      <div>
    <Modal
    styles={{ padding: "2rem" }}
               onHide={() => setOpenModalForWorkExp(false)}
               show={openModalForWorkExp}
             >
<div style={{ maxHeight: "100rem" }}>
         <div className="modal-header d-flex mb-5">
           <strong
             className={`btn ${
               selectUserForAssignCourse == "individual"
                 ? "btn-success"
                 : ""
             }`}
             onClick={() => {
               setSelectUserForAssignCourse("individual");
               setAssignData((prev) => {
                 return {
                   ...prev,
                   count: 1,
                 };
               });
             }}
           >
             Individual
           </strong>
           <strong
             className={`btn ${
               selectUserForAssignCourse == "manager"
                 ? "btn-success"
                 : ""
             }`}
             onClick={() => {
               setAssignData((prev) => {
                 return {
                   ...prev,
                   count: 1,
                 };
               });
               setSelectUserForAssignCourse("manager");
             }}
           >
             Manager
           </strong>
         </div>
         {selectUserForAssignCourse === "individual" ? (
           <div>
             <div className="form-control d-flex gap-3">
               <div className="form-group">
                 <label for="exampleInputEmail1">Course Count</label>
                 <input
                   disabled
                   type="number"
                   className="form-control"
                   id="exampleInputEmail1"
                   aria-describedby="emailHelp"
                   placeholder="1"
                 />
               </div>
               <div className="form-group">
                 <label for="exampleInputEmail1">user name</label>
                 <input
                   onChange={(e) =>
                     setFilteredCompanyIndividuals(
                       companyIndividuals.filter((item) =>
                         item.first_name
                           .toLocaleLowerCase()
                           .startsWith(
                             e.target.value.toLocaleLowerCase()
                           )
                       )
                     )
                   }
                   type="text"
                   className="form-control"
                   id="exampleInputEmail1"
                   aria-describedby="emailHelp"
                   placeholder="enter course name"
                 />
               </div>
             </div>
             <div className="list-group bg-white">
               <ul class="list-group">
                 {filteredCompanyIndividuals &&
                   filteredCompanyIndividuals.map((item) => {
                     return (
                       <li class="list-group-item bg-white text-black d-flex justify-content-between">
                         <span style={{ width: "fit-content" }}>
                           {item.first_name + " " + item.last_name}
                         </span>
                         <span>{item.email}</span>
                         <span
                           onClick={() =>
                             assignCourseToManagerIndividual(item.id)
                           }
                           style={{ width: "fit-content" }}
                           className="btn btn-success"
                         >
                           Assign
                         </span>
                       </li>
                     );
                   })}
               </ul>
             </div>
           </div>
         ) : (
           <div>
             <div className="form-control d-flex gap-3">
               <div className="form-group">
                 <label for="exampleInputEmail1">Course Count</label>
                 <input
                   onChange={(e) => {
                     if (Number(e.target.value) <= selectedBundleCount) {
                       setAssignData((prev) => {
                         return {
                           ...prev,
                           count: e.target.value,
                         };
                       });
                     }
                   }}
                   type="number"
                   value={assignData.count}
                   className="form-control"
                   id="exampleInputEmail1"
                   aria-describedby="emailHelp"
                   placeholder="0"
                 />
               </div>
               <div className="form-group">
                 <label for="exampleInputEmail1">manager name</label>
                 <input
                   onChange={(e) =>
                     setFilteredManagers(
                       allManagers.filter((item) =>
                         item.first_name
                           .toLocaleLowerCase()
                           .startsWith(
                             e.target.value.toLocaleLowerCase()
                           )
                       )
                     )
                   }
                   type="text"
                   className="form-control"
                   id="exampleInputEmail1"
                   aria-describedby="emailHelp"
                   placeholder="enter user name"
                 />
               </div>
             </div>
             <div className="list-group bg-white">
               <ul class="list-group">
                 {filteredManagers &&
                   filteredManagers.map((item) => {
                     return (
                       <li class="list-group-item bg-white text-black d-flex justify-content-between">
                         <span style={{ width: "fit-content" }}>
                           {item.first_name + " " + item.last_name}
                         </span>
                         <span>{item.email}</span>
                         <span
                           style={{ width: "fit-content" }}
                           className="btn btn-success"
                           onClick={() => assignCourseToManager(item.id)}
                         >
                           Assign
                         </span>
                       </li>
                     );
                   })}
               </ul>
             </div>
           </div>
         )}
       </div>
             </Modal>

    <div className="card">

      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>All Bundles</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr style={{ textAlign: "center", background:'#212A50' }}>
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
                {bundles && bundles.map((item,id) => <tr style={{ textAlign: "center" }}>
                  <td>
                    <strong>{++id}</strong>
                  </td>
                  <td>{item.name}</td>
                  <td>{JSON.parse(item.courses).split(",").length}</td>
                  <td>{item.description.slice(0,30)}</td>
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
                    <Button className="me-2" variant="primary btn-icon-xxs"  onClick={() => setOpenModalForWorkExp(true)}>
                    <MdAssignmentAdd />
                    </Button>
                    <Button className="me-2" variant="danger btn-icon-xxs">
                      <RiChatDeleteFill onClick={() => handleDelete(item.id)} />
                    </Button>
                  </td>
                </tr>)}
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