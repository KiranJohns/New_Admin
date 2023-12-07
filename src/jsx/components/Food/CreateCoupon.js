import React from "react";
import { Link } from "react-router-dom";
import { Nav, Dropdown, Tab } from "react-bootstrap";
import { IMAGES, SVGICON } from "../Dashboard/Content";
import circle from "./../../../images/circle.svg";
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import quotes from "./../../../images/quotes.svg";
import fetchData from "../../../axios";
import { useState } from "react";
import swal from "sweetalert";
import DatePicker from "react-datepicker";

const cardBlog = [
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

const CreateCoupon = () => {
  const makeRequest = fetchData();
  const [coupon, setCoupon] = useState({
    coupon_code: "",
    valid_till: "",
    coupon_type: "",
    minimum_purchase: "",
    amount: "",
  });

  function handleChange(e) {
    setCoupon((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  function Submit() {
    console.log(coupon);
    makeRequest("POST", "/coupon/create-coupon", coupon)
      .then((res) => {
        swal("Done!", "coupon created", "success");
        window.location="/coupon-list"
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
      <div className="col-xl-11">
        <div
          className="card"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            background: "#f5f5f7",
          }}
        >
          <form type="button" onSubmit={(e) => e.preventDefault()}>
            <div style={{}}>
              <div className="row">
                <div className="col-6">
                  <div style={{}}>
                    <div className="card-body">
                      <h4 className="">Coupon Code</h4>
                      <div className="mb-3 ">
                        <input
                          type="text"
                          className="form-control  input-default "
                          placeholder="LFC152"
                          name="coupon_code"
                          value={coupon.coupon_code}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{}} className="">
                    <div className="card-body">
                      <h4 className="">Coupon Type:</h4>
                      <div className="form-group mb-3">
                        <select
                          onChange={handleChange}
                          name="coupon_type"
                          className="form-control"
                        >
                          <option value="">Select</option>
                          <option value="Cash">Cash</option>
                          <option value="Percent">Percent</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6" style={{}}>
                  <div className="card-body">
                    <h4 className="">Valid Till:</h4>
                    <div className=" mb-3 ">
                      {/* <DatePicker  className="form-control" style={{width:'100%'}}/>  */}

                      <input
                        name="valid_till"
                        value={coupon.valid_till}
                        onChange={handleChange}
                        type="date"
                        className="form-control input-default "
                      />
                    </div>
                  </div>

                  <div style={{}}>
                    <div className="card-body">
                      <h4 className="">Minimum Purchase (£)</h4>
                      <div className=" mb-3">
                        <input
                          name="minimum_purchase"
                          value={coupon.minimum_purchase}
                          onChange={handleChange}
                          type="number"
                          className="form-control input-default "
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{}}>
              <div className="card-body col-6">
                <h4 style={{ textAlign: "" }} className="">
                  Amount:
                </h4>
                <div className="form-group ">
                  <input
                    name="amount"
                    value={coupon.amount}
                    onChange={handleChange}
                    type="number"
                    className="form-control input-default "
                    placeholder=""
                  />
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
