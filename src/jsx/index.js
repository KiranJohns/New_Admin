import React, { useContext } from "react";
import {  Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";
import SingleCourse from "./components/Food/SingleCoursePage";
import ViewCourse from "./components/viewCourse.";
import AddCourse from "./components/Food/addCourse"; 
import AddExam from "./components/Food/addExam";
import ViewExam from "./components/viewExam";
import ViewCertificates from "../jsx copy/components/Student/Certificates";
import SingleProfile from "../jsx copy/components/AppsMenu/AppProfile/SingleProfile";
import EmployeeView from "../jsx copy/components/AppsMenu/AppProfile/EmployeeView";
import AddDetails from "./components/Student/AddDetails";
import ViewInvoice from "./components/viewInvoices";
import ViewReports from "./components/viewReports";
import CompanyAdmin from "./components/Teacher/Company";
import CouponList from "../jsx copy/components/Student/Coupons";
import CompanyTable from "./components/Student/Company";
import ManagerTable from "./components/Student/Managers";
import SalesTab from "./components/SalesTab";
import ProfileEdit from "./components/Student/ProfileEdit";
import CreateCoupon from "./components/Food/CreateCoupon";
import VolumeDiscount from "./components/Food/VolumeDiscount";
import OfferText from "./components/Food/OfferText";
import EditBlog from "./components/Food/EditBlog";
import BlogTrash from "./components/Food/TrashBlog";
import AddCertificate from "./components/Student/AddCertificate";
import EditCourse from "./components/Food/editCourse";
import PurchasedCourses from "./components/PurchasedCourses";
import PurchasedBundles from "./components/PurchasedBundles";
import MyBundles from "./components/MyBundles";
import TrainingMatrix from "./components/TrainingMatrix";
import BundleMatrix from "./components/BundleMatrix";
import CourseMatrix from "./components/CourseMatrix";
import CourseIndReport from "./components/IndCourseReport";
import CourseManReport from "./components/ManCourseBundle";
/// Layout
import Nav from "./layouts/nav";
import Nav2 from "./layouts/nav/index2";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
// import Main from './layouts/Main';
import WalletBar from './layouts/WalletBar';
/// Dashboard
import Home from "./components/Dashboard/Home";
import Finance from "./components/Dashboard/Finance";
import DashboardDark from "./components/Dashboard/DashboardDark";

//student
import Students from "./components/Student/Students";
import StudentDetails from "./components/Student/StudentDetails";
import AddNewStudent from "./components/Student/AddNewStudent";

//Teacher
import Teachers from './components/Teacher/Teachers';
import TeachersDetail from './components/Teacher/TeachersDetail';
import AddNewTeacher from './components/Teacher/AddNewTeacher';
//Food
import Food from './components/Food/Food';
import FoodDetails from './components/Food/FoodDetails';

/// File Manager
import FileManager from './components/FileManager/FileManager';
// import User from './components/FileManager/User';
import HomeCalendar from './components/FileManager/HomeCalendar';
import Activity from './components/FileManager/Activity';
import FileChat from './components/FileManager/FileChat';



/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";
import EditProfile from "./components/AppsMenu/AppProfile/EditProfile";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";

/// Product List
import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Charts
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Bootstrap
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";
// import MainNouiSlider from "./components/PluginsMenu/NouiSlider/MainNouiSlider";
import MainSweetAlert from "./components/PluginsMenu/SweetAlert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
// import JqvMap from "./components/PluginsMenu/JqvMap/JqvMap";
import Lightgallery from "./components/PluginsMenu/Lightgallery/Lightgallery";


/// Widget
import Widget from "./pages/Widget";

/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import CkEditor from "./components/Forms/CkEditor/CkEditor";
import Pickers from "./components/Forms/Pickers/Pickers";
import FormValidation from "./components/Forms/FormValidation/FormValidation";

/// Pages

import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import { ThemeContext } from "../context/ThemeContext";

const Markup = () => {
  const routhPath = [
    {url:"individual-reports", components:<CourseIndReport/>},
    {url:"manager-reports", components:<CourseManReport/>},
    {url:"training-matrix", components:<TrainingMatrix/>},
    {url:"course-matrix", components:<CourseMatrix/>},
    {url:"bundle-matrix", components:<BundleMatrix/>},
    {url:"manager", components:<ManagerTable/>},
    {url:"view-bundles", components:< MyBundles/>},
    {url:"purchased-bundles", components:<PurchasedBundles/>},
     {url:"purchased-courses", components:<PurchasedCourses/>},
    {url:'course-details',component: <SingleCourse />},
    {url:'add-details',component: <AddDetails />},
    {url:'profile',component: <SingleProfile />},
    {url:'view-certificate', component: <ViewCertificates /> },
     {url:'view-exam', component: <ViewExam /> },
    { url: "add-exam", component: <AddExam /> },
    {url:"add-course", component:<AddCourse/>},
    {url:"edit-course", component:<EditCourse/>},
    {url:"view-course",component:<ViewCourse/>},
    {url: "finance", component: <Finance/>},
    {url: "individual", component: <Students/>},
    {url: "user-detail", component: <StudentDetails/>},
    {url: "add-user", component: <AddNewStudent/>},
    {url: "admins", component: <Teachers/>},
    {url: "teacher-detail", component: <TeachersDetail/>},
    {url: "add-teacher", component: <AddNewTeacher/>},
    {url: "view-blog", component: <Food/>},    
    {url: "add-blog", component: <FoodDetails/>},
    {url:'invoices',component: <ViewInvoice />},
    {url:'reports',component: <ViewReports />},
    {url:'sales',component: <SalesTab />},
    {url:'edit-profile',component: <ProfileEdit />},
    {url:'create-coupon',component: <CreateCoupon/>},
    {url:'coupon-list',component: <CouponList/>},
    {url:'volume-discount',component: <VolumeDiscount/>},
    {url:'company',component: <CompanyTable/>},
    {url:'offer-text',component: <OfferText/>},
    {url:'edit-blog',component: <EditBlog/>},
    {url:'trash',component: <BlogTrash/>},
    {url:'create-certificate',component: <AddCertificate/>},
     //BlogTrash {url:'company',component: <CompanyAdmin />},
    // {url: "user", component: <User/>},
    {url: "activity", component: <Activity/>},
    {url: "calendar", component: <HomeCalendar/>},
    {url: "view-employee", component: <EmployeeView/>},
    //App Profile
    {url: "app-profile", component: <AppProfile/>},
    {url: "post-details", component: <PostDetails/>},
    {url: "edit-profile", component: <EditProfile/>},
    {url: "app-calender", component: <Calendar/>},
    //App -> shops
    {url: "ecom-product-grid", component: <ProductGrid/>},
    {url: "ecom-product-list", component: <ProductList/>},
    {url: "ecom-product-detail", component: <ProductDetail/>},
    {url: "ecom-product-order", component: <ProductOrder/>},
    {url: "ecom-checkout", component: <Checkout/>},
    {url: "ecom-invoice", component: <Invoice/>},
    {url: "ecom-customers", component: <Customers/>},
    //Charts
    {url: "chart-apexchart", component: <ApexChart/>},
    {url: "chart-rechart", component: <RechartJs/>},
    {url: "chart-chartjs", component: <ChartJs/>},
    {url: "chart-sparkline", component: <SparklineChart/>},    

    //bootstrap
    {url: "ui-modal", component: <UiModal/>},   
    {url :'ui-popover', component:<UiPopOver/>}, 
    {url: "ui-typography", component: <UiTypography/> },
    {url: "ui-grid", component: <UiGrid/> },

    //Plugins
    { url: "uc-select2", component: <Select2/> },
    { url: "uc-toastr", component: <Toastr/> },  
    { url: "uc-lightgallery", component: <Lightgallery/> }, 
    { url: "uc-sweetalert", component: <MainSweetAlert/> }, 
    { url: "form-element", component: <Element/> },
    { url: "form-wizard", component: <Wizard/> },
    { url: "form-ckeditor", component: <CkEditor/> },
    { url: "form-validation", component: <FormValidation/> },
    //widget
    { url: "widget", component: <Widget/> },  
    /// table
	  { url: 'table-filtering', component: <FilteringTable/> },
    { url: 'table-sorting', component: <SortingTable/> },
    { url: "table-bootstrap-basic", component: <BootstrapTable/> },  
    { url: "form-pickers", component: <Pickers/> },  
    
  ] 
  const routhPath2 =  [
    //Bootstrap
    {url: "ui-accordion", component: <UiAccordion/>},  
    {url :"ui-alert", component:<UiAlert/>},                       
    {url :"ui-badge", component:<UiBadge/>},                       
    {url :"ui-button", component:<UiButton/>},                       
    {url :"ui-button-group", component:<UiButtonGroup/>},                       
    {url :"ui-list-group", component:<UiListGroup/>},                       
    {url :"ui-card", component:<UiCards/>},      
    {url :'/ui-carousel', component:<UiCarousel/>}, 
    {url :'/ui-dropdown', component:<UiDropDown/>},
    {url :'/ui-progressbar', component:<UiProgressBar/>},
    {url :'/ui-tab', component:<UiTab/>},  
    {url :'/ui-pagination', component:<UiPagination/>},        
  ];
  
  return (
    <>
      <Routes>                    
          <Route path='/page-error-400' element={<Error400 />} />
          <Route path='/page-error-403' element={<Error403 />} />
          <Route path='/page-error-404' element={<Error404 />} />
          <Route path='/page-error-500' element={<Error500 />} />
          <Route path='/page-error-503' element={<Error503 />} />     
          <Route path='/page-lock-screen' element={<LockScreen />} />     
            <Route element={<Layout1 />}>
              <Route path='/' exact element={<Home/>} />
              <Route path='/dashboard' exact element={<Home/>} />              
              <Route path='/dashboard-dark' exact element={<DashboardDark/>} />                            
            </Route>           
            <Route element={<Layout2 />}>							        
                { routhPath.map((data, i) => (
                  <Route key={i} exact path={`/${data.url}`} element={data.component} />
                ))}  
            </Route>                              
            <Route element={<Layout5 />}>	    
              <Route path='/file-manager' exact element={<FileManager/>} />               
              <Route path='/chat' exact element={<FileChat/>} />
              <Route path='/email-compose' exact element={<Compose/>} />
              <Route path='/email-inbox' exact element={<Inbox/>} />
              <Route path='/email-read' exact element={<Read/>} />  
            </Route> 
            <Route element={<Layout6 />}>	      
                {routhPath2.map((data, i) => (
                  <Route key={i} exact path={`/${data.url}`} element={data.component} />
                ))} 
            </Route>  
				</Routes>        
	    <ScrollToTop />
    </>
  );
};

function Layout1(){
  const {  sidebariconHover } = useContext(ThemeContext);
  const sideMenu = useSelector(state => state.sideMenu);
  let windowsize = window.innerWidth;
  // console.log(windowsize, 'size')
  return(
    
      <div id="main-wrapper" className={` show  ${sidebariconHover ? "iconhover-toggle": ""} ${ sideMenu ? "menu-toggle" : ""}`}>                
          <div className={`wallet-open  ${windowsize > 1199 ? 'active' : ''}`}>
           <Nav2 />
            <div className="content-body" style={{ minHeight: window.screen.height + 20 }}>
              <div className="container-fluid"> 
                <Outlet />
              </div>  
            </div> 
            <Footer changeFooter="footer-outer"/> 
            <WalletBar />           
          </div>
      </div>            
    
  )
}

function Layout2(){
  const sideMenu = useSelector(state => state.sideMenu);
  const {  sidebariconHover } = useContext(ThemeContext);
  return(    
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle": ""} ${ sideMenu ? "menu-toggle" : ""}`}>           
        <Nav2 />
        <div className="content-body" style={{ minHeight: window.screen.height + 20 }}>
          <div className="container-fluid">							        
            <Outlet />							        
          </div>                        
        </div>  
        <Footer  changeFooter="out-footer style-2"/>           
    </div>  
    
  )
}



function Layout5(){
  const sideMenu = useSelector(state => state.sideMenu);
  const {  sidebariconHover } = useContext(ThemeContext);
  return(
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle": ""} ${ sideMenu ? "menu-toggle" : ""}`}>  	      
          <Nav />
          <div className="content-body message-body mh-auto">
            <div className="container-fluid mh-auto p-0">   
              <Outlet />
            </div>
          </div>
    </div>
  )
}
function Layout6(){
  const sideMenu = useSelector(state => state.sideMenu);
  const {  sidebariconHover } = useContext(ThemeContext);
  return(
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle": ""} ${ sideMenu ? "menu-toggle" : ""}`}>  
        <Nav />
        <div className="content-body">
          <div className="container-fluid">       
            <Outlet />
          </div>
        </div>
        <Footer  changeFooter="out-footer style-1"/>
      </div>
  )
}

export default Markup;