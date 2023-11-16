import React from "react";
import { Link } from "react-router-dom";
import { Nav, Dropdown, Tab } from "react-bootstrap";
import { IMAGES, SVGICON } from "../Dashboard/Content";
import circle from "./../../../images/circle.svg";
import { Row, Col, Card, Button, ButtonGroup, Table } from "react-bootstrap";
import quotes from "./../../../images/quotes.svg";
import fetchData from "../../../axios";
import { useState } from "react";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import { BiSolidEdit } from "react-icons/bi";
import { RiChatDeleteFill } from "react-icons/ri";

const ff = [
    { image: IMAGES.avatarpng1, title: "Samantha W." },
    { image: IMAGES.avatarpng2, title: "Karen Hope." },
    { image: IMAGES.avatarpng3, title: "Tony Soap" },
];

const tabledata = [
    {
        image: IMAGES.food3,
        title: "Beef Steak with Fried Potato",
        subtitle: "Snack",
        rating: "5.0",
        sales: "1,400",
        intrest: "17%",
    },
    {
        image: IMAGES.food5,
        title: "Pancake with Honey",
        subtitle: "Snack",
        rating: "4.8",
        sales: "1,456",
        intrest: "15%",
    },
];

const OfferText = () => {
    const makeRequest = fetchData();
    const [blog, setBlog] = useState({
        header: "",
        content: "",
        author: "",
        tags: "",
        image: null,
    });

    function handleChange(e) {
        setBlog((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    }
    function Submit() {
        makeRequest("POST", "/blog/create-blog", blog)
            .then((res) => {
                swal("Done!", "blog created", "success");
            })
            .catch((err) => {
                let error = err?.data?.errors[0]?.error
                    ? err?.data?.errors[0]?.error
                    : err?.data?.errors[0]?.message;
                swal("Oops!", error, "error");
                console.log(err?.data?.errors[0]);
            });
        console.log(blog);
    }
    return (
        <div className="row">
            <div className="col-xl-12">
                <div
                    className="card"
                    style={{
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                        background: "#f5f5f7",
                    }}
                >
                    <div className="row" >
                        <div className="col-4" >
                            <form type="button" onSubmit={(e) => e.preventDefault()}>
                                <div style={{}}>

                                    <div style={{}}>
                                        <div className="card-body">
                                            <h4 className="">Offer Text</h4>
                                            <div className="mb-3 ">
                                                <textarea
                                                    className="form-control"
                                                    name="offer_text"
                                                    rows="4"
                                                    id="comment"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>



                                    <div style={{}} className="">
                                        <div className="card-body">
                                            <h4 className="">Highlight Word</h4>
                                            <div className="mb-3 ">
                                                <input
                                                    type="text"
                                                    className="form-control  input-default "
                                                    placeholder="0"
                                                    name="maximum"
                                                    //   value={}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{}} className="">
                                        <div className="card-body">
                                            <h4 className="">Is Active</h4>
                                            <div className="mb-3 ">
                                                <div className="form-group mb-0">
                                                    <label className="radio-inline me-4">
                                                        <input type="radio" name="optradio" /> Yes
                                                    </label>
                                                    <label className="radio-inline me-3">
                                                        <input type="radio" name="optradio" /> No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <div className="m-2 p-2 ">
                                            <Button
                                                className=""
                                                variant="primary"
                                                onClick={Submit}
                                                type="button"
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>


                        <div className="col-8 mt-4 " >
                            <div style={{ display: "flex", justifyContent: 'center' }}>
                                <Card >

                                    <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr >
                                                    <th >
                                                        <strong>Offer Text{' '}</strong>
                                                    </th>
                                                    <th>
                                                        <strong>Highlight{' '}</strong>
                                                    </th>

                                                    <th>
                                                        <strong>Action</strong>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
           <td style={{ textAlign: 'center' }}>This is an offer text example</td>
                                                    <td style={{ textAlign: 'center' }}>example</td>
                                                    <td>
                                                        <Button className="me-2" variant="primary btn-icon-xxs">
                                                            <BiSolidEdit />
                                                        </Button>
                                                        <Button className="me-2" variant="danger btn-icon-xxs">
                                                            <RiChatDeleteFill />
                                                        </Button>
                                                    </td>
                                                </tr>



                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>



    );
};

export default OfferText;