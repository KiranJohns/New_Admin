import React, { useContext } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { navtoggle } from "../../../store/actions/AuthActions";
import { ThemeContext } from "../../../context/ThemeContext";
import { useDispatch , useSelector} from "react-redux";
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
         <svg className="logo-abbr" width="40" height="40" viewBox="0 0 48 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="3" width="48" height="48" rx="16" fill="#FB7D5B"/>
            <path d="M28.964 35.536H19.532L18.02 40H11.576L20.72 14.728H27.848L36.992 40H30.476L28.964 35.536ZM27.38 30.784L24.248 21.532L21.152 30.784H27.38Z" fill="white"/>
          </svg>
          <div className="brand-title">
         <h2 style={{color:'white', marginTop:'1rem'}}>Admin</h2>
         
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
