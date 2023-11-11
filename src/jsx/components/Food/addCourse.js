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

const AddCourse = () => {
    return (
        <div className="row">
            <div className='col-xl-11'>
                <div className='card' style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', background: '#ebf9fc' }}>
                    <div style={{ display: '', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <form type="button" onSubmit={(e) => e.preventDefault()}>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                        Course Name:
                                    </h4>
                                    <div className=" mb-3 ">
                                        <input
                                            type="text"
                                            className="form-control input-default "
                                            placeholder="course name"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                        Course Price:
                                    </h4>
                                    <div className=" mb-3 ">
                                        <input
                                            type="text"
                                            className="form-control input-default "
                                            placeholder="course price"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                       Course Category:
                                    </h4>
                                    <div className="form-group mb-3">
                    <select
                      defaultValue={"option"}
                      className="form-control form-control-lg"
                    >
                      <option>Select</option>
                      <option>Care Course</option>
                      <option>Mandatory Care Course</option>   
                      <option>Specialised Care Course</option>
                      <option>Recovery Care Course</option>
                      <option>Child Care Course</option>
                    </select>
                  </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                        Course Introduction:
                                    </h4>
                                    <div className="form-group ">
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            id="comment"
                                            placeholder="Content"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                        

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                        Upload Course Image:
                                    </h4>
                                    <div className="">
                                        <label htmlFor="formFile" className="form-label"></label>
                                        <input className="form-control" type="file" id="formFile" />
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{textAlign:'center'}}>
                                        Upload Course Video:
                                    </h4>
                                    <div className="">
                                        <label htmlFor="formFile" className="form-label"></label>
                                        <input className="form-control" type="file" id="formFile" />
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
                                        <input className="form-control" type="file" id="formFile" />
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
				  <input className="form-control" type="file" id="formFileMultiple" multiple />
				</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='m-2 p-2 '>
                                    <Button className="" variant="primary">
                                      Submit
                                    </Button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AddCourse;