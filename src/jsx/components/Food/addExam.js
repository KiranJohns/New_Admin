import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Dropdown, Tab } from 'react-bootstrap';
import { IMAGES, SVGICON } from '../Dashboard/Content';
import circle from './../../../images/circle.svg';
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import quotes from './../../../images/quotes.svg';
import { Editor } from '@tinymce/tinymce-react'




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

const AddExam = () => {

    const [text, setText] = useState('')
    const [value, setValue] = useState('<p>TinyMCE editor text</p>')

    console.log(value);
    console.log(text)

    return (
        <div className="row">
            <div className='col-xl-11'>
                <div className='card' style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', background: '#f5f5f7' }}>
                    <div style={{ display: '', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <form type="button" onSubmit={(e) => e.preventDefault()}>




                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='card-body'>
                                    <h4 className='' style={{ textAlign: 'center' }}>
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
                                    <h4 className='' style={{ textAlign: 'center' }}>
                                        Course Name:
                                    </h4>
                                    <div className="form-group mb-3">
                                        <select
                                            defaultValue={"option"}
                                            className="form-control form-control-lg"
                                        >
                                            <option>Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: '1rem' }}>
                                <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", paddingBottom: '.5rem', borderRadius: '.7rem', }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', }}>
                                        <div className='card-body'>
                                            <h4 className='' style={{ textAlign: 'center' }}>
                                                Question 1:
                                            </h4>
                                            <div className="">
                                                <textarea
                                                    className="form-control"
                                                    rows="4"
                                                    id="comment"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='p-3'>
                                        <h4 className='' style={{ textAlign: 'center' }}>
                                            option 1
                                        </h4>
                                        <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                                            <input style={{ marginRight: '1.5rem' }}
                                                type="checkbox"
                                                className="form-check-input"
                                                id="customCheckBox8"
                                                required
                                            />
                                            <input style={{ width: "80%" }}
                                                className="form-control"
                                                type="text"
                                                placeholder="option 1"
                                            />
                                        </div>
                                    </div>

                                    <div className='p-3'>
                                        <h4 className='' style={{ textAlign: 'center' }}>
                                            option 2
                                        </h4>
                                        <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                                            <input style={{ marginRight: '1.5rem' }}
                                                type="checkbox"
                                                className="form-check-input"
                                                id="customCheckBox8"
                                                required
                                            />
                                            <input style={{ width: "80%" }}
                                                className="form-control"
                                                type="text"
                                                placeholder="option 2"
                                            />
                                        </div>
                                    </div>
                                    <div className='p-3'>
                                        <h4 className='' style={{ textAlign: 'center' }}>
                                            option 3
                                        </h4>
                                        <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                                            <input style={{ marginRight: '1.5rem' }}
                                                type="checkbox"
                                                className="form-check-input"
                                                id="customCheckBox8"
                                                required
                                            />
                                            <input style={{ width: "80%" }}
                                                className="form-control"
                                                type="text"
                                                placeholder="option 3"
                                            />
                                        </div>
                                    </div>

                                 <div className='p-3'>
                                        <h4 className='' style={{ textAlign: 'center' }}>
                                            option 4
                                        </h4>
                                        <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                                            <input style={{ marginRight: '1.5rem' }}
                                                type="checkbox"
                                                className="form-check-input"
                                                id="customCheckBox8"
                                                required
                                            />
                                            <input style={{ width: "80%" }}
                                                className="form-control"
                                                type="text"
                                                placeholder="option 4"
                                            />
                                        </div>
                                    </div>
                            
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <div className='m-2 p-2 '>
                                            <Button className="" variant="primary">
                                                Add question
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            </div>



                            {/*                         
                            <Editor apiKey="enk9sksvp1tt5f2u075ef5jfjrff9e37ahpv80zdk3734qh4" onEditorChange={(newValue, editor)=>{
                                                setValue(newValue);
                                               setText(editor.getContent({format:'text'}))
                                            }}/> */}


                            {/* <div style={{ padding: '1rem' }}>
                                <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", paddingBottom: '.5rem', borderRadius: '.7rem', }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', }}>
                                        <div className='card-body'>
                                            <h4 className='' style={{ textAlign: 'center' }}>
                                                Question 10:
                                            </h4>
                                            <div className="  ">
                                                <input
                                                    type="text"
                                                    className="form-control input-default "
                                                    placeholder="question"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='p-3'>
                                        <div className='row d-flex  justify-content-center '>
                                            <div className="form-group col-2 ">
                                                <label>option a</label>
                                                <input
                                                    type="text"
                                                    className="form-control input-default "
                                                    placeholder="a"
                                                />
                                            </div>
                                            <div className="form-group col-2 ">
                                                <label>option b</label>
                                                <input
                                                    type="text"
                                                    className="form-control input-default "
                                                    placeholder="b"
                                                />
                                            </div>
                                            <div className="form-group col-2 ">
                                                <label>option c</label>
                                                <input
                                                    type="text"
                                                    className="form-control input-default "
                                                    placeholder="c"
                                                />
                                            </div>
                                            <div className="form-group col-2">
                                                <label>option d</label>
                                                <input
                                                    type="text"
                                                    className="form-control input-default "
                                                    placeholder="d"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}



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

export default AddExam;