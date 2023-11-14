import React, { Fragment, useReducer, useState } from "react";
import { Button, Dropdown, Modal, Nav } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { Link } from "react-router-dom";
import LightGallery from 'lightgallery/react';
import Highlight from "react-highlight";
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

//** Import Image */
//** Import Image */
import profile01 from "../../../../images/profile/1.jpg";
import profile02 from "../../../../images/profile/2.jpg";
import profile03 from "../../../../images/profile/3.jpg";
import profile04 from "../../../../images/profile/4.jpg";
import profile05 from "../../../../images/profile/5.jpg";
import profile06 from "../../../../images/profile/6.jpg";
import profile07 from "../../../../images/profile/7.jpg";
import profile08 from "../../../../images/profile/8.jpg";
import profile09 from "../../../../images/profile/9.jpg";
import profile from "../../../../images/profile/profile.png";
import PageTitle from "../../../layouts/PageTitle";
import { Row, Col, Card, } from "react-bootstrap";
const sidebarLink = [
  { to:'default-tab', title:'Default Tab'},
  { to:'custom-tab', title:'Custom Tab'},
  { to:'nav-pills', title:'Nav Pills Tabs'},
  { to:'nav-pills-tabs', title:'Nav Pills Tabs-2'},
  { to:'vertical-nav', title:'Vertical Nav Pill'},
  { to:'vertical-nav-pill', title:'Vertical Nav Pill-2'},
  { to:'tab-icon', title:'Tab with Icon'}
];


  const tabData = [
    {
      name: "Home",
      icon: "home",
      content:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
    },
    {
      name: "Profile",
      icon: "user",
      content:
        "Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor.      ",
    },
    {
      name: "Contact",
      icon: "phone",
      content:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
    },

    {
      name: "Message",
      icon: "envelope",
      content:
        "Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor.      ",
    },
  ];

const galleryBlog = [
	{image: profile03}, {image: profile04},
	{image: profile02}, {image: profile04},
	{image: profile03}, {image: profile02},
];
const initialState = false;
const reducer = (state, action) =>{
	switch (action.type){
		case 'sendMessage':
			return { ...state, sendMessage: !state.sendMessage }		
		case 'postModal':
			return { ...state, post: !state.post }
		case 'linkModal':
			return { ...state, link: !state.link }		
		case 'cameraModal':
			return { ...state, camera: !state.camera }		
		case 'replyModal':
			return { ...state, reply: !state.reply }
		default:
			return state	
	}	
}

const SingleProfile = () => {
	const [activeLink ,setActiveLink] = useState(0);
	const onInit = () => {
		//console.log('lightGallery has been initialized');
	};
  	const options = {
     	settings: {
			overlayColor: "#000000",
     	},
 	};
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<Fragment>
		  <PageTitle activeMenu="Profile" motherMenu="App" />	
		  <div className="row">
			<div className="col-lg-12">
			  <div className="profile card card-body px-3 pt-3 pb-0">
				<div className="profile-head">
				  <div className="photo-content ">
					<div className="cover-photo rounded"></div>
				  </div>
				  <div className="profile-info">
					<div className="profile-photo">
					  <img src={profile} className="img-fluid rounded-circle" alt="profile"/>
					</div>
					<div className="profile-details">
					  <div className="profile-name px-3 pt-2">
						<h4 className="text-primary mb-0">Mitchell C. Shay</h4>
						<p>UX / UI Designer</p>
					  </div>
					  <div className="profile-email px-2 pt-2">
						<h4 className="text-muted mb-0">hello@email.com</h4>
						<p>Email</p>
					  </div>
					
					</div>
					
				  </div>
				    <Col xl={12}>
					<Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3 mt-2"
      fill
    >
      <Tab eventKey="profile" title="Profile">
	  <Table striped bordered hover variant="light">
      <thead>
        {/* <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr> */}
      </thead>
      <tbody>
        <tr>
          
          <td style={{fontWeight:'bold'}}>Employee ID</td>
          <td  style={{fontWeight:'bold'}}>Otto</td>   
        </tr>
        <tr>
          <td style={{fontWeight:'bold'}}>Employee Name</td>
          <td  style={{fontWeight:'bold'}}>Thornton</td>
        </tr>
		<tr>
          <td style={{fontWeight:'bold'}}>Designation</td>
          <td  style={{fontWeight:'bold'}}>Thornton</td>
        </tr>
		<tr>
          <td style={{fontWeight:'bold'}}>Department</td>
          <td  style={{fontWeight:'bold'}}></td>
        </tr>
		<tr>
          <td style={{fontWeight:'bold'}}>Phone</td>
          <td  style={{fontWeight:'bold'}}>356566222421</td>
        </tr>
		<tr>
          <td style={{fontWeight:'bold'}}>Email</td>
          <td  style={{fontWeight:'bold'}}>thorton@gmail.com</td>
        </tr>
      </tbody>
    </Table>
      </Tab>

      <Tab eventKey="qualification" title="Qualification">
      
      </Tab>

      <Tab eventKey="Work" title="Work Experience">

      </Tab>

      <Tab eventKey="documents" title="Documents" >
   
      </Tab>
    </Tabs>

              </Col>
				</div>
			  </div>
			  
			</div>
		  </div>
		

		 
			 {/* Link Modal */}
			  <Modal show={state.link}  className="modal fade post-input" id="linkModal" onHide={() => dispatch({type:'linkModal'})} centered>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Social Links</h5>
						<button type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'linkModal'})}>
						</button>
					</div>
					<div className="modal-body">
						<Link className="btn-social me-1 facebook" to="/app-profile"><i className="fab fa-facebook-f" /></Link>
						<Link className="btn-social me-1 google-plus" to="/app-profile"> <i className="fab fa-google-plus" /></Link>
						<Link className="btn-social me-1 linkedin" to="/app-profile"><i className="fab fa-linkedin" /></Link>
						<Link className="btn-social me-1 instagram" to="/app-profile"> <i className="fab fa-instagram" /></Link>
						<Link className="btn-social me-1 twitter" to="/app-profile"><i className="fab fa-twitter" /></Link>
						<Link className="btn-social me-1 youtube" to="/app-profile"><i className="fab fa-youtube" /></Link>
						<Link className="btn-social whatsapp" to="/app-profile"><i className="fab fa-whatsapp" /></Link>
					</div>
				</div>
			</Modal>
			 {/* Camera Modal */}
			  <Modal show={state.camera}  className="modal fade" id="cameraModal" onHide={() => dispatch({type:'cameraModal'})} centered>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Upload images</h5>
						<button type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'cameraModal'})}>
						</button>
					</div>
					<div className="modal-body">						
						<div className="input-group custom_file_input mb-3">
							<span className="input-group-text">Upload</span>
							<div className="form-file">
								<input type="file" className="form-file-input form-control" />
							</div>
						</div>
					</div>
				</div>
			</Modal>
		
		</Fragment>
	  );
};

export default SingleProfile;