import React, { useRef } from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
import BasicModal from '../Dashboard/BasicModal';

//comp
import CalendarBlog from './CalendarBlog';

//images
import bgimage from './../../../images/placeholder.png';
import pic1 from './../../../images/roll/pic1.png';
import pic2 from './../../../images/roll/pic2.png';
import pic3 from './../../../images/roll/pic3.png';
import pic4 from './../../../images/roll/pic4.png';

import img1 from './../../../images/roll/img1.png';
import img2 from './../../../images/roll/img2.png';
import img3 from './../../../images/roll/img3.png';
import img4 from './../../../images/roll/img4.png';

const listingBlog = [
    {image:img1, title:'Web Design Webinar', subtitle:'Sanctuary Studio', bgColor:'#EB62D0'},
    {image:img2, title:'Usability Testing', subtitle:'Heaven Studio', bgColor:'#1EBA62', mainClass:'mt-4'},
    {image:img3, title:'Workout Weekly', subtitle:'Self', bgColor:'#01A3FF', mainClass:'mt-4'},
    {image:img4, title:'Weekly Meeting', subtitle:'Porty Team', bgColor:'#FFD125', mainClass:'mt-4'}
];

const taskList = [
    {t1:'To Do', t2:'5 Task Now', t3:'1 On Progress'},
    {t1:'In Progress', t2:'8 Task Now', t3:'3 On Progress'},
    {t1:'Completed', t2:'13 Task Now', t3:'7 Completed'}
];

const ToDoList = () => {
    const childRef = useRef();
    return(
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="page-titles ">
                        <div className="d-flex align-items-center">
                            <h2 className="heading">To Do List</h2>
                        </div>
                        <div className="">
                            <button
                                onClick={() => childRef.current.openModal()}  className="btn btn-primary"data-bs-toggle="modal" data-bs-target="#exampleModal"
							>New Task 
                                <svg width="24" height="24" className="ms-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 3C7.05 3 3 7.05 3 12C3 16.95 7.05 21 12 21C16.95 21 21 16.95 21 12C21 7.05 16.95 3 12 3ZM12 19.125C8.1 19.125 4.875 15.9 4.875 12C4.875 8.1 8.1 4.875 12 4.875C15.9 4.875 19.125 8.1 19.125 12C19.125 15.9 15.9 19.125 12 19.125Z" fill="#FCFCFC"/>
                                    <path d="M16.3498 11.0251H12.9748V7.65009C12.9748 7.12509 12.5248 6.67509 11.9998 6.67509C11.4748 6.67509 11.0248 7.12509 11.0248 7.65009V11.0251H7.6498C7.1248 11.0251 6.6748 11.4751 6.6748 12.0001C6.6748 12.5251 7.1248 12.9751 7.6498 12.9751H11.0248V16.3501C11.0248 16.8751 11.4748 17.3251 11.9998 17.3251C12.5248 17.3251 12.9748 16.8751 12.9748 16.3501V12.9751H16.3498C16.8748 12.9751 17.3248 12.5251 17.3248 12.0001C17.3248 11.4751 16.8748 11.0251 16.3498 11.0251Z" fill="#FCFCFC"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-xl-4">
                    <div className="card box-1">
                        <div className="max" style={{backgroundImage: 'url('+ bgimage +')', height: '250px' }}>
                            <div className="item">
                                <h3 className="text">Web Design Webinar</h3>
                                <ul className="d-flex">
                                    <li><img src={pic1} alt="" /></li>
                                    <li><img src={pic2} alt="" /></li>
                                    <li><img src={pic3} alt="" /></li>
                                    <li><img src={pic4} alt="" /></li>
                                </ul>
                            </div>
                            <Dropdown className="dropdown">
                                <Dropdown.Toggle as="div" className="i-false">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12.0012 9.86792C11.6543 9.86792 11.3109 9.93268 10.9904 10.0585C10.67 10.1843 10.3788 10.3687 10.1335 10.6012C9.88829 10.8337 9.69374 11.1097 9.56101 11.4134C9.42828 11.7172 9.35996 12.0427 9.35996 12.3715C9.35996 12.7003 9.42828 13.0258 9.56101 13.3296C9.69374 13.6333 9.88829 13.9093 10.1335 14.1418C10.3788 14.3743 10.67 14.5587 10.9904 14.6845C11.3109 14.8103 11.6543 14.8751 12.0012 14.8751C12.7017 14.8749 13.3734 14.611 13.8686 14.1414C14.3638 13.6718 14.6419 13.0349 14.6418 12.3709C14.6416 11.7069 14.3632 11.0702 13.8677 10.6008C13.3723 10.1314 12.7004 9.86777 12 9.86792H12.0012ZM3.60116 9.86792C3.25431 9.86792 2.91086 9.93268 2.59042 10.0585C2.26997 10.1843 1.97881 10.3687 1.73355 10.6012C1.48829 10.8337 1.29374 11.1097 1.16101 11.4134C1.02828 11.7172 0.959961 12.0427 0.959961 12.3715C0.959961 12.7003 1.02828 13.0258 1.16101 13.3296C1.29374 13.6333 1.48829 13.9093 1.73355 14.1418C1.97881 14.3743 2.26997 14.5587 2.59042 14.6845C2.91086 14.8103 3.25431 14.8751 3.60116 14.8751C4.30165 14.8749 4.97339 14.611 5.4686 14.1414C5.9638 13.6718 6.24192 13.0349 6.24176 12.3709C6.2416 11.7069 5.96318 11.0702 5.46775 10.6008C4.97231 10.1314 4.30045 9.86777 3.59996 9.86792H3.60116ZM20.4012 9.86792C20.0543 9.86792 19.7109 9.93268 19.3904 10.0585C19.07 10.1843 18.7788 10.3687 18.5336 10.6012C18.2883 10.8337 18.0937 11.1097 17.961 11.4134C17.8283 11.7172 17.76 12.0427 17.76 12.3715C17.76 12.7003 17.8283 13.0258 17.961 13.3296C18.0937 13.6333 18.2883 13.9093 18.5336 14.1418C18.7788 14.3743 19.07 14.5587 19.3904 14.6845C19.7109 14.8103 20.0543 14.8751 20.4012 14.8751C21.1017 14.8749 21.7734 14.611 22.2686 14.1414C22.7638 13.6718 23.0419 13.0349 23.0418 12.3709C23.0416 11.7069 22.7632 11.0702 22.2677 10.6008C21.7723 10.1314 21.1005 9.86777 20.4 9.86792H20.4012Z" fill="#fff"/>
									</svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end" >
                                    <Dropdown.Item>Delete</Dropdown.Item>
                                    <Dropdown.Item>Edit</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="max-2">
                            <div className="ul-li">
                                <ul className="d-flex">
                                    <li className="me-3 me-lg-5"><svg className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 14C12.1978 14 12.3911 13.9414 12.5556 13.8315C12.72 13.7216 12.8482 13.5654 12.9239 13.3827C12.9996 13.2 13.0194 12.9989 12.9808 12.8049C12.9422 12.6109 12.847 12.4327 12.7071 12.2929C12.5673 12.153 12.3891 12.0578 12.1951 12.0192C12.0011 11.9806 11.8 12.0004 11.6173 12.0761C11.4346 12.1518 11.2784 12.28 11.1685 12.4444C11.0587 12.6089 11 12.8022 11 13C11 13.2652 11.1054 13.5196 11.2929 13.7071C11.4804 13.8946 11.7348 14 12 14ZM17 14C17.1978 14 17.3911 13.9414 17.5556 13.8315C17.72 13.7216 17.8482 13.5654 17.9239 13.3827C17.9996 13.2 18.0194 12.9989 17.9808 12.8049C17.9422 12.6109 17.847 12.4327 17.7071 12.2929C17.5673 12.153 17.3891 12.0578 17.1951 12.0192C17.0011 11.9806 16.8 12.0004 16.6173 12.0761C16.4346 12.1518 16.2784 12.28 16.1685 12.4444C16.0587 12.6089 16 12.8022 16 13C16 13.2652 16.1054 13.5196 16.2929 13.7071C16.4804 13.8946 16.7348 14 17 14ZM12 18C12.1978 18 12.3911 17.9414 12.5556 17.8315C12.72 17.7216 12.8482 17.5654 12.9239 17.3827C12.9996 17.2 13.0194 16.9989 12.9808 16.8049C12.9422 16.6109 12.847 16.4327 12.7071 16.2929C12.5673 16.153 12.3891 16.0578 12.1951 16.0192C12.0011 15.9806 11.8 16.0004 11.6173 16.0761C11.4346 16.1518 11.2784 16.28 11.1685 16.4444C11.0587 16.6089 11 16.8022 11 17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18ZM17 18C17.1978 18 17.3911 17.9414 17.5556 17.8315C17.72 17.7216 17.8482 17.5654 17.9239 17.3827C17.9996 17.2 18.0194 16.9989 17.9808 16.8049C17.9422 16.6109 17.847 16.4327 17.7071 16.2929C17.5673 16.153 17.3891 16.0578 17.1951 16.0192C17.0011 15.9806 16.8 16.0004 16.6173 16.0761C16.4346 16.1518 16.2784 16.28 16.1685 16.4444C16.0587 16.6089 16 16.8022 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18ZM7 14C7.19778 14 7.39112 13.9414 7.55557 13.8315C7.72002 13.7216 7.84819 13.5654 7.92388 13.3827C7.99957 13.2 8.01937 12.9989 7.98079 12.8049C7.9422 12.6109 7.84696 12.4327 7.70711 12.2929C7.56725 12.153 7.38907 12.0578 7.19509 12.0192C7.00111 11.9806 6.80004 12.0004 6.61732 12.0761C6.43459 12.1518 6.27841 12.28 6.16853 12.4444C6.05865 12.6089 6 12.8022 6 13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14ZM19 4H18V3C18 2.73478 17.8946 2.48043 17.7071 2.29289C17.5196 2.10536 17.2652 2 17 2C16.7348 2 16.4804 2.10536 16.2929 2.29289C16.1054 2.48043 16 2.73478 16 3V4H8V3C8 2.73478 7.89464 2.48043 7.70711 2.29289C7.51957 2.10536 7.26522 2 7 2C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7957 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7957 4 19 4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V10H20V19ZM20 8H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V8ZM7 18C7.19778 18 7.39112 17.9414 7.55557 17.8315C7.72002 17.7216 7.84819 17.5654 7.92388 17.3827C7.99957 17.2 8.01937 16.9989 7.98079 16.8049C7.9422 16.6109 7.84696 16.4327 7.70711 16.2929C7.56725 16.153 7.38907 16.0578 7.19509 16.0192C7.00111 15.9806 6.80004 16.0004 6.61732 16.0761C6.43459 16.1518 6.27841 16.28 6.16853 16.4444C6.05865 16.6089 6 16.8022 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18Z" fill="#FFD125"/>
                                        </svg>
                                        March 20, 2022</li>
                                    <li><svg className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6C11.8687 5.99997 11.7386 6.02581 11.6173 6.07605C11.4959 6.12629 11.3857 6.19995 11.2928 6.29282C11.2 6.38568 11.1263 6.49594 11.0761 6.61728C11.0258 6.73862 11 6.86867 11 7V11.3838L8.56934 12.6069C8.45206 12.6659 8.34755 12.7474 8.26178 12.8468C8.176 12.9462 8.11064 13.0615 8.06942 13.1861C8.0282 13.3108 8.01194 13.4423 8.02156 13.5733C8.03118 13.7042 8.0665 13.8319 8.12549 13.9492C8.18448 14.0665 8.26599 14.171 8.36538 14.2568C8.46476 14.3426 8.58006 14.4079 8.70471 14.4491C8.82935 14.4904 8.96089 14.5066 9.09182 14.497C9.22274 14.4874 9.35049 14.4521 9.46777 14.3931L12.4492 12.8931C12.6148 12.81 12.7541 12.6824 12.8513 12.5247C12.9486 12.367 13.0001 12.1853 13 12V7C13 6.86867 12.9742 6.73862 12.924 6.61728C12.8737 6.49594 12.8001 6.38568 12.7072 6.29282C12.6143 6.19995 12.5041 6.12629 12.3827 6.07605C12.2614 6.02581 12.1313 5.99997 12 6ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C21.997 9.34877 20.9424 6.80699 19.0677 4.93228C17.193 3.05758 14.6512 2.00303 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23985 18.6518 7.55544C19.5308 8.87103 20 10.4178 20 12C19.9976 14.121 19.1539 16.1544 17.6542 17.6542C16.1544 19.1539 14.121 19.9976 12 20Z" fill="#01A3FF"/>
                                        </svg>
                                        09.00 - 10.00 AM</li>
                                </ul>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proiden.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        
                            <Link to={"#"} className="btn btn-primary">Set Reminder</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div className="card box-2">
                        <div>
                            <h3 className="heading">Upcoming List</h3>
                            <p>Thursday, 10th April , 2022</p>
                        </div>
                        {listingBlog.map((data, ind)=>(
                            <div className={`flow ${data.mainClass}`} key={ind}>
                                <h4>{data.title}</h4>
                                <p>{data.subtitle}</p>
                                <div className="dz-info">
                                    <ul>
                                        <li className="mb-2"><svg className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 14C12.1978 14 12.3911 13.9414 12.5556 13.8315C12.72 13.7216 12.8482 13.5654 12.9239 13.3827C12.9996 13.2 13.0194 12.9989 12.9808 12.8049C12.9422 12.6109 12.847 12.4327 12.7071 12.2929C12.5673 12.153 12.3891 12.0578 12.1951 12.0192C12.0011 11.9806 11.8 12.0004 11.6173 12.0761C11.4346 12.1518 11.2784 12.28 11.1685 12.4444C11.0587 12.6089 11 12.8022 11 13C11 13.2652 11.1054 13.5196 11.2929 13.7071C11.4804 13.8946 11.7348 14 12 14ZM17 14C17.1978 14 17.3911 13.9414 17.5556 13.8315C17.72 13.7216 17.8482 13.5654 17.9239 13.3827C17.9996 13.2 18.0194 12.9989 17.9808 12.8049C17.9422 12.6109 17.847 12.4327 17.7071 12.2929C17.5673 12.153 17.3891 12.0578 17.1951 12.0192C17.0011 11.9806 16.8 12.0004 16.6173 12.0761C16.4346 12.1518 16.2784 12.28 16.1685 12.4444C16.0587 12.6089 16 12.8022 16 13C16 13.2652 16.1054 13.5196 16.2929 13.7071C16.4804 13.8946 16.7348 14 17 14ZM12 18C12.1978 18 12.3911 17.9414 12.5556 17.8315C12.72 17.7216 12.8482 17.5654 12.9239 17.3827C12.9996 17.2 13.0194 16.9989 12.9808 16.8049C12.9422 16.6109 12.847 16.4327 12.7071 16.2929C12.5673 16.153 12.3891 16.0578 12.1951 16.0192C12.0011 15.9806 11.8 16.0004 11.6173 16.0761C11.4346 16.1518 11.2784 16.28 11.1685 16.4444C11.0587 16.6089 11 16.8022 11 17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18ZM17 18C17.1978 18 17.3911 17.9414 17.5556 17.8315C17.72 17.7216 17.8482 17.5654 17.9239 17.3827C17.9996 17.2 18.0194 16.9989 17.9808 16.8049C17.9422 16.6109 17.847 16.4327 17.7071 16.2929C17.5673 16.153 17.3891 16.0578 17.1951 16.0192C17.0011 15.9806 16.8 16.0004 16.6173 16.0761C16.4346 16.1518 16.2784 16.28 16.1685 16.4444C16.0587 16.6089 16 16.8022 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18ZM7 14C7.19778 14 7.39112 13.9414 7.55557 13.8315C7.72002 13.7216 7.84819 13.5654 7.92388 13.3827C7.99957 13.2 8.01937 12.9989 7.98079 12.8049C7.9422 12.6109 7.84696 12.4327 7.70711 12.2929C7.56725 12.153 7.38907 12.0578 7.19509 12.0192C7.00111 11.9806 6.80004 12.0004 6.61732 12.0761C6.43459 12.1518 6.27841 12.28 6.16853 12.4444C6.05865 12.6089 6 12.8022 6 13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14ZM19 4H18V3C18 2.73478 17.8946 2.48043 17.7071 2.29289C17.5196 2.10536 17.2652 2 17 2C16.7348 2 16.4804 2.10536 16.2929 2.29289C16.1054 2.48043 16 2.73478 16 3V4H8V3C8 2.73478 7.89464 2.48043 7.70711 2.29289C7.51957 2.10536 7.26522 2 7 2C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7957 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7957 4 19 4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V10H20V19ZM20 8H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V8ZM7 18C7.19778 18 7.39112 17.9414 7.55557 17.8315C7.72002 17.7216 7.84819 17.5654 7.92388 17.3827C7.99957 17.2 8.01937 16.9989 7.98079 16.8049C7.9422 16.6109 7.84696 16.4327 7.70711 16.2929C7.56725 16.153 7.38907 16.0578 7.19509 16.0192C7.00111 15.9806 6.80004 16.0004 6.61732 16.0761C6.43459 16.1518 6.27841 16.28 6.16853 16.4444C6.05865 16.6089 6 16.8022 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18Z" fill="#2A353A"/>
                                            </svg>{" "}
                                            March 20, 2022
                                        </li>
                                        <li>
                                            <svg className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 6C11.8687 5.99997 11.7386 6.02581 11.6173 6.07605C11.4959 6.12629 11.3857 6.19995 11.2928 6.29282C11.2 6.38568 11.1263 6.49594 11.0761 6.61728C11.0258 6.73862 11 6.86867 11 7V11.3838L8.56934 12.6069C8.45206 12.6659 8.34755 12.7474 8.26178 12.8468C8.176 12.9462 8.11064 13.0615 8.06942 13.1861C8.0282 13.3108 8.01194 13.4423 8.02156 13.5733C8.03118 13.7042 8.0665 13.8319 8.12549 13.9492C8.18448 14.0665 8.26599 14.171 8.36538 14.2568C8.46476 14.3426 8.58006 14.4079 8.70471 14.4491C8.82935 14.4904 8.96089 14.5066 9.09182 14.497C9.22274 14.4874 9.35049 14.4521 9.46777 14.3931L12.4492 12.8931C12.6148 12.81 12.7541 12.6824 12.8513 12.5247C12.9486 12.367 13.0001 12.1853 13 12V7C13 6.86867 12.9742 6.73862 12.924 6.61728C12.8737 6.49594 12.8001 6.38568 12.7072 6.29282C12.6143 6.19995 12.5041 6.12629 12.3827 6.07605C12.2614 6.02581 12.1313 5.99997 12 6ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C21.997 9.34877 20.9424 6.80699 19.0677 4.93228C17.193 3.05758 14.6512 2.00303 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23985 18.6518 7.55544C19.5308 8.87103 20 10.4178 20 12C19.9976 14.121 19.1539 16.1544 17.6542 17.6542C16.1544 19.1539 14.121 19.9976 12 20Z" fill="#2A353A"/>
                                            </svg>{" "}
                                            09.00 - 10.00 AM
                                        </li>
                                    </ul>
                                    <div className="dz-media"><img src={data.image} alt="" /></div>
                                </div>
                                <div className="side" style={{backgroundColor: data.bgColor }}></div>
                            </div>
                        ))}
                    
                        
                    </div>
                </div>
                <div className="col-md-12 col-xl-4">
                    <div className="box-3">
                        <div className="row">
                            <div className="col-md-6 col-xl-12">
                                <div className="card ">
                                    <div className="card-body">
                                        <div className="accordion-body-text">
                                            <div className="card-body card-calendar p-0">
                                                <CalendarBlog />
                                            </div>   
                                        </div>
                                    </div>
                                </div>            
                            </div>
                            <div className="col-md-6 col-xl-12">
                                <div className="card task">
                                    <h3>Task</h3>
                                    {taskList.map((data, index)=>(
                                        <div className="fl-1 mb-4" key={index}>
                                            <div className="dz-media">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V6C0 6.53043 0.210714 7.03914 0.585786 7.41421C0.960859 7.78929 1.46957 8 2 8H6C6.53043 8 7.03914 7.78929 7.41421 7.41421C7.78929 7.03914 8 6.53043 8 6V2C8 1.46957 7.78929 0.960859 7.41421 0.585786C7.03914 0.210714 6.53043 0 6 0ZM2 6V2H6V6H2ZM16 0H12C11.4696 0 10.9609 0.210714 10.5858 0.585786C10.2107 0.960859 10 1.46957 10 2V6C10 6.53043 10.2107 7.03914 10.5858 7.41421C10.9609 7.78929 11.4696 8 12 8H16C16.5304 8 17.0391 7.78929 17.4142 7.41421C17.7893 7.03914 18 6.53043 18 6V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0ZM12 6V2H16V6H12ZM6 10H2C1.46957 10 0.960859 10.2107 0.585786 10.5858C0.210714 10.9609 0 11.4696 0 12V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H6C6.53043 18 7.03914 17.7893 7.41421 17.4142C7.78929 17.0391 8 16.5304 8 16V12C8 11.4696 7.78929 10.9609 7.41421 10.5858C7.03914 10.2107 6.53043 10 6 10ZM2 16V12H6V16H2ZM16 10H12C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12V16C10 16.5304 10.2107 17.0391 10.5858 17.4142C10.9609 17.7893 11.4696 18 12 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V12C18 11.4696 17.7893 10.9609 17.4142 10.5858C17.0391 10.2107 16.5304 10 16 10ZM12 16V12H16V16H12Z" fill="#FCFCFC"/>
                                                </svg>
                                            </div>
                                            <div className="fl-2">
                                                <h4>{data.t1}</h4>
                                                <ul>
                                                    <li className="me-3">{data.t2}</li>
                                                    <li><svg width="6" className="me-3" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="3" cy="3.5" r="3" fill="#C4C4C4"/>
                                                        </svg>
                                                        {data.t3}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            
                            </div>

                        </div>
                    </div>


                </div>

            </div>                    
            <BasicModal ref={childRef} />

        </>
    )
}
export default ToDoList;