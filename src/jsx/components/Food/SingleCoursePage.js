import React from 'react';


import { IMAGES, SVGICON } from '../Dashboard/Content';
import circle from './../../../images/circle.svg';
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import quotes from './../../../images/quotes.svg';

const inputBlog = [
    { inputid: '1234', lable: 'Calories: 217.', inputid2: '23456', lable2: '2 tablespoons butter, softened, divided' },
    { inputid: '1235', lable: 'Water: 61%', inputid2: '23457', lable2: '1 teaspoon minced fresh parsley' },
    { inputid: '1236', lable: 'Protein: 26.1 grams.', inputid2: '23458', lable2: '1/2 teaspoon minced garlic' },
    { inputid: '1237', lable: 'Carbs: 0 grams.', inputid2: '23459', lable2: '1/4 teaspoon reduced-sodium soy sauce' },
    { inputid: '1238', lable: 'Sugar: 0 grams.', inputid2: '23460', lable2: '1 beef flat iron steak or boneless top sirloin steak (3/4 pound)' },
    { inputid: '1239', lable: 'Fiber: 0 grams.', inputid2: '23461', lable2: '1/8 teaspoon salt' },
    { inputid: '1240', lable: 'Vitamin: 10 grams.', inputid2: '23462', lable2: '1/8 teaspoon pepper' },
];

const cardBlog = [
    { image: IMAGES.avatarpng1, title: 'Samantha W.' },
    { image: IMAGES.avatarpng2, title: 'Karen Hope.' },
    { image: IMAGES.avatarpng3, title: 'Tony Soap' },
];

const tabledata = [
    { image: IMAGES.food3, title: 'Beef Steak with Fried Potato', subtitle: 'Snack', rating: '5.0', sales: '1,400', intrest: '17%' },
    { image: IMAGES.food5, title: 'Pancake with Honey', subtitle: 'Snack', rating: '4.8', sales: '1,456', intrest: '15%' },
];

const SingleCourse = () => {
    return (
        <div className="row">
            <div className='col-xl-11'>
                <div className='card' style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', background: '#f5f5f7' }}>
                    <div style={{ display: '', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <form type="button" onSubmit={(e) => e.preventDefault()}>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                        Course Name:
                                    </h4>
                                    <div className=" mb-3 ">
                                       <h5 style={{color:'black', textAlign:'center'}}>
                                        ADHD Awareness
                                       </h5>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                        Course Price:
                                    </h4>
                                    <div className=" mb-3 ">
                                    <h5 style={{color:'black', textAlign:'center'}}>
                                        7
                                       </h5>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                       Course Category:
                                    </h4>
                                    <div className=" mb-3 ">
                                    <h5 style={{color:'black', textAlign:'center'}}>
                                       Care Course
                                       </h5>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                        Course Introduction:
                                    </h4>
                                    <div className="form-group p-4">
                                        <p style={{textAlign:'center'}}>This online first-aid course is appropriate for individuals and businesses who want to learn new first-aid skills or refresh their existing first-aid skills. No previous qualifications are required 
                                            to take this course as all the essential first aid techniques are covered throughout the training.</p>
                                    </div>
                                </div>
                            </div>

                        

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                        Upload Course Image:
                                    </h4>
                                    <div className="">
                                   <img src="" alt="" />
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                        Upload Course Video:
                                    </h4>
                                    <div className="">
                                       <video ></video>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                        Upload Course ppt:
                                    </h4>
                                    <div className="">
                                        <label htmlFor="formFile" className="form-label"></label>
                                        <input className="form-control" type="file" id="formFile"  disabled/>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                        Upload Course pdf:
                                    </h4>
                                    <div className="">
				  <label htmlFor="formFileMultiple" className="form-label"></label>
                  <div style={{display:"flex", justifyContent:"center"}}>  <a href="#">course.pdf</a></div>		
				</div>
                                </div>
                            </div>

                            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='m-2 p-2 '>
                                    <Button className="" variant="primary">
                                      Submit
                                    </Button>
                                </div>
                            </div> */}

                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SingleCourse;