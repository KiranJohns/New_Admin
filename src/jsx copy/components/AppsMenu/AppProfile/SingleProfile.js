import React, { Fragment, useReducer } from "react";
import { Button, Dropdown, Modal, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import LightGallery from 'lightgallery/react';
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
					  <Dropdown className="dropdown ms-auto">
						<Dropdown.Toggle
						  variant="primary"
						  className="btn btn-primary light sharp i-false"
						  data-toggle="dropdown"
						  aria-expanded="true"
						>
						  <svg
							xmlns="http://www.w3.org/2000/svg"
							//    xmlns:xlink="http://www.w3.org/1999/xlink"
							width="18px"
							height="18px"
							viewBox="0 0 24 24"
							version="1.1"
						  >
							<g
							  stroke="none"
							  strokeWidth="1"
							  fill="none"
							  fillRule="evenodd"
							>
							  <rect x="0" y="0" width="24" height="24"></rect>
							  <circle fill="#000000" cx="5" cy="12" r="2"></circle>
							  <circle fill="#000000" cx="12" cy="12" r="2"></circle>
							  <circle fill="#000000" cx="19" cy="12" r="2"></circle>
							</g>
						  </svg>
						</Dropdown.Toggle>
						<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
						  <Dropdown.Item className="dropdown-item">
							<i className="fa fa-user-circle text-primary me-2" />
							View profile
						  </Dropdown.Item>
						  <Dropdown.Item className="dropdown-item">
							<i className="fa fa-users text-primary me-2" />
							Add to close friends
						  </Dropdown.Item>
						  <Dropdown.Item className="dropdown-item">
							<i className="fa fa-plus text-primary me-2" />
							Add to group
						  </Dropdown.Item>
						  <Dropdown.Item className="dropdown-item">
							<i className="fa fa-ban text-primary me-2" />
							Block
						  </Dropdown.Item>
						</Dropdown.Menu>
					  </Dropdown>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		
		  {/* send Modal */}
			  <Modal className="modal fade" show={state.sendMessage} onHide={()=>dispatch({type:'sendMessage'})} centered>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Send Message</h5>
						<Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'sendMessage'})}>
							
						</Button>
					</div>
					<div className="modal-body">
						<form className="comment-form" onSubmit={(e) => { e.preventDefault(); dispatch({type:'sendMessage'}); }}>
							<div className="row">
								<div className="col-lg-6">
									<div className="form-group mb-3">
										<label htmlFor="author" className="text-black font-w600">  Name <span className="required">*</span> </label>
										<input type="text" className="form-control" defaultValue="Author" name="Author" placeholder="Author" />
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group mb-3">
										<label htmlFor="email" className="text-black font-w600"> Email <span className="required">*</span></label>
										<input type="text" className="form-control" defaultValue="Email" placeholder="Email" name="Email"/>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group mb-3">
										<label htmlFor="comment" className="text-black font-w600">Comment</label>
										<textarea rows={4} className="form-control" name="comment" placeholder="Comment" defaultValue={""}/>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group mb-3">
										<input type="submit" value="Post Comment" className="submit btn btn-primary" name="submit"/>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</Modal>
		  {/* Post Modal */}
			  <Modal show={state.post} className="modal fade" id="postModal" onHide={() => dispatch({type:'postModal'})} centered>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Post</h5>
						<Button variant=""  type="button" className="close" data-dismiss="modal" onClick={() => dispatch({type:'postModal'})} >
							<span>×</span>
						</Button>
						
					</div>
					<div className="modal-body">
						<textarea name="textarea" id="textarea" cols={30} rows={5} className="form-control mb-2 bg-transparent" placeholder="Please type what you want...." defaultValue={""}/>
						<Link className="btn btn-primary btn-rounded mt-1" to="/app-profile">Post</Link>
					</div>
				</div>
			</Modal>
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
			 {/* Reply Modal */}
			  <Modal   show={state.reply}  className="modal fade" id="replyModal" onHide={()=>dispatch({type:'replyModal'})} centered>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Post Reply</h5>
						<button type="button" className="btn-close"  onClick={() => dispatch({type:'replyModal'})}></button>
					</div>
					<div className="modal-body">
						<form>
							<textarea className="form-control" rows="4">Message</textarea>
						</form>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-danger light"  onClick={() => dispatch({type:'replyModal'})}>Close</button>
						<button type="button" className="btn btn-primary">Reply</button>
					</div>
				</div>
			</Modal>
		</Fragment>
	  );
};

export default SingleProfile;