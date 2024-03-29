import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BasicModal from "../components/Dashboard/BasicModal";
// import DropDownBlog from '../components/Dashboard/DropDownBlog';
import { SideBarAdd } from "./nav/Header2";

import pic1 from "./../../images/profile/small/pic1.jpg";
import pic2 from "./../../images/profile/small/pic2.jpg";
import pic3 from "./../../images/profile/small/pic3.jpg";
import pic4 from "./../../images/profile/small/pic4.jpg";
import pic5 from "./../../images/profile/small/pic5.jpg";
import foodpic1 from "./../../images/food/pic1.jpg";
import foodpic2 from "./../../images/food/pic2.jpg";
import foodpic3 from "./../../images/food/pic3.jpg";
import fetchData from "../../axios";
import avathar5 from "./../../images/squareprofile.jpg"

const studentList = [
  { image: pic1, title: "Samantha William", subtitle: "ID 1134" },
  { image: pic2, title: "Tony Soap", subtitle: "ID 1136" },
  { image: pic3, title: "Karen Hope", subtitle: "ID 1134" },
  { image: pic4, title: "Jordan Nico", subtitle: "ID 1133" },
  { image: pic5, title: "Nadila Adja", subtitle: "ID 1130" },
];

const cardBlog = [
  { image: foodpic1, title: "Beef Steak with Fried Potato" },
  { image: foodpic2, title: "Pancake with Honey" },
  { image: foodpic3, title: "Japanese Beef Ramen" },
];

const WalletBar = () => {
  // const childRef = useRef();
  const [addList, setAddList] = useState(studentList);
  const [load, setload] = useState(false);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const makeRequest = fetchData();
  const AddMoreData = () => {
    setload(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * addList?.length);
      const randomItem = addList[randomIndex];
      setAddList((prevArray) => [...prevArray, randomItem]);
      setload(false);
    }, 1000);
  };
  useEffect(() => {
    makeRequest("GET", "/info/super-admin-dashboard-data")
      .then((res) => {
        setUsers(res?.data?.response?.newUsers?.slice(0,6));
		setBlogs(res?.data?.response?.newBlogs?.slice(0,6))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className={`wallet-bar dlab-scroll`} id="wallet-bar">
        <div className="row">
          <div className="col-xl-12">
            <div className="card bg-transparent mb-1">
              <div className="card-header  border-0 px-3">
                <div>
                  <h2 className="heading mb-0">New Individuals</h2>
                  <span>
                    You have{" "}
                    <span className="font-w600">{users && users?.length || 0}</span>{" "}
                    new users
                  </span>
                </div>
                <div>
                  <a
                   
                    className="add icon-box bg-primary"
                    
                    href="/add-user"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.188 13.412V8.512H0.428V5.348H5.188V0.531999H8.352V5.348H13.14V8.512H8.352V13.412H5.188Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div
                className="card-body height450 dlab-scroll loadmore-content recent-activity-wrapper p-3 pt-2"
                id="RecentActivityContent"
              >
                {users &&
                  users.map((item, ind) => (
                    <div
                      className="d-flex align-items-center student"
                      key={ind}
                    >
                      <span className="dz-media">
                        <img src={item.profile_image ? item.profile_image : avathar5} alt="" width="50" className="avatar" />
                      </span>
                      <div className="user-info">
                        <h6 className="name">
                          <Link to={"https://admin.learnforcare.co.uk/individual"}>ID {item.id}</Link>
                        </h6>
                        <span className="fs-14 font-w400 text-wrap">
                          {item.first_name + " " + item.last_name}
                        </span>
                      </div>
                      {/* <div className="icon-box st-box ms-auto">
											<Link to={"#"}>
												<svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M19 0.000114441H3C2.20435 0.000114441 1.44129 0.316185 0.878679 0.878794C0.31607 1.4414 0 2.20446 0 3.00011V13.0001C0 13.7958 0.31607 14.5588 0.878679 15.1214C1.44129 15.684 2.20435 16.0001 3 16.0001H19C19.7956 16.0001 20.5587 15.684 21.1213 15.1214C21.6839 14.5588 22 13.7958 22 13.0001V3.00011C22 2.20446 21.6839 1.4414 21.1213 0.878794C20.5587 0.316185 19.7956 0.000114441 19 0.000114441V0.000114441ZM20 12.7501L15.1 8.35011L20 4.92011V12.7501ZM2 4.92011L6.9 8.35011L2 12.7501V4.92011ZM8.58 9.53011L10.43 10.8201C10.5974 10.9362 10.7963 10.9985 11 10.9985C11.2037 10.9985 11.4026 10.9362 11.57 10.8201L13.42 9.53011L18.42 14.0001H3.6L8.58 9.53011ZM3 2.00011H19C19.1857 2.0016 19.3673 2.05478 19.5245 2.15369C19.6817 2.2526 19.8083 2.39333 19.89 2.56011L11 8.78011L2.11 2.56011C2.19171 2.39333 2.31826 2.2526 2.47545 2.15369C2.63265 2.05478 2.81428 2.0016 3 2.00011V2.00011Z" fill="#A098AE"/>
												</svg>
											</Link>		
										</div>													 */}
                    </div>
                  ))}
              </div>
              <div className="card-footer text-center border-0 pt-0 px-3 pb-0">
                <a
                href="/individual"
                  // to={"#"}
                  className="btn btn-block btn-primary light btn-rounded dlab-load-more"
                  // onClick={AddMoreData}
                >
                  {" "}
                  View More {load && <i className="fa fa-refresh"></i>}
                </a>
              </div>
            </div>
          </div>
          {/* <div className="col-xl-12">
						<div className="card massage bg-transparent mb-0">
							<div className="card-header border-0 px-3 py-0">
								<div>
									<h2 className="heading">Messages</h2>
								</div>
								
							</div>
							<div className="card-body height450 dlab-scroll p-0 px-3" id="messageContent">
								{ studentList.map((item , ind)=>(
									<div className="d-flex student border-bottom" key={ind}>
										<div className="d-flex align-items-center">
											<span className="dz-media">
												<img src={item.image} alt="" className="avatar" />
											</span>
											<div className="user-info">
												<h6 className="name"><Link to={"/app-profile"}>{item.title}</Link></h6>
												<span className="fs-14 font-w400 text-wrap">Lorem ipsum dolor sit</span>
											</div>
										</div>													
										<div className="indox">
											<span className="fs-14 font-w400 text-wrap">12:45 PM</span>		
										</div>
									</div>
								))}
							</div>
							<div className="card-footer text-center border-0 pt-0 px-3 pb-0">
								<Link to={"#"} className="btn btn-block btn-primary light btn-rounded dlab-load-more"									
								> 
									View More
								</Link>
							</div>
						</div>	
					</div>	 */}
          <div className="col-xl-12 ">
            <div className="card tags bg-transparent mb-0">
              <div className="card-header border-0 px-3 py-0">
                <h2 className="heading">New Blogs</h2>
              </div>
              <div className="card-body  p-3 py-1 ">
                {blogs.map((item, index) => (
                  <div className="card-body-inner food" key={index}>
                    <span className="dz-media">
                      <img src={item.img} alt="" className="avatar" />
                    </span>
                    <div className="user-info">
                      <h5 className="name">
                        <Link to={"https://admin.learnforcare.co.uk/view-blog"}>{item.header}</Link>
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-footer pt-0 border-0 px-2">
               <a href="/view-blog"> 
               <button className="btn btn-block btn-primary light btn-rounded  mb-3">
                  View More
                </button></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wallet-bar-close" onClick={() => SideBarAdd()}></div>
      {/* <BasicModal ref={childRef} /> */}
    </>
  );
};

export default WalletBar;
