import React, { useContext } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { navtoggle } from "../../../store/actions/AuthActions";
import { ThemeContext } from "../../../context/ThemeContext";
import { useDispatch , useSelector} from "react-redux";
import imgg from '../../../images/learnLogo.png'
// import logo1 from "../../../images/activity-img/logo7.png";

const NavHader = () => {
 
  const {  openMenuToggle,  } = useContext(
    ThemeContext
  );
  const dispatch = useDispatch();
  const sideMenu = useSelector(state => state.sideMenu);
  const handleToogle = () => {
   	dispatch(navtoggle());
  };
  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo"> 
        {/* <img src={imgg} style={{width:'15rem'}} alt="image" /> */}
          <div className="brand-title">
         <h4 style={{color:'white', marginTop:'1rem'}}>Learn For Care</h4>
         
          </div>       
      </Link>

      <div
          className="nav-control"
          onClick={() => {
              handleToogle()
               openMenuToggle();
              
          }}
      >
        <div className={`hamburger ${sideMenu ? "is-active" : ""}`}>
            <span className="line"></span><span className="line"></span><span className="line"></span>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="22" y="11" width="4" height="4" rx="2" fill="#2A353A"/>
              <rect x="11" width="4" height="4" rx="2" fill="#2A353A"/>
              <rect x="22" width="4" height="4" rx="2" fill="#2A353A"/>
              <rect x="11" y="11" width="4" height="4" rx="2" fill="#2A353A"/>
              <rect x="11" y="22" width="4" height="4" rx="2" fill="#2A353A"/>
              <rect width="4" height="4" rx="2" fill="#2A353A"/>
              <rect y="11" width="4" height="4" rx="2" fill="#2A353A"/>
              <rect x="22" y="22" width="4" height="4" rx="2" fill="#2A353A"/>
              <rect y="22" width="4" height="4" rx="2" fill="#2A353A"/>
            </svg>	
        </div>
      </div>
    </div>
  );
};

export default NavHader;
