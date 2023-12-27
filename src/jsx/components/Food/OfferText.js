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
import { useEffect } from "react";

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
  const [offerTexts, setOfferTexts] = useState([]);
  const [offerText, setOfferText] = useState({
    offer_text: "",
    hight_light_text: "",
    is_active: "",
    image: ""
  });

  function deleteOfferText(id) {
    makeRequest("DELETE", `/coupon/delete-offer-text/${id}`)
      .then((res) => {
        setOfferTexts((prev) => prev.filter((item) => item.id !== id));
        swal("Done!", "Offer Text Deleted", "Success");
      })
      .catch((err) => {
        let error = err?.data?.errors[0]?.error
          ? err?.data?.errors[0]?.error
          : err?.data?.errors[0]?.message;
        swal("Oops!", error, "error");
        console.log(err?.data?.errors[0]);
      });
  }
  useEffect(() => {
    getOfferText();
  }, []);

  function getOfferText() {
    setOfferText((prev) => {
      return {
        ...offerText,
        offer_text: "",
        hight_light_text: "",
      };
    });
    makeRequest("GET", "/coupon/get-all-offer-text")
      .then((res) => {
        setOfferTexts(res.data.response);
        console.log(res.data.response);
      })
      .catch((err) => {
        console.log(err?.data);
      });
  }
  function handleChange(e) {
    setOfferText((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  function Submit() {
    makeRequest("POST", "/coupon/create-offer-text", offerText)
      .then((res) => {
        getOfferText();
        window.location.reload()
        swal("Done!", "Offer Text Created", "Success");
      })
      .catch((err) => {
        let error = err?.data?.errors[0]?.error
          ? err?.data?.errors[0]?.error
          : err?.data?.errors[0]?.message;
        swal("Oops!", error, "error");
        console.log(err?.data?.errors[0]);
      });
  }
  return (
    <div className="row">
      <div className="col-xl-12 ">
        <div
          className="card "
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            background: "#f5f5f7",
          }}
        >
          <div className="row">
            <div className="col-4">
              <form type="button" onSubmit={(e) => e.preventDefault()}>
                <div style={{}}>
                  <div style={{}}>
                    <div className="card-body">
                      <h4 className="">Offer Text</h4>
                      <div className="mb-3 ">
                        <textarea
                          className="form-control"
                          rows="4"
                          id="comment"
                          name="offer_text"
                          value={offerText.offer_text}
                          onChange={handleChange}
                        ></textarea>
                        <small>Highlight should be included with offer text. Don't add both Offer text & image at the same time</small>
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
                          name="hight_light_text"
                          value={offerText.hight_light_text}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{}}>
                    <div className="card-body">
                      <h4 className="">
                        Upload Offer Image:
                      </h4>
                      <div className="">
                        <label
                          htmlFor="formFile"
                          className="form-label"
                        ></label>
                        <input
                          className="form-control"
                          type="file"
                          onChange={(e) => setOfferText((prev) => {
                            return { ...prev, image: e.target.files[0] }
                          })}
                          id="formFile"
                       
                        />
                        <small>Width*Height-375*75, size{"<"}100kb, format-jpg, png, jpeg, webp</small>
                      </div>
                    </div>
                  </div>

                  <div style={{}} className="">
                    <div className="card-body">
                      <h4 className="">Is Active</h4>
                      <div className="mb-3 ">
                        <div className="form-group mb-0">
                          <label className="radio-inline me-4">
                            <input
                              type="radio"
                              name="optradio"
                              //   checked={}
                              onChange={() =>
                                setOfferText({
                                  ...offerText,
                                  is_active: true,
                                })
                              }
                            />{" "}
                            Yes
                          </label>
                          <label className="radio-inline me-3">
                            <input
                              type="radio"
                              name="optradio"
                              //   checked={}
                              onChange={() =>
                                setOfferText({
                                  ...offerText,
                                  is_active: false,
                                })
                              }
                            />{" "}
                            No
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

            <div className="col-8 mt-4 ">
              <div style={{ padding: ".6rem " }}>
                <Card>
                  <Card.Body>
                    <Table responsive>
                      <thead>
                        <tr
                          style={{ background: "#212A50", textAlign: "center" }}
                        >
                          <th>
                            <strong>Offer Text/image</strong>
                          </th>
                          <th>
                            <strong>Highlight </strong>
                          </th>

                          <th>
                            <strong>Action</strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {offerTexts &&
                          offerTexts.map((item) => (
                            <tr style={{ textAlign: "center" }}>
                              <td style={{ textAlign: "center" }}>
                                {item.image != "" ? 
                                <>
                                  <img style={{width: '7rem'}} src={item.image} />
                                </>: 
                                <>
                                  {item.offer_text}
                                </>
                                }
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.hight_light_text}
                              </td>
                              <td>
                                {/* <Button
                              className="me-2"
                              variant="primary btn-icon-xxs"
                            >
                              <BiSolidEdit />
                            </Button> */}
                                <Button
                                  className="me-2"
                                  variant="danger btn-icon-xxs"
                                  onClick={() => deleteOfferText(item.id)}
                                >
                                  <RiChatDeleteFill />
                                </Button>
                              </td>
                            </tr>
                          ))}
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
